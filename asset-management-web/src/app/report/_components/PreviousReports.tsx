import { CheckSmall, Macbook } from "@/app/_components/icons/icons";
import { Monitor } from "lucide-react";

const PREVIOUS_REPORTS = [
  {
    id: 1,
    title: 'MacBook Pro 14"',
    code: "MAC-2026-005",
    reason: "Батерей амархан дуусдаг болсон",
    reportedDate: "11/15/2025",
    resolvedDate: "11/20/2025",
    category: "Техник хангамж",
    icon: <Macbook />,
  },
  {
    id: 2,
    title: "Dell P2419H",
    code: "MON-2024-008",
    reason: "Дэлгэцийн зүүн талд зураас гарч ирсэн",
    reportedDate: "10/5/2025",
    resolvedDate: "10/12/2025",
    category: "Гэмтэл",
    icon: <Monitor strokeWidth={1.2} size={22} />,
  },
];

export default function PreviousReports() {
  return (
    <div className="w-full border-[#E2E8F0] border p-6 rounded-xl flex flex-col gap-5 bg-white">
      <div>
        <h3 className="font-medium text-[16px] leading-[20px] text-[#0F172A]">
          Өмнөх мэдэгдлүүд
        </h3>
        <p className="text-[#666666] text-[14px] font-regular leading-[125%] mt-1">
          Шийдвэрлэгдсэн асуудлуудын түүх
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {PREVIOUS_REPORTS.map((report) => (
          <div
            key={report.id}
            className="w-full bg-white border border-[#E2E8F0] rounded-xl p-5 flex items-start justify-between"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-[#F8FAFC] rounded-lg text-[#64748B]">
                {report.icon}
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <h4 className="text-[16px] font-medium leading-[20px] text-[#0F172A]">
                    {report.title}
                  </h4>
                  <span className="flex items-center gap-1 bg-[#F0FDF4] text-[12px] text-[#166534] px-2.5 py-1 rounded-md font-medium border border-[#DCFCE7]">
                    <CheckSmall /> Шийдвэрлэгдсэн
                  </span>
                </div>

                <p className="text-[#94A3B8] text-[14px] font-normal mt-0.5">
                  {report.code}
                </p>

                <p className="text-[#334155] text-[14px] mt-3 leading-[125%]">
                  <span className="font-medium">Шалтгаан:</span> {report.reason}
                </p>

                <div className="flex gap-6 text-[12px] text-[#64748B] mt-4 font-normal">
                  <p>
                    Мэдэгдсэн хугацаа:{" "}
                    <span className="text-[#0F172A]">
                      {report.reportedDate}
                    </span>
                  </p>
                  <p>
                    Шийдвэрлэсэн хугацаа:{" "}
                    <span className="text-[#0F172A]">
                      {report.resolvedDate}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden sm:block">
              <span className="text-[12px] border border-[#E2E8F0] text-[#64748B] px-3 py-1.5 rounded-lg font-medium bg-[#F8FAFC]">
                {report.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
