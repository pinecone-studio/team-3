"use client";

import { useEffect, useState } from "react";
import { LayoutDashboard, QrCode, FileText, Bell } from "lucide-react"; // Optional: for visual flair
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

// --- Types (Kept as requested) ---
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
  const [employeeName, setEmployeeName] = useState("Хэрэглэгч");

  useEffect(() => {
    const fetchQrItems = async () => {
      try {
        setLoadingQr(true);
        setQrError("");

        const res = await fetch("http://localhost:8787/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
            variables: { employeeId: EMPLOYEE_ID },
          }),
        });

        const json: GetAssignmentsResponse = await res.json();

        if (json.errors?.length) {
          setQrError(json.errors[0].message || "GraphQL алдаа гарлаа");
          return;
        }

        const employee = json.data?.getEmployeeById;
        if (employee) {
          setEmployeeName(`${employee.lastName} ${employee.firstName}`.trim());
        }

        const assignments = json.data?.getAssignmentsByEmployee || [];
        const activeAssignments = assignments.filter(
          (item) => !item.returnedAt,
        );

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

        setQrItems(mapped);
      } catch (error) {
        setQrError("QR data авах үед алдаа гарлаа");
      } finally {
        setLoadingQr(false);
      }
    };

    fetchQrItems();
  }, []);

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-slate-900">
      {/* Top Header Section */}
      <header className=" z-10 border-b border-gray-200 bg-white px-8 py-5">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold  tracking-tight text-gray-900">
              Сайн байна уу, {employeeName} 👋
            </h1>
            <p className="mt-1 text-sm text-gray-500 font-medium">
              Таны эзэмшиж буй хөрөнгө болон мэдээллийн нэгдсэн тойм
            </p>
          </div>
          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
            <Bell size={22} />
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-8 py-8">
        {/* Statistics Grid */}
        <section className="mb-8">
          <StatsCards stats={mockStats} />
        </section>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Dynamic Content Area */}
        <div className="min-h-[400px]">
          {activeTab === "general" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <GeneralTab
                devices={mockDevices}
                progress={mockProgress}
                history={mockHistory}
              />
            </div>
          )}

          {activeTab === "gar" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <GarTab items={mockGarItems} />
            </div>
          )}

          {activeTab === "qr" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              {loadingQr ? (
                <div className="flex h-64 items-center justify-center space-x-2">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600"></div>
                  <span className="ml-2 text-sm text-gray-500">
                    Мэдээлэл шинэчилж байна...
                  </span>
                </div>
              ) : qrError ? (
                <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-center">
                  <p className="text-sm font-medium text-red-600">{qrError}</p>
                </div>
              ) : qrItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
                  <QrCode className="mb-4 text-gray-300" size={48} />
                  <h3 className="text-lg font-medium text-gray-900">
                    Хөрөнгө олдсонгүй
                  </h3>
                  <p className="text-sm text-gray-500">
                    Танд одоогоор QR баталгаажуулах шаардлагатай хөрөнгө байхгүй
                    байна.
                  </p>
                </div>
              ) : (
                <QrTab items={qrItems} />
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// --- Helpers ---
function mapAssetTypeToIconType(categoryName?: string | null) {
  const value = categoryName?.toLowerCase() || "";
  if (
    value.includes("mac") ||
    value.includes("laptop") ||
    value.includes("notebook")
  )
    return "laptop";
  if (value.includes("monitor") || value.includes("display")) return "monitor";
  if (value.includes("phone") || value.includes("mobile")) return "phone";
  if (
    value.includes("keyboard") ||
    value.includes("peripheral") ||
    value.includes("per")
  )
    return "keyboard";
  return "laptop";
}
