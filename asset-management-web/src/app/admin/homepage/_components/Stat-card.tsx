import {
  Package,
  FileText,
  QrCode,
  AlertCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

export default function AdminStatCard() {
  const stats = [
    {
      label: "Нийт хөрөнгө",
      value: "156",
      subValue: "+12 өмнөх сараас",
      icon: <Package size={20} className="text-gray-400" />,
      trendIcon: <TrendingUp size={14} className="text-gray-400" />,
      type: "neutral",
    },
    {
      label: "Хуваарилагдсан",
      value: "128",
      subValue: "82% хуваарилалтын хувь",
      icon: <FileText size={20} className="text-gray-400" />,
      type: "neutral",
    },
    {
      label: "Идэвхтэй тооллого",
      value: "2",
      subValue: "45 баталгаажуулалт хүлээгдэж буй",
      icon: <QrCode size={20} className="text-gray-400" />,
      type: "neutral",
    },
    {
      label: "Хүлээгдэж буй",
      value: "8",
      subValue: "-3 өчигдрөөс",
      icon: <AlertCircle size={20} className="text-gray-400" />,
      trendIcon: <TrendingDown size={14} className="text-gray-400" />,
      type: "neutral",
    },
  ];

  return (
    <div className="flex  gap-4 ">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white flex-1 border border-gray-200 rounded-2xl p-6 h-[167px] flex flex-col justify-between shadow-xs"
        >
          <div className="flex justify-between items-start">
            <p className="text-[16px] font-medium text-[#000000]">
              {item.label}
            </p>
            <div className="p-2 bg-gray-50 rounded-lg">{item.icon}</div>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-[32px] font-bold text-gray-900 leading-none">
              {item.value}
            </p>
            <div className="flex items-center gap-1 mt-1">
              {item.trendIcon && item.trendIcon}
              <p className="text-[12px] text-gray-500 font-normal">
                {item.subValue}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
