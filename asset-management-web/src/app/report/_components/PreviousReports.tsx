
import { MacBook } from "@/app/_components/icons/icons";
import { Monitor } from "lucide-react";

type Report = {
  id: string;
  asset: {
    name: string;
    assetTag: string;
  };
  description: string;
  createdAt: string;
  resolvedAt?: string | null;
  severity?: string;
};

interface PreviousReportsProps {
  reports: Report[];
}

export default function PreviousReports({ reports }: PreviousReportsProps) {
  return (
    <div className="w-full bg-[#F8FAFC] border border-[#E2E8F0] p-8 rounded-xl flex flex-col gap-6">
      <div>
        <h3 className="font-bold text-[15px] text-[#0F172A]">
          Өмнөх мэдэгдлүүд
        </h3>
        <p className="text-[#64748B] text-[13px] font-medium mt-1">
          Шийдвэрлэгдсэн асуудлуудын түүх
        </p>
      </div>

      <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
        {reports.map((report) => (
          <div
            key={report.id}
            className="w-full bg-white border border-[#E2E8F0] rounded-xl p-5 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
               
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#F8FAFC] border border-[#F1F5F9] rounded-lg text-[#64748B]">
                  {report.asset.name.toLowerCase().includes("mac") ? (
                    <MacBook />
                  ) : (
                    <Monitor size={22} />
                  )}
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h4 className="text-[15px] font-bold text-[#0F172A]">
                      {report.asset.name}
                    </h4>
               
                    <span className="flex items-center gap-1 bg-[#F0FDF4] text-[11px] text-[#2FBF9F] px-2 py-0.5 rounded-md font-bold border border-[#DCFCE7]">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M10 3L4.5 8.5L2 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Шийдвэрлэгдсэн
                    </span>
                  </div>
                  <p className="text-[#94A3B8] text-[13px] font-medium">
                    {report.asset.assetTag}
                  </p>
                </div>
              </div>

              {/* Төрөл (баруун талд) */}
              <div className="hidden sm:block">
                <span className="text-[11px] border border-[#E2E8F0] text-[#94A3B8] px-2.5 py-1 rounded-md font-medium">
                  {report.severity || "Техник хангамж"}
                </span>
              </div>
            </div>

        
            <p className="text-[#334155] text-[14px] leading-relaxed">
              <span className="font-medium">Шалтгаан:</span>{" "}
              {report.description}
            </p>

     
            <div className="flex flex-col gap-0.5 text-[12px] text-[#94A3B8] font-medium">
              <p>Мэдэгдсэн хугацаа: {report.createdAt}</p>
              <p>Шийдвэрлэсэн хугацаа: {report.resolvedAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
