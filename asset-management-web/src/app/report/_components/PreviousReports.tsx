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
    icon: <Monitor strokeWidth={1.5} size={24} />,
  },
];

export default function PreviousReports() {
  return (
    <div className="w-full border-[#E2E8F0] border p-6 rounded-xl flex flex-col gap-4">
      <div>
        <div className="leading-[30px] font-medium text-[16px]">
          Өмнөх мэдэгдлүүд
        </div>
        <div className="text-[#666666] text-[14px] font-normal leading-[125%] mt-1">
          Шийдвэрлэгдсэн асуудлуудын түүх
        </div>
      </div>

      {PREVIOUS_REPORTS.map((report) => {
        return (
          <div
            key={report.id}
            className="w-full bg-white border border-gray-200 rounded-xl p-6 flex items-start justify-between"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-[#F8FAFC] rounded-lg text-[#666666]">
                {report.icon}
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-[16px] font-medium leading-[20px]">
                    {report.title}
                  </h2>

                  <span className="flex items-center gap-1.5 bg-[#F2F8F5] text-[12px] text-[#475467] px-2.5 py-1 rounded-md font-medium">
                    <CheckSmall />
                    Шийдвэрлэгдсэн
                  </span>
                </div>

                <p className="text-[#555555] text-[14px] font-normal leading-[125%] mt-1">
                  {report.code}
                </p>

                <p className="text-[#334155] text-[14px] mt-3 font-normal leading-[125%]">
                  <span className="font-medium">Шалтгаан:</span> {report.reason}
                </p>

                <div className="flex gap-6 text-[13px] text-[#666666] mt-3 font-normal">
                  <p>Мэдэгдсэн хугацаа:{report.reportedDate}</p>
                  <p>Шийдвэрлэсэн хугацаа:{report.resolvedDate}</p>
                </div>
              </div>
            </div>

            <div>
              <span className="text-[12px] border border-[#E2E8F0] text-[#666666] px-3 py-1.5 rounded-md font-medium bg-white">
                {report.category}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
