"use client";

import { useMemo, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Lottie from "lottie-react";

import StatsCards from "./_components/StatsCards";
import Tabs from "./_components/tabs";
import QRScanModal from "./_components/QRScanModal";
import GeneralTab, { AssetWithCategory } from "./_components/GeneralTab";
import GarTab from "./_components/Signature";
import QrTab from "./_components/QrTab";

import { mockStats, type QrItem } from "./_components/mockData";

import loaderAnimation from "../../libs/lottie/animation.json";

import {
  useGetActiveCensusIdQuery,
  useGetAssetsByEmployeeIdQuery,
  useGetAssignmentsByEmployeeQuery,
  useGetEmployeeDataQuery,
  useGetEmployeeInfByIdQuery,
} from "@/gql/graphql";
import { useEmployee } from "../_providers/user-provider";

type AssignmentsDataType = ReturnType<
  typeof useGetAssignmentsByEmployeeQuery
>["data"];
type EmployeeDataType = ReturnType<typeof useGetEmployeeDataQuery>["data"];

type AssignmentItem = NonNullable<
  NonNullable<AssignmentsDataType>["getAssignmentsByEmployee"]
>[number];

type PendingAssignmentItem = NonNullable<
  NonNullable<EmployeeDataType>["getPendingAssignments"]
>[number];

export default function AssetsPage() {
  const { isLoaded: isClerkLoaded } = useUser();
  const { employee } = useEmployee();

  const [activeTab, setActiveTab] = useState("qr");
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const employeeId = employee?.id || "";

  const {
    data: assignmentsData,
    loading: assignmentsLoading,
    error: assignmentsError,
  } = useGetAssignmentsByEmployeeQuery({
    variables: { employeeId },
    skip: !employeeId,
  });

  const {
    data: assetsData,
    loading: assetsLoading,
    error: assetsError,
  } = useGetAssetsByEmployeeIdQuery({
    variables: { employeeId },
    skip: !employeeId,
  });

  const {
    data: employeeData,
    loading: employeeLoading,
    error: employeeError,
  } = useGetEmployeeDataQuery({
    variables: {
      employeeId,
      token: employeeId,
    },
    skip: !employeeId,
  });

  const { data, loading } = useGetEmployeeInfByIdQuery({
    variables: { getEmployeeInfByIdId: employeeId }
  });
  const employeeInf = data?.getEmployeeInfById
  const totalAssetCount = employeeInf?.totalAssetCount
  const totalAssigmentCount = employeeInf?.totalAssigmentCount
  const totalCensusTask = employeeInf?.totalCensusTask

  const infData = mockStats({totalAssetCount,totalAssigmentCount,totalCensusTask})
  const {
    data: censusData,
    loading: censusLoading,
    error: censusError,
  } = useGetActiveCensusIdQuery();

  const activeCensusId =
    censusData?.getCensusEvents?.[censusData.getCensusEvents.length - 1]?.id ||
    "";

  const employeeName = useMemo(() => {
    const firstName = employeeData?.getEmployeeById?.firstName || "";
    const lastName = employeeData?.getEmployeeById?.lastName || "";
    const fullName = `${lastName} ${firstName}`.trim();
    return fullName || "Хэрэглэгч";
  }, [employeeData]);

  const assetsHistory =
    assignmentsData?.getAssignmentsByEmployee?.filter(
      (assignment) => assignment.signatureR2Key !== null,
    ) || [];

  const qrItems = useMemo(() => {
    const assignments = assignmentsData?.getAssignmentsByEmployee || [];
    const pendingAssignments = employeeData?.getPendingAssignments || [];

    // census эхлээгүй бол QR хэсэг хоосон
    if (!activeCensusId) return [];

    // getPendingAssignments дээр assetId биш asset.id ирж байгаа тул asset?.id ашиглаж байна
    const pendingAssetIds = new Set(
      pendingAssignments
        .map((task: PendingAssignmentItem) => task.asset?.id)
        .filter((id): id is string => Boolean(id)),
    );

    // assignment ∩ census pending
    const visibleAssignments = assignments.filter(
      (assignment: AssignmentItem) => {
        const assignmentAssetId = assignment.assetId || assignment.asset?.id;
        return (
          !assignment.returnedAt &&
          !!assignmentAssetId &&
          pendingAssetIds.has(assignmentAssetId)
        );
      },
    );

    const items: QrItem[] = visibleAssignments.map((item: AssignmentItem) => ({
      name: item.asset?.assetTag || "Asset",
      code: item.asset?.serialNumber || item.asset?.assetTag || item.assetId,
      description:
        item.asset?.category?.name ||
        item.asset?.category?.description ||
        "Тоног төхөөрөмж",
      date: item.assignedAt
        ? new Date(item.assignedAt).toLocaleDateString("en-CA")
        : "",
      type: mapAssetTypeToIconType(item.asset?.category?.name),
      location: item.conditionAtAssign || "Тодорхойгүй",
      owner: employeeName,
    }));

    return items;
  }, [assignmentsData, employeeData, activeCensusId, employeeName]);

  if (
    !isClerkLoaded ||
    employeeLoading ||
    assignmentsLoading ||
    assetsLoading ||
    censusLoading
  ) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="h-32 w-32 md:h-48 md:w-48">
          <Lottie animationData={loaderAnimation} loop autoplay />
        </div>
      </div>
    );
  }

  if (employeeError || assignmentsError || assetsError || censusError) {
    const message =
      employeeError?.message ||
      assignmentsError?.message ||
      assetsError?.message ||
      censusError?.message ||
      "Алдаа гарлаа";

    return (
      <div className="flex h-screen items-center justify-center text-red-500">
        Алдаа гарлаа: {message}
      </div>
    );
  }

  return (
    <div className=" p-8 min-h-screen w-full overflow-hidden bg-gray-50">
      <header className="bg-white px-4  sm:px-8">
        <div className="flex w-full items-center justify-between">
          <div>
            <h1 className="text-[24px] font-bold">
              Сайн байна уу, {employeeName} 👋
            </h1>
            <p className="text-sm text-gray-500">
              Таны хөрөнгийн порталын тойм
            </p>
          </div>
        </div>
      </header>

      <main className="w-full px-3 py-6 sm:px-8 sm:py-8">
        <StatsCards stats={infData} />

        <div className="my-6">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="min-h-[400px]">
          {activeTab === "general" && (
            <GeneralTab
              assets={
                (assetsData?.getAssetsByEmployeeId?.filter(
                  Boolean,
                ) as AssetWithCategory[]) || []
              }
              history={assetsHistory}
            />
          )}

          {activeTab === "gar" && (
            <GarTab
              onSuccess={() => {
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

      <QRScanModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        censusId={activeCensusId}
        employeeId={employeeId}
      />
    </div>
  );
}

function mapAssetTypeToIconType(categoryName?: string | null) {
  const value = categoryName?.toLowerCase() || "";

  if (
    value.includes("mac") ||
    value.includes("laptop") ||
    value.includes("notebook")
  ) {
    return "laptop";
  }

  if (value.includes("monitor") || value.includes("display")) {
    return "monitor";
  }

  if (value.includes("phone") || value.includes("mobile")) {
    return "phone";
  }

  if (
    value.includes("keyboard") ||
    value.includes("peripheral") ||
    value.includes("per")
  ) {
    return "keyboard";
  }

  return "laptop";
}
