import { Check, Plus, ArrowLeftRight, Info, Clock } from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Хөрөнгө хуваарилагдсан",
    desc: "MAC-2026-005 Т. Энхжаргалд хуваарилагдсан",
    user: "Бат-Эрдэнэ А.",
    initials: "БА",
    time: "10 минутын өмнө",
    icon: <Check size={16} strokeWidth={3} />,
  },
  {
    id: 2,
    title: "Шинэ хөрөнгө бүртгэгдсэн",
    desc: 'MON-2026-012 - Dell UltraSharp 27"',
    user: "Оюунбилэг Д.",
    initials: "ОД",
    time: "1 цагийн өмнө",
    icon: <Plus size={16} strokeWidth={3} />,
  },
  {
    id: 3,
    title: "Хөрөнгө шилжүүлэгдсэн",
    desc: "PHN-2025-008 Д. Амгалангаас Б. Цолмонд",
    user: "Бат-Эрдэнэ А.",
    initials: "БА",
    time: "2 цагийн өмнө",
    icon: <ArrowLeftRight size={16} strokeWidth={3} />,
  },
  {
    id: 4,
    title: "Тооллогын зөрүү",
    desc: "LPT-2024-023 байршлын зөрүү илэрсэн",
    user: "Систем",
    initials: "СИ",
    time: "3 цагийн өмнө",
    icon: <Info size={16} strokeWidth={3} />,
  },
  {
    id: 5,
    title: "Баталгаажуулалт хүлээгдэж байна",
    desc: "MAC-2026-003 Э. Мөнхбатаас гарын үсэг хүлээгдэж байна",
    user: "Систем",
    initials: "СИ",
    time: "5 цагийн өмнө",
    icon: <Clock size={16} strokeWidth={3} />,
  },
];

const ActivityTimeline = () => {
  return (
    <div className=" w-full border border-gray-200 rounded-2xl p-8 bg-white font-sans">
      <div className="mb-8">
        <h2 className="text-[16px] font-medium text-[#000000]">
          Сүүлийн үйл ажиллагаа
        </h2>
        <p className="text-[#555555] text-[14px] mt-1">
          Системийн сүүлийн үйлдлүүд
        </p>
      </div>

      <div className="relative">
        {activities.map((item, index) => (
          <div key={item.id} className="relative flex gap-6 pb-10 last:pb-0">
            {index !== activities.length - 1 && (
              <div className="absolute left-[20px] top-[40px] w-[1px] h-[calc(100%-40px)] bg-gray-100"></div>
            )}

            <div className=" z-10 flex items-center justify-center w-10 h-10 rounded-full border border-gray-100 bg-white text-gray-800 shadow-sm shrink-0">
              {item.icon}
            </div>

            <div className="flex justify-between w-full pt-1">
              <div className="space-y-1.5">
                <h3 className="text-[15px] font-medium text-[#000000] leading-none">
                  {item.title}
                </h3>
                <p className="text-sm text-[#555555] font-normal">
                  {item.desc}
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-[10px] font-bold text-gray-500">
                    {item.initials}
                  </div>
                  <span className="text-[12px] text-[#555555]">
                    {item.user}
                  </span>
                </div>
              </div>

              <div className="text-[12px] text-[#555555] whitespace-nowrap pt-0.5">
                {item.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimeline;
