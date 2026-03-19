"use client";

import { FileText, Monitor, XCircle } from "lucide-react";
import ReportDialog from "./_components/ReportDialog";
import PreviousReports from "./_components/PreviousReports";
import { useGetMaintenanceTicketsQuery } from "@/gql/graphql";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function ReportPage() {
  const { data, loading, error } = useGetMaintenanceTicketsQuery();
  console.log("data", data);

  const allReports =
    data?.getMaintenanceTickets?.filter(
      (r): r is NonNullable<typeof r> => r !== null,
    ) ?? [];

  const activeReports = allReports.filter((r) => r.status !== "RESOLVED");

  const resolvedReports = allReports.filter((r) => r.status === "RESOLVED");

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        {/* Controlled size container */}
        <div className="w-32 h-32 md:w-48 md:h-48">
          <DotLottieReact
            src="/loader.lottie"
            loop
            autoplay
            onError={(error) => console.error("Lottie Error:", error)}
          />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">Error loading reports</div>;
  }
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
      <div className="grid  grid-cols-1 lg:grid-cols-2 gap-[20px] p-3 6 items-start">
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
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.3511 31.6501C9.67539 31.6501 9.10626 31.417 8.64376 30.9507C8.18126 30.4845 7.95001 29.9137 7.95001 29.2385V6.76172C7.95001 6.08647 8.18314 5.51572 8.64939 5.04947C9.11564 4.58322 9.68639 4.3501 10.3616 4.3501H20.9655C21.2825 4.3501 21.5878 4.40785 21.8813 4.52335C22.1745 4.6386 22.4443 4.81935 22.6905 5.0656L27.3345 9.7096C27.5808 9.95585 27.7615 10.2256 27.8768 10.5188C27.9923 10.8123 28.05 11.1176 28.05 11.4346V29.2385C28.05 29.9137 27.8168 30.4845 27.3503 30.9507C26.8838 31.417 26.3126 31.6501 25.6369 31.6501H10.3511ZM20.55 10.6441V6.3001H10.3616C10.2461 6.3001 10.1404 6.34822 10.0444 6.44447C9.94814 6.54047 9.90001 6.64622 9.90001 6.76172V29.2385C9.90001 29.354 9.94814 29.4597 10.0444 29.5557C10.1404 29.652 10.2461 29.7001 10.3616 29.7001H25.6384C25.7539 29.7001 25.8596 29.652 25.9556 29.5557C26.0519 29.4597 26.1 29.354 26.1 29.2385V11.8501H21.756C21.4118 11.8501 21.1248 11.7351 20.895 11.5051C20.665 11.2753 20.55 10.9883 20.55 10.6441Z"
                    fill="#888888"
                  />
                </svg>

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

        <PreviousReports reports={resolvedReports as any} />
      </div>
    </div>
  );
}
