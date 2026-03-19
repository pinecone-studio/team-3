import { ClipboardList, UserCheck, Wrench, FileCheck } from "lucide-react";

const tasks = [
  {
    id: 1,
    title: "2026 оны 1-р улирлын тооллого",
    description: "45 хөрөнгө баталгаажуулалт хүлээгдэж байна",
    deadline: "2 хоног дотор",
    priority: "Яаралтай",
    icon: <ClipboardList className="text-gray-500" size={20} />,
    isHighPriority: true,
  },
  {
    id: 2,
    title: "Чөлөөлөлт: Б. Ганзориг",
    description: "3 хөрөнгө буцаагдах шаардлагатай",
    deadline: "3 хоног дотор",
    priority: "Яаралтай",
    icon: <UserCheck className="text-gray-500" size={20} />,
    isHighPriority: true,
  },
  {
    id: 3,
    title: "Зөөврийн засвар - MAC-2025-042",
    description: "Дэлгэц солих хүлээгдэж байна",
    deadline: "5 хоног дотор",
    priority: "Дунд",
    icon: <Wrench className="text-gray-500" size={20} />,
    isHighPriority: false,
  },
  {
    id: 4,
    title: "Дата устгалын баталгаажуулалт",
    description: "LPT-2024-018 баталгаажуулалт хүлээгдэж байна",
    deadline: "1 долоо хоног дотор",
    priority: "Дунд",
    icon: <FileCheck className="text-gray-500" size={20} />,
    isHighPriority: false,
  },
];

export default function UpcomingTasks() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 w-full shadow-xs">
      <div className="mb-6">
        <h3 className="text-[16px] font-medium text-[#000000]">Ирэх ажлууд</h3>
        <p className="text-[14px] font-normal text-[#555555]">
          Таны анхаарал шаардлагатай ажлууд
        </p>
      </div>

      <div className="flex flex-col gap-[12px]">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex  items-start gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="p-3 bg-gray-50 rounded-lg">{task.icon}</div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="text-[14px] font-medium text-gray-900">
                  {task.title}
                </h4>
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-medium uppercase ${
                    task.isHighPriority
                      ? "bg-black text-white "
                      : "border border-gray-200 bg-gray-100 text-gray-400"
                  }`}
                >
                  {task.priority}
                </span>
              </div>
              <p className="text-[12px] text-[#555555] font-normal mt-1">
                {task.description}
              </p>
              <p className="text-[12px] text-[#555555] mt-2 font-normal">
                {task.deadline}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
