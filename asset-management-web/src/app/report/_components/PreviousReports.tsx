import { CheckSmall, MacBook } from "@/app/_components/icons/icons";
import { Monitor } from "lucide-react";

interface PreviousReportsProps {
  reports: any[];
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
            <div className="flex justify gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-[#F8FAFC] rounded-lg text-[#64748B]">
                {report.category === "Техник хангамж" ? (
                  <MacBook />
                ) : (
                  <Monitor size={22} />
                )}
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <h4 className="text-[16px] font-medium leading-[20px] text-[#000000]">
                    {report.title}
                  </h4>
                  <span className="flex items-center gap-1 bg-[#F0FDF4] text-[12px] text-[#666666] px-2 rounded-md font-medium border border-[#DCFCE7]">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 11C5.30833 11 4.65833 10.8687 4.05 10.6062C3.44167 10.3438 2.9125 9.9875 2.4625 9.5375C2.0125 9.0875 1.65625 8.55833 1.39375 7.95C1.13125 7.34167 1 6.69167 1 6C1 5.30833 1.13125 4.65833 1.39375 4.05C1.65625 3.44167 2.0125 2.9125 2.4625 2.4625C2.9125 2.0125 3.44167 1.65625 4.05 1.39375C4.65833 1.13125 5.30833 1 6 1C6.54167 1 7.05417 1.07917 7.5375 1.2375C8.02083 1.39583 8.46667 1.61667 8.875 1.9L8.15 2.6375C7.83333 2.4375 7.49583 2.28125 7.1375 2.16875C6.77917 2.05625 6.4 2 6 2C4.89167 2 3.94792 2.38958 3.16875 3.16875C2.38958 3.94792 2 4.89167 2 6C2 7.10833 2.38958 8.05208 3.16875 8.83125C3.94792 9.61042 4.89167 10 6 10C7.10833 10 8.05208 9.61042 8.83125 8.83125C9.61042 8.05208 10 7.10833 10 6C10 5.85 9.99167 5.7 9.975 5.55C9.95833 5.4 9.93333 5.25417 9.9 5.1125L10.7125 4.3C10.8042 4.56667 10.875 4.84167 10.925 5.125C10.975 5.40833 11 5.7 11 6C11 6.69167 10.8687 7.34167 10.6062 7.95C10.3438 8.55833 9.9875 9.0875 9.5375 9.5375C9.0875 9.9875 8.55833 10.3438 7.95 10.6062C7.34167 10.8687 6.69167 11 6 11ZM5.3 8.3L3.175 6.175L3.875 5.475L5.3 6.9L10.3 1.8875L11 2.5875L5.3 8.3Z" fill="#2FBF9F"/>
</svg>
Шийдвэрлэгдсэн
                  </span>
                </div>

                <p className="text-[#666666] text-[14px] font-normal mt-0.5">
                  {report.code}
                </p>

                <p className="text-[#334155] text-[14px] mt-3 leading-[125%]">
                  <span className="font-medium">Шалтгаан:</span> {report.reason}
                </p>

                <div className="flex flex-col gap-1  text-[12px] text-[#666666] mt-4 font-normal">
                  <p className="text-[12px]">
                    Мэдэгдсэн хугацаа:{" "}
                    <span className="text-[#666666] text-[12px]">
                      {report.reportedDate}
                    </span>
                  </p>
                  <p className="text-[12px] ">
                    Шийдвэрлэсэн хугацаа:{" "}
                    <span className="text-[#666666] text-[12px]">
                      {report.resolvedDate}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden sm:block">
              <span className="text-[12px] border border-[#E2E8F0] text-[#64748B] px-3 py-1.5 rounded-lg font-medium ">
                {report.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
