import { Button } from "@/libs";
import StepItem from "./StepItem";
import { PhoneCall } from "lucide-react";

interface Step {
  id: number;
  title: string;
  desc: string;
  isCompleted: boolean;
}

interface StepsSectionProps {
  steps: Step[];
}

export default function StepsSection({ steps }: StepsSectionProps) {
  return (
    <div className="bg-white border border-gray-200  rounded-xl p-8 shadow-sm">
      <h3 className="font-medium text-[16px] text-black mb-1">
        Буцаалтын алхамууд
      </h3>

      <p className="text-[14px] text-black mb-8 font-normal">
        Эдгээр төхөөрөмжүүдийг бүгдийг нь буцааж өгөх шаардлагатай
      </p>
      <div className="flex flex-col">
        {steps.map((step, idx) => (
          <StepItem
            key={step.id}
            isCompleted={step.isCompleted}
            number={idx + 1}
            title={step.title}
            desc={step.desc}
            isLast={idx === steps.length - 1}
          />
        ))}
      </div>
      <div className="flex  mt-2">
        <Button className="bg-[#2F6FED]  text-white px-2 py-4 rounded-lg flex items-center gap-2 text-sm font-bold shadow-md transition-all active:scale-95">
          <PhoneCall size={18} />
          IT-тай холбогдох
        </Button>
      </div>
    </div>
  );
}
