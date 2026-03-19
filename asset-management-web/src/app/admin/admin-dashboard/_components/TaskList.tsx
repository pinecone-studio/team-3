import { Calendar, UserMinus, Settings, ChevronRight } from "lucide-react";

const TASKS = [
  {
    id: 1,
    title: "2026 оны 1-р улирлын тооллого",
    desc: "45 хөрөнгө баталгаажуулалт хүлээгдэж байна",
    deadline: "2 хоног дотор",
    status: "яаралтай",
    icon: Calendar,
  },
  {
    id: 2,
    title: "Чөлөөлөлт: Б. Ганзориг",
    desc: "3 хөрөнгө буцаагдах шаардлагатай",
    deadline: "3 хоног дотор",
    status: "яаралтай",
    icon: UserMinus,
  },
  {
    id: 3,
    title: "Зөөврийн засвар - MAC-2025-042",
    desc: "Дэлгэц солих хүлээгдэж байна",
    deadline: "5 хоног дотор",
    status: "дунд",
    icon: Settings,
  },
];

export const TaskList = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Ирэх ажлууд</h3>
          <p className="text-sm text-gray-400 font-medium">
            Таны анхаарал шаардлагатай ажлууд
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {TASKS.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-4 rounded-xl border border-gray-50 hover:bg-gray-50 transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-4 text-sm leading-tight">
              <div className="p-2.5 bg-gray-50 rounded-lg text-gray-400 group-hover:bg-white group-hover:shadow-sm transition-all">
                <task.icon size={20} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-gray-800">{task.title}</h4>
                <p className="text-xs text-gray-500">{task.desc}</p>
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                  {task.deadline}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                  task.status === "яаралтай"
                    ? "bg-red-50 text-red-500"
                    : "bg-blue-50 text-blue-500"
                }`}
              >
                {task.status}
              </span>
              <ChevronRight
                size={14}
                className="text-gray-300 group-hover:translate-x-1 transition-transform"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
