"use client";

import { FileText, Monitor, XCircle } from "lucide-react";
import ReportDialog from "./_components/ReportDialog";
import PreviousReports from "./_components/PreviousReports";

export const MOCK_REPORTS = [
  {
    id: "1",
    assetId: "ASSET-MAC-001",
    reporterId: "EMP-001",
    description: "Батерей хурдан дуусч байна",
    status: "RESOLVED",
    createdAt: "2025-11-15T10:00:00Z",
    resolvedAt: "2025-11-20T15:30:00Z",
  },
  {
    id: "2",
    assetId: "ASSET-MON-002",
    reporterId: "EMP-001",
    description: "Дэлгэцийн зүүн талд зураас гарч ирсэн",
    status: "RESOLVED",
    createdAt: "2025-10-05T09:20:00Z",
    resolvedAt: "2025-10-12T14:10:00Z",
  },
  {
    id: "3",
    assetId: "ASSET-KB-003",
    reporterId: "EMP-001",
    description: "Keyboard товчнууд гацаж байна",
    status: "IN_PROGRESS",
    createdAt: "2025-03-10T08:45:00Z",
    resolvedAt: null,
  },
  {
    id: "4",
    assetId: "ASSET-HP-004",
    reporterId: "EMP-002",
    description: "Принтер хэвлэхгүй байна",
    status: "OPEN",
    createdAt: "2025-03-12T11:30:00Z",
    resolvedAt: null,
  },
];

export default function ReportPage() {
  const allReports = MOCK_REPORTS;

  const activeReports = allReports.filter((r) => r.status !== "RESOLVED");
  const resolvedReports = allReports.filter((r) => r.status === "RESOLVED");
  return (
    <div className="p-6 flex flex-col w-full text-[#0F172A] gap-6 font-gilroy">
      <div className="flex justify-between items-center ">
        <div>
          <h1 className="text-[24px] font-semibold leading-[125%]">
            Асуудал мэдэгдэх
          </h1>
          <p className="text-[#666666] text-[14px] font-normal leading-[125%] mt-1">
            Төхөөрөмжтэй холбоотой асуудал мэдэгдэх, засвар хүсэх
          </p>
        </div>
        <ReportDialog />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px] p-3 6 items-start">
        <div className="border  border-[#E2E8F0] rounded-2xl p-6 flex flex-col">
          <div className="mb-8">
            <h2 className="font-semibold text-[16px] leading-[125%]">
              Идэвхтэй мэдэгдлүүд
            </h2>
            <p className="text-[#666666] font-normal text-[14px] leading-[125%] mt-1">
              Одоо шийдвэрлэгдэж буй асуудлууд
            </p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            {activeReports.length === 0 ? (
              <div className="flex   flex-col items-center text-center gap-4">
                <FileText
                  size={48}
                  strokeWidth={1}
                  className="text-[#94A3B8]"
                />
                <p className="text-[#94A3B8] text-[16px]">
                  Танд одоогоор идэвхтэй мэдэгдэл алга
                </p>
              </div>
            ) : (
              <div className="w-full space-y-4">
                {activeReports.map((report) => (
                  <div
                    key={report.id}
                    className="border border-[#E2E8F0] p-4 rounded-xl bg-white"
                  >
                    <h4 className="font-semibold">{report.assetId}</h4>
                    <p className="text-sm text-[#666666] mt-1">
                      {report.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <PreviousReports reports={resolvedReports} />
      </div>
    </div>
  );
}
