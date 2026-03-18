"use client";

import { useEffect, useState } from "react";
import StatsCards from "./_components/StatsCards";
import Tabs from "./_components/tabs";
import GeneralTab from "./_components/GeneralTab";
import GarTab from "./_components/Signature";
import QrTab from "./_components/QrTab";
import type { QrItem } from "./_components/mockData";
import {
  mockStats,
  mockDevices,
  mockProgress,
  mockHistory,
  mockGarItems,
} from "./_components/mockData";
type Assignment = {
  id: string;
  assetId: string;
  employeeId: string;
  assignedAt: string;
  returnedAt: string | null;
  conditionAtAssign: string;
  conditionAtReturn?: string | null;
  asset?: {
    id: string;
    assetTag: string;
    serialNumber?: string | null;
    status: string;
    category?: {
      id: string;
      name: string;
      description?: string | null;
    } | null;
  } | null;
};
type Employee = {
  id: string;
  firstName: string;
  lastName: string;
};

type GetAssignmentsResponse = {
  data?: {
    getAssignmentsByEmployee?: Assignment[];
    getEmployeeById?: Employee | null;
  };
  errors?: {
    message: string;
  }[];
};

const EMPLOYEE_ID = "-H7_24M85L-FMHKpkv4gp";

export default function AssetsPage() {
  const [activeTab, setActiveTab] = useState("qr");
  const [qrItems, setQrItems] = useState<QrItem[]>([]);
  const [loadingQr, setLoadingQr] = useState(false);
  const [qrError, setQrError] = useState("");
  const [employeeName, setEmployeeName] = useState("Булгантуяа");

  useEffect(() => {
    const fetchQrItems = async () => {
      try {
        setLoadingQr(true);
        setQrError("");

        const res = await fetch("http://localhost:8787/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query GetEmployeeAssignments($employeeId: ID!) {
           getAssignmentsByEmployee(employeeId: $employeeId) {
  id
  assetId
  employeeId
  assignedAt
  returnedAt
  conditionAtAssign
  conditionAtReturn
  asset {
    id
    assetTag
    serialNumber
    status
    category {
      id
      name
      description
    }
  }
}
                getEmployeeById(id: $employeeId) {
                  id
                  firstName
                  lastName
                }
              }
            `,
            variables: {
              employeeId: EMPLOYEE_ID,
            },
          }),
        });

        const json: GetAssignmentsResponse = await res.json();
        console.log("RAW JSON:", json);

        if (json.errors?.length) {
          setQrError(json.errors[0].message || "GraphQL алдаа гарлаа");
          setQrItems([]);
          return;
        }

        const employee = json.data?.getEmployeeById;
        if (employee) {
          setEmployeeName(`${employee.lastName} ${employee.firstName}`.trim());
        }

        const assignments = json.data?.getAssignmentsByEmployee || [];
        console.log("ASSIGNMENTS:", assignments);

        const activeAssignments = assignments.filter(
          (item) => !item.returnedAt,
        );
        console.log("ACTIVE ASSIGNMENTS:", activeAssignments);

        const mapped: QrItem[] = activeAssignments.map((item) => ({
          name:
            item.asset?.assetTag ||
            item.asset?.category?.name ||
            `Asset ${item.assetId}`,
          code:
            item.asset?.serialNumber || item.asset?.assetTag || item.assetId,
          description:
            item.asset?.category?.description ||
            item.asset?.category?.name ||
            "Asset мэдээлэл дутуу",
          location: item.conditionAtAssign || "Тодорхойгүй",
          date: item.assignedAt
            ? new Date(item.assignedAt).toLocaleDateString("en-CA")
            : "",
          owner: employee
            ? `${employee.lastName} ${employee.firstName}`.trim()
            : item.employeeId,
          type: mapAssetTypeToIconType(item.asset?.category?.name),
        }));
        console.log("MAPPED QR ITEMS:", mapped);
        console.log(
          "ACTIVE ASSIGNMENTS FULL:",
          JSON.stringify(activeAssignments, null, 2),
        );
        console.log("ACTIVE ASSIGNMENTS:", activeAssignments);
        console.log("MAPPED QR ITEMS:", mapped);
        setQrItems(mapped);
      } catch (error) {
        console.error("Failed to fetch qr items:", error);
        setQrError("QR data авах үед алдаа гарлаа");
      } finally {
        setLoadingQr(false);
      }
    };

    fetchQrItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-6 py-6">
        <div className="mb-6">
          <h1 className="mb-1 text-2xl font-semibold text-gray-900">
            Сайн байна уу, {employeeName}
          </h1>
          <p className="text-sm text-gray-500">Таны хөрөнгийн порталын тойм</p>
        </div>

        <StatsCards stats={mockStats} />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mt-6">
          {activeTab === "general" && (
            <GeneralTab
              devices={mockDevices}
              progress={mockProgress}
              history={mockHistory}
            />
          )}

          {activeTab === "gar" && <GarTab items={mockGarItems} />}

          {activeTab === "qr" && (
            <>
              {loadingQr && <div>Уншиж байна...</div>}

              {!loadingQr && qrError && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                  {qrError}
                </div>
              )}

              {!loadingQr && !qrError && qrItems.length === 0 && (
                <div className="rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-500">
                  QR баталгаажуулах идэвхтэй хөрөнгө олдсонгүй
                </div>
              )}

              {!loadingQr && !qrError && qrItems.length > 0 && (
                <QrTab items={qrItems} />
              )}
            </>
          )}
        </div>
      </div>
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
