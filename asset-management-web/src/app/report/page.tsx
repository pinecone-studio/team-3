"use client";

import { Monitor, FileText } from "lucide-react";
import ReportDialog from "./_components/ReportDialog";
import PreviousReports from "./_components/PreviousReports";
import { useGetMaintenanceTicketsQuery } from "@/gql/graphql";
import Lottie from "lottie-react";
import loaderAnimation from "../../libs/lottie/animation.json";
import { MacBook } from "@/app/_components/icons/icons";
import { GetMaintenanceTicketsQuery } from "@/gql/graphql";
import { useEffect, useMemo } from "react";
import { useEmployee } from "../_providers/user-provider";

export default function ReportPage() {
  const { data, loading, error } = useGetMaintenanceTicketsQuery();
  const { employee } = useEmployee();
  console.log(data, "data");
  useEffect(() => {}, [data]);
  const filteredMaintenanceTicket = data?.getMaintenanceTickets.filter(
    (ticket) => {
      return ticket.reporterId == employee?.id;
    },
  );

  // const allReports = (data?.getMaintenanceTickets ?? []).filter(
  //   (r): r is NonNullable<typeof r> => r != null,
  // );

  // const activeReports = allReports.filter((r) => r.status !== "RESOLVED");
  // const resolvedReports = allReports.filter((r) => r.status === "RESOLVED");
  const allReports = useMemo(
    () =>
      (filteredMaintenanceTicket ?? []).filter(
        (r): r is NonNullable<typeof r> => r != null,
      ),
    [data],
  );

  const activeReports = useMemo(
    () => allReports.filter((r) => r.status !== "RESOLVED"),
    [allReports],
  );

  const resolvedReports = useMemo(
    () => allReports.filter((r) => r.status === "RESOLVED"),
    [allReports],
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="w-12 md:w-48 md:h-48">
          <Lottie animationData={loaderAnimation} loop autoplay />
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
    <div className="flex flex-col w-full  min-h-screen font-gilroy">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-[24px] font-bold text-[#0F172A]">
            Асуудал мэдээлэх
          </h1>
          <p className="text-[#64748B] text-[14px] font-medium mt-1">
            Төхөөрөмжтэй холбоотой асуудал мэдэгдэх, засвар хүсэх
          </p>
        </div>
        <ReportDialog />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] p-8 rounded-xl flex flex-col min-h-[400px]">
          <div className="mb-6">
            <h3 className="font-bold text-[15px] text-[#0F172A]">
              Идэвхтэй мэдэгдлүүд
            </h3>
            <p className="text-[#64748B] text-[13px] mt-1 font-medium">
              Одоо шийдвэрлэгдэж буй асуудлууд
            </p>
          </div>

          <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-1 custom-scrollbar">
            {activeReports.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <FileText
                  size={48}
                  className="text-[#E2E8F0] mb-4"
                  strokeWidth={1}
                />
                <p className="text-[#94A3B8] text-[14px] font-medium">
                  Танд одоогоор идэвхтэй мэдэгдэл алга
                </p>
              </div>
            ) : (
              activeReports.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report as any}
                  isActive={true}
                />
              ))
            )}
          </div>
        </div>

        <PreviousReports reports={resolvedReports as any} />
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}

function ReportCard({ report, isActive }: { report: any; isActive: boolean }) {
  const formatDate = (date: string) =>
    new Date(date).toLocaleString("mn-MN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="w-full bg-white border border-[#E2E8F0] rounded-xl p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#F8FAFC] border border-[#F1F5F9] rounded-lg text-[#64748B]">
            {report.asset?.name?.toLowerCase().includes("mac") ? (
              <MacBook />
            ) : (
              <Monitor size={22} />
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h4 className="text-[15px] font-bold text-[#0F172A]">
                {report.asset?.name}
              </h4>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-md font-bold flex items-center gap-1 ${isActive ? "bg-blue-50 text-blue-600 border border-blue-100" : "bg-[#F0FDF4] text-[#2FBF9F] border border-[#DCFCE7]"}`}
              >
                {isActive ? "Идэвхтэй" : "Шийдвэрлэгдсэн"}
              </span>
            </div>
            <p className="text-[#94A3B8] text-[13px] font-medium">
              {report.asset?.assetTag}
            </p>
          </div>
        </div>
        <div className="hidden sm:block">
          <span className="text-[11px] border border-[#E2E8F0] text-[#94A3B8] px-2.5 py-1 rounded-md font-medium">
            {report.severity || "Техник хангамж"}
          </span>
        </div>
      </div>
      <p className="text-[#334155] text-[14px] leading-relaxed">
        <span className="font-medium">Шалтгаан:</span> {report.description}
      </p>
      <div className="flex flex-col gap-0.5 text-[12px] text-[#94A3B8] font-medium">
        <p>Мэдэгдсэн хугацаа: {formatDate(report.createdAt)}</p>
      </div>
    </div>
  );
}
