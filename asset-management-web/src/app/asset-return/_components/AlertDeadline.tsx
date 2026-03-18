import { AlertTriangle } from "lucide-react";

interface AlertDeadlineProps {
  daysLeft: number; //uldsen honoguud
  deadline: string; // etssiin hugatsaa
}
export default function AlertDeadline({
  daysLeft,
  deadline,
}: AlertDeadlineProps) {
  return (
    <div className="flex gap-4 bg-[#FFF1F2] border border-[#FEE2E2] rounded-2xl p-5">
      <div className="p-2 bg-white rounded-lg shadow-sm self-start">
        <AlertTriangle className="w-5 h-5 text-[#E11D48]" />
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-[15px] font-bold text-[#991B1B]">
          Хугацаа ойртож байна
        </h1>
        <p className="text-[14px] font-medium text-[#B91C1C]/80">
          Та{" "}
          <span className="text-[#991B1B] font-bold">{daysLeft} хоногийн</span>{" "}
          дотор бүх хөрөнгийг буцааж өгөх шаардлагатай. Эцсийн хугацаа:{" "}
          <span className="text-[#991B1B] font-bold">{deadline}</span>
        </p>
      </div>
    </div>
  );
}
