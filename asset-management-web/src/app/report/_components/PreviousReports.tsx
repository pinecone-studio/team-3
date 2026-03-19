import { CheckSmall, MacBook } from "@/app/_components/icons/icons";
import { Monitor } from "lucide-react";

type Report = {
  id: string;
  assetId: string;
  description: string;
  createdAt: string;
  resolvedAt?: string | null;
  category?: {
    name: string;
  } | null;
};
interface PreviousReportsProps {
  reports: Report[];
}
export default function PreviousReports({ reports }: PreviousReportsProps) {
  return (
    <div className="w-full border-[#E2E8F0] border p-6 rounded-xl flex flex-col gap-5 bg-[#F8FAFC]">
      <div>
        <h3 className="font-medium text-[16px] leading-[20px] text-[#0F172A]">
          Өмнөх мэдэгдлүүд
        </h3>
        <p className="text-[#666666] text-[14px] font-regular leading-[125%] mt-1">
          Шийдвэрлэгдсэн асуудлуудын түүх
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="w-full bg-white border border-[#E2E8F0] rounded-md p-5 flex items-start justify-between"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-[#F8FAFC] rounded-lg text-[#64748B]">
                {report.category?.name === "Техник хангамж" ? (
                  <MacBook />
                ) : (
                  <Monitor size={22} />
                )}
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <h4 className="text-[16px] font-medium leading-[20px] text-[#000000]">
                    {report.assetId}
                  </h4>
                  <span className="flex items-center gap-1 bg-[#F0FDF4] text-[12px] text-[#666666] px-2 rounded-md font-medium border border-[#DCFCE7]">
                    <CheckSmall /> Шийдвэрлэгдсэн
                  </span>
                </div>

                {/* <p className="text-[#666666] text-[14px] font-normal mt-0.5">
                  {report.code}
                </p> */}

                <p className="text-[#334155] text-[14px] mt-3 leading-[125%]">
                  <span className="font-medium">Шалтгаан:</span>{" "}
                  {report.description}
                </p>

                <div className="flex flex-col gap-1  text-[12px] text-[#666666] mt-4 font-normal">
                  <p className="text-[12px]">
                    Мэдэгдсэн хугацаа:{" "}
                    <span className="text-[#666666] text-[12px]">
                      {new Date(report.createdAt).toLocaleString()}
                    </span>
                  </p>
                  <p className="text-[12px] ">
                    Шийдвэрлэсэн хугацаа:{" "}
                    <span className="text-[#666666] text-[12px]">
                      {report.resolvedAt
                        ? new Date(report.resolvedAt).toLocaleString()
                        : "-"}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden sm:block">
              <span className="text-[12px] border border-[#E2E8F0] text-[#64748B] px-3 py-1.5 rounded-lg font-medium ">
                {report.category?.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
