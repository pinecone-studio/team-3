import { CheckCircle2 } from "lucide-react";

export default function StepItem({
  isCompleted,
  number,
  title,
  desc,
  isLast,
}: any) {
  return (
    <div className="flex gap-5 relative">
      {!isLast && (
        <div className="absolute left-[15px] top-[32px] w-[2px] h-[calc(100%-32px)] bg-gray-100" />
      )}

      <div className="relative z-10 shrink-0">
        {isCompleted ? (
          <div className="w-8 h-8 rounded-full bg-[#2D6A4F] flex items-center justify-center text-white ring-4 ring-white shadow-sm">
            <CheckCircle2 size={18} />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-gray-400 font-bold text-[12px] ring-4 ring-white shadow-sm">
            {number}
          </div>
        )}
      </div>

      <div className="pb-10">
        <h4
          className={`text-[16px] font-bold ${
            isCompleted ? "text-gray-900" : "text-gray-500"
          }`}
        >
          {title}
        </h4>

        <p className="text-[14px] text-gray-400 mt-1 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
