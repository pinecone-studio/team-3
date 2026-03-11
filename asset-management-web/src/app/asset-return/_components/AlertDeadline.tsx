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
    <div className="bg-white flex gap-4 border border-red-100 rounded-xl p-5 shadow-sm">
      <AlertTriangle className="text-red-500 w-5 h-5 shrink-0 mt-0.5" />

      <div className="flex flex-col gap-1">
        <h1 className="text-red-600 font-bold text-[15px]">
          Хугацаа ойртож байна
        </h1>

        <p className="text-red-500 text-[14px]">
          Та <span className="font-bold">{daysLeft} хоногийн</span> дотор бүх
          хөрөнгийг буцааж өгөх шаардлагатай. Эцсийн хугацаа:
          <span className="font-bold tracking-tight"> {deadline}</span>
        </p>
      </div>
    </div>
  );
}
