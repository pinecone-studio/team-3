export default function StatCard() {
  const stats = [
    {
      label: "Нийт хөрөнгө",
      value: "4",
      color: "text-black",
    },
    {
      label: "Хуваарилагдсан",
      value: "3",
      color: "text-black",
    },
    {
      label: "Баталгаажуулах",
      value: "1",
      color: "text-[#D32F2F]",
    },
    {
      label: "Засварт",
      value: "0",
      color: "text-black",
    },
  ];

  return (
    <div className="flex gap-4 w-full">
      {stats.map((item, index) => (
        <div
          key={index}
          className="flex-1 bg-white border border-gray-200 rounded-2xl p-6 h-[148px] flex flex-col justify-between shadow-xs"
        >
          <p className="text-[14px] font-medium text-[#000000]">{item.label}</p>
          <p className={`text-[32px] font-bold ${item.color}`}>{item.value}</p>
        </div>
      ))}
    </div>
  );
}
