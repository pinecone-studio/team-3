import StepItem from "./StepItem";

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
    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
      <h3 className="font-bold text-[16px] mb-1">Буцаалтын алхамууд</h3>

      <p className="text-[12px] text-gray-400 mb-8 font-medium">
        Хөрөнгө буцаахын өмнө хийх зүйлс
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
    </div>
  );
}
