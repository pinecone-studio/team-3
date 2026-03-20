"use client";

import { FileText, Monitor, XCircle } from "lucide-react";
import ReportDialog from "./_components/ReportDialog";
import PreviousReports from "./_components/PreviousReports";
import { useGetMaintenanceTicketsQuery } from "@/gql/graphql";
import Lottie from "lottie-react";
import loaderAnimation from "../../libs/lottie/animation.json";

export default function ReportPage() {
  const { data, loading, error } = useGetMaintenanceTicketsQuery();
  console.log("data", data);

  const allReports = (data?.getMaintenanceTickets ?? []).filter(
    (r): r is NonNullable<typeof r> => r != null,
  );

  const activeReports = allReports.filter((r) => r.status !== "RESOLVED");
  const resolvedReports = allReports.filter((r) => r.status === "RESOLVED");

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="w-12 md:w-48 md:h-48">
          <Lottie
            animationData={loaderAnimation}
            loop
            autoplay
            onError={(error) => console.error("Lottie Error:", error)}
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-500 font-gilroy text-center mt-20">
        Алдаа гарлаа.
      </div>
    );
  }

  return (
    <div className="flex flex-col p-2 w-full bg-[#F8FAFC] min-h-screen font-gilroy">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-[24px] font-bold text-[#0F172A] mb-1">
            Асуудал мэдээлэх
          </h1>
          <p className="text-[#64748B] text-[14px]">
            Төхөөрөмжтэй холбоотой асуудал мэдэгдэх, засвар хүсэх
          </p>
        </div>
        <ReportDialog />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 flex flex-col h-[700px]">
          <div className="mb-6">
            <h2 className="font-bold text-[16px] text-[#0F172A]">
              Идэвхтэй мэдэгдлүүд
            </h2>
            <p className="text-[#64748B] font-normal text-[14px] mt-1">
              Одоо шийдвэрлэгдэж буй асуудлууд
            </p>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {activeReports.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-[#F1F5F9] rounded-full flex items-center justify-center mb-4">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <p className="text-[#94A3B8] text-[16px] font-medium">
                  Танд одоогоор идэвхтэй мэдэгдэл алга
                </p>
              </div>
            ) : (
              <div className="w-full space-y-4">
                {activeReports.map((report) => (
                  <div
                    key={report.id}
                    className="border border-[#E2E8F0] p-5 rounded-xl bg-[#F8FAFC] hover:border-blue-200 transition-all duration-200 shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-white rounded-lg border border-[#E2E8F0]">
                        <Monitor size={18} className="text-[#64748B]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#1E293B] leading-tight">
                          {report.asset?.name}
                        </h4>
                        <span className="text-[12px] text-[#94A3B8]">
                          ID: {report.id.slice(0, 8)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-[#64748B] bg-white p-3 rounded-lg border border-[#F1F5F9]">
                      {report.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="h-[600px] overflow-hidden">
          <PreviousReports reports={resolvedReports as any} />
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
