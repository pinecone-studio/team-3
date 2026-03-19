import { CheckCircle2, PlusCircle, ArrowLeftRight } from "lucide-react";

const ACTIVITIES = [
  {
    id: 1,
    type: "success",
    title: "Хөрөнгө хуваарилагдсан",
    target: "MAC-2026-005 Т. Энхжаргалд хуваарилагдсан",
    user: "Бат-Эрдэнэ А.",
    time: "10 минутын өмнө",
    icon: CheckCircle2,
    color: "text-emerald-500",
  },
  {
    id: 2,
    type: "add",
    title: "Шинэ хөрөнгө бүртгэгдсэн",
    target: 'MON-2026-012 - Dell UltraSharp 27"',
    user: "Оюунбилэг Д.",
    time: "1 цагийн өмнө",
    icon: PlusCircle,
    color: "text-blue-500",
  },
  {
    id: 3,
    type: "transfer",
    title: "Хөрөнгө шилжүүлэгдсэн",
    target: "PHN-2025-008 Д. Амгалангаас Б. Цолмонд",
    user: "Бат-Эрдэнэ А.",
    time: "2 цагийн өмнө",
    icon: ArrowLeftRight,
    color: "text-gray-600",
  },
];

export const RecentActivity = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-full relative overflow-hidden">
      {/* Background "b" letter aesthetic from your design */}
      <div className="absolute top-4 right-4 w-12 h-12 bg-gray-900/10 rounded-full flex items-center justify-center blur-[1px]">
        <span className="text-white font-bold text-xl">b</span>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-800">
          Сүүлийн үйл ажиллагаа
        </h3>
        <p className="text-sm text-gray-400 font-medium font-inter">
          Системийн сүүлийн үйлдлүүд
        </p>
      </div>

      <div className="relative space-y-8 before:absolute before:inset-0 before:left-[11px] before:w-[1.5px] before:bg-gray-100 before:h-[85%] before:top-2">
        {ACTIVITIES.map((activity) => (
          <div key={activity.id} className="relative flex gap-4">
            {/* Dot Icon */}
            <div className="relative z-10 bg-white rounded-full p-0.5 mt-1 text-xs">
              <activity.icon
                size={22}
                strokeWidth={2}
                className={`${activity.color} bg-white rounded-full`}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-0.5">
                <h4 className="text-sm font-bold text-gray-800">
                  {activity.title}
                </h4>
                <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 truncate mb-2">
                {activity.target}
              </p>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-500">
                  {activity.user.substring(0, 2)}
                </div>
                <span className="text-[10px] text-gray-400 font-semibold">
                  {activity.user}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
