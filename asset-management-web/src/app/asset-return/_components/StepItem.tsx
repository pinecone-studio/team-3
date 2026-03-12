import { Check } from "lucide-react";

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
        <div
          className={`absolute left-[16px] top-[36px] w-[1.5px] h-[calc(100%-28px)]
 ${isCompleted ? "bg-black" : "bg-slate-100"}`}
        />
      )}

      <div className="relative z-10 shrink-0">
        {isCompleted ? (
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white ring-4 ">
            <Check size={16} strokeWidth={3} />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-slate-400 font-medium text-[12px] ring-4 ring-white shadow-sm">
            {number}
          </div>
        )}
      </div>

      <div className="pb-10">
        <h4
          className={`text-[16px] font-medium ${
            isCompleted ? "text-gray-900" : "text-[#000000]"
          }`}
        >
          {title}
        </h4>

        <p className="text-[14px] text-[#555555] mt-1 leading-relaxed font-normal">
          {desc}
        </p>
      </div>
    </div>
  );
}
