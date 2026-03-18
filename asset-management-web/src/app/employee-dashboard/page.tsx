"use client";

import { useState, useMemo, useEffect, use } from "react";
import { Bell } from "lucide-react";
import { useUser } from "@clerk/nextjs";

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
  useGetAssetsByEmployeeIdQuery,
  useGetAssignmentsByEmployeeQuery,
  useGetEmployeeDataQuery,
} from "@/gql/graphql";

export default function AssetsPage() {
  const { user, isLoaded: isClerkLoaded } = useUser();
  const [activeTab, setActiveTab] = useState("qr");
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const {
    data: assignmentsData,
    loading: assignmentsLoading,
    error: assignmentsError,
  } = useGetAssignmentsByEmployeeQuery({
    variables: {
      employeeId: localStorage.getItem("employeeId") || "",
    },
    skip: !user?.id,
  });

  const {
    data: assetsData,
    loading: assetsLoading,
    error: assetsError,
  } = useGetAssetsByEmployeeIdQuery({
    variables: {
      employeeId: localStorage.getItem("employeeId") || "",
    },
    skip: !user?.id,
  });
  console.log("assetsData", assetsData);

  const assetsHistory =
    assignmentsData?.getAssignmentsByEmployee.filter(
      (a) => a.signatureR2Key !== null,
    ) || [];

  const [employeeId, setEmployeeId] = useState<string>("");

  useEffect(() => {
    const id = localStorage.getItem("employeeId");
    if (id) setEmployeeId(id);
  }, []);

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
      // Adding missing properties required by the QrItem type definition
      location: "Төв оффис",
      owner: name,
    }));

    return {
      employeeName: name,
      qrItems: formattedQrItems,
      pendingAssignments: employeeData.getPendingAssignments || [],
    };
  }, [employeeData]);

  // Handler for GarTab (Signature)
  const handleSignatureConfirm = async (signature: string) => {
    console.log("Signature captured:", signature);
    // You would typically call a mutation here to save the signature
    setActiveTab("qr");
  };

  // Loading State
  if (!isClerkLoaded || (employeeLoading && !employeeData)) {
    return (
      <div className="flex h-screen items-center justify-center font-medium">
        Уншиж байна...
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

  const ACTIVE_CENSUS_ID = "ede88790-5b49-47fe-8c2a-e77dbc5f16f9";

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Header */}
      <header className="border-b bg-white px-8 py-5">
        <div className="mx-auto max-w-7xl flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              Сайн байна уу, {employeeName} 👋
            </h1>
            <p className="text-sm text-gray-500">Таны хөрөнгийн нэгдсэн тойм</p>
          </div>
          <div className="relative">
            <Bell className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors" />
            {pendingAssignments.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3 rounded-full bg-red-500 border-2 border-white" />
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-8 py-8">
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
        censusId={ACTIVE_CENSUS_ID}
        verifierId={user?.id || employeeId}
      />
    </div>
  );
}
