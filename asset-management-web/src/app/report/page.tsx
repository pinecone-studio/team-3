"use client";

import { FileText, Monitor, XCircle } from "lucide-react";
import ReportDialog from "./_components/ReportDialog";
import PreviousReports from "./_components/PreviousReports";

export const MOCK_REPORTS = [
  {
    id: "1",
    title: 'MacBook Pro 14"',
    code: "MAC-2026-005",
    reason: "Батерей амархан дуусдаг болсон",
    reportedDate: "11/15/2025",
    resolvedDate: "11/20/2025",
    category: "Техник хангамж",
    status: "RESOLVED",
  },
  {
    id: "2",
    title: "Dell P2419H",
    code: "MON-2024-008",
    reason: "Дэлгэцийн зүүн талд зураас гарч ирсэн",
    reportedDate: "10/5/2025",
    resolvedDate: "10/12/2025",
    category: "Гэмтэл",
    status: "RESOLVED",
  },
];
export default function ReportPage() {
  const loading = false;
  const error = null;
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
                    <h4 className="font-semibold">{report.title}</h4>
                    <p className="text-sm text-[#666666] mt-1">
                      {report.reason}
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
