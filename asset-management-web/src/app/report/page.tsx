"use client";

import { XCircle } from "lucide-react";
import ReportDialog from "./_components/ReportDialog";
import PreviousReports from "./_components/PreviousReports";

export default function ReportPage() {
  return (
    <div
      className="p-6 flex flex-col w-full text[#0F172A] gap-6"
      style={{ fontFamily: "GIP, sans-serif" }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold tracking-tight text-[24px]">
            Асуудал мэдэгдэх
          </h1>

          <p className="text-[#666666] text-[14px] font-normal leading-[125%] mt-1">
            Төхөөрөмжтэй холбоотой асуудал мэдэгдэх, засвар хүсэх
          </p>
        </div>

        <ReportDialog />
      </div>

      <div className="w-full border-[#E2E8F0] border p-6 rounded-xl flex flex-col ">
        <div>
          <div className="font-medium text-[16px] leading-[30px] ">
            Идэвхтэй мэдэгдлүүд
          </div>

          <div className="text-[#666666] font-medium text-[14px] leading-[125%] mt-1 ">
            Одоо шийдвэрлэгдэж буй асуудлууд
          </div>
        </div>

        <div className="items-center flex flex-col justify-center gap-3 py-[80px]">
          <div className="rounded-full w-[48px] h-[48px] bg-[#F1F5F9] items-center flex text-[#666666] justify-center">
            <XCircle strokeWidth={1.5} size={24} />
          </div>

          <p className="text-center text-[16px] leading-[125%] font-normal text-[#666666]">
            Идэвхтэй мэдэгдэл байхгүй
          </p>
        </div>
      </div>

      <PreviousReports />
    </div>
  );
}
