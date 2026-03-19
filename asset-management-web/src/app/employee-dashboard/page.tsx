"use client";

import { useState, useMemo, useEffect, use } from "react";
import { Bell } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

// Components
import StatsCards from "./_components/StatsCards";
import Tabs from "./_components/tabs";
import QRScanModal from "./_components/QRScanModal";
import GeneralTab, { AssetWithCategory } from "./_components/GeneralTab";
import GarTab from "./_components/Signature";
import QrTab from "./_components/QrTab";

// Types & Mock Data
import type { QrItem } from "./_components/mockData";
import {
  mockStats,
  mockDevices,
  mockProgress,
  mockHistory,
} from "./_components/mockData";
import {
  useGetActiveCensusIdQuery,
  useGetAssetsByEmployeeIdQuery,
  useGetAssignmentsByEmployeeQuery,
  useGetEmployeeDataQuery,
} from "@/gql/graphql";
import { useEmployee } from "../_providers/user-provider";
import dynamic from "next/dynamic";

export default function AssetsPage() {
  const { user, isLoaded: isClerkLoaded } = useUser();
  const [activeTab, setActiveTab] = useState("qr");
  const { employee } = useEmployee();
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const {
    data: assignmentsData,
    loading: assignmentsLoading,
    error: assignmentsError,
  } = useGetAssignmentsByEmployeeQuery({
    variables: {
      employeeId: employee?.id as string,
    },
    skip: !employee?.id,
  });

  const {
    data: assetsData,
    loading: assetsLoading,
    error: assetsError,
  } = useGetAssetsByEmployeeIdQuery({
    variables: {
      employeeId: employee?.id as string,
    },
    skip: !employee?.id,
  });

  const assetsHistory =
    assignmentsData?.getAssignmentsByEmployee.filter(
      (a) => a.signatureR2Key !== null,
    ) || [];

  const [employeeId, setEmployeeId] = useState<string>("");

  useEffect(() => {
    const id = employee?.id;
    if (id) setEmployeeId(id);
  }, [employee?.id]);

  /**
   * 1. Execute the GraphQL Hook
   */
  const {
    data: employeeData,
    loading: employeeLoading,
    error: employeeError,
  } = useGetEmployeeDataQuery({
    variables: {
      employeeId: employeeId,
      token: employeeId,
    },
    skip: !employeeId, // Don't run the query until we have the ID
  });
  const {
    data: censusData,
    loading: censusLoading,
    error: censusError,
  } = useGetActiveCensusIdQuery();

  /**
   * 2. Transform the Data
   * Resolves the 'QrItem' assignment error by providing missing properties.
   */
  const { employeeName, qrItems, pendingAssignments } = useMemo(() => {
    if (!employeeData)
      return { employeeName: "Хэрэглэгч", qrItems: [], pendingAssignments: [] };

    // Format Name
    const name = employeeData.getEmployeeById
      ? `${employeeData.getEmployeeById.lastName} ${employeeData.getEmployeeById.firstName}`
      : "Хэрэглэгч";

    // Format QR Items (Active Assignments)
    const active = (employeeData.getAssignmentsByEmployee || []).filter(
      (a: any) => !a.returnedAt,
    );

    const formattedQrItems: QrItem[] = active.map((item: any) => ({
      name: item.asset?.assetTag || "Asset",
      code: item.asset?.serialNumber || item.asset?.assetTag,
      description: item.asset?.category?.name || "Тоног төхөөрөмж",
      date: item.assignedAt
        ? new Date(item.assignedAt).toLocaleDateString("en-CA")
        : "",
      type: "laptop",
      location: "Төв оффис",
      owner: name,
    }));

    return {
      employeeName: name,
      qrItems: formattedQrItems,
      pendingAssignments: employeeData.getPendingAssignments || [],
    };
  }, [employeeData]);

  const ACTIVE_CENSUS_ID =
    censusData?.getCensusEvents[censusData.getCensusEvents.length - 1]?.id;
  console.log(ACTIVE_CENSUS_ID, "ACTIVE_CENSUS_ID");

  const handleSignatureConfirm = async (signature: string) => {
    console.log("Signature captured:", signature);
    // You would typically call a mutation here to save the signature
    setActiveTab("qr");
  };

  // Loading State
  if (!isClerkLoaded || (employeeLoading && !employeeData)) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        {/* Controlled size container */}
        <div className="w-32 h-32 md:w-48 md:h-48">
          <DotLottieReact
            src="/loader.lottie"
            loop
            autoplay
            onError={(error) => console.error("Lottie Error:", error)}
          />
        </div>
      </div>
    );
  }

  // Error State
  if (employeeError) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Алдаа гарлаа: {employeeError.message}
      </div>
    );
  }
  if (!employeeData?.getEmployeeById) {
    return null;
  }
  return (
    <div className="min-h-screen w-full overflow-hidden">
      {/* Header */}
     <header className="bg-white px-4 sm:px-8 py-5">
        <div className="w-full flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              Сайн байна уу, {employeeName} 👋
            </h1>
            <p className="text-sm text-gray-500">
              Таны хөрөнгийн порталын тойм
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
  <main className="w-full px-3 sm:px-8 py-6 sm:py-8 ">
        <StatsCards stats={mockStats} />

        <div className="my-6">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="min-h-100">
          {activeTab === "general" && (
            <GeneralTab
              // 1. Use optional chaining ?.
              // 2. Filter out null/undefined items
              // 3. Fallback to an empty array []
              assets={
                (assetsData?.getAssetsByEmployeeId?.filter(
                  Boolean,
                ) as AssetWithCategory[]) || []
              }
              history={(assetsHistory as any) || []}
            />
          )}

          {activeTab === "gar" && (
            <GarTab
              // GarTab already knows how to fetch its own data or use props,
              // but it needs to tell the parent when it's totally done.
              onSuccess={() => {
                // Optional: Refresh your GQL queries here if needed
                setActiveTab("qr");
              }}
            />
          )}

          {activeTab === "qr" && (
            <QrTab
              items={qrItems}
              onOpenScanner={() => setIsScannerOpen(true)}
            />
          )}
        </div>
      </main>

      {/* Modals */}
      <QRScanModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        censusId={ACTIVE_CENSUS_ID as string}
        verifierId={employee?.id as string}
      />
    </div>
  );
}
