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
    <div className=" flex gap-4 border bg-[#FAF1F2] border-[#E38C90] rounded-xl p-2 shadow-sm">
      <AlertTriangle className="  w-5 h-5 shrink-0 mt-0.5 text-[#222222]" />

      <div className="flex flex-col gap-1">
        <h1 className=" text-[14px] font-medium text-[#222222]">
          Хугацаа ойртож байна
        </h1>

        <p className="leading-relaxed text-[14px] font-normal text-[#222222]/90">
          Та <span>{daysLeft} хоногийн</span> дотор бүх хөрөнгийг буцааж өгөх
          шаардлагатай. Эцсийн хугацаа:
          <span> {deadline}</span>
        </p>
      </div>
    </div>
  );
}
