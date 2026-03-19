import React from "react";
import * as Icons from "lucide-react";

interface QuickActionProps {
  title: string;
  desc: string;
  icon: string; // Иконы нэрийг string-ээр авна
}

export const QuickActionCard = ({ title, desc, icon }: QuickActionProps) => {
  // Lucide иконуудыг нэрээр нь дуудаж ашиглах
  const IconComponent = (Icons as any)[icon];

  return (
    <button className="flex flex-col items-start p-4 bg-white border border-gray-100 rounded-xl transition-all duration-200 hover:shadow-md hover:border-blue-100 group w-full text-left">
      <div className="p-2 mb-3 bg-gray-50 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors text-gray-500">
        {IconComponent && <IconComponent size={20} strokeWidth={1.5} />}
      </div>

      <div className="space-y-1">
        <h4 className="text-[13px] font-bold text-gray-800 leading-tight group-hover:text-blue-700">
          {title}
        </h4>
        <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
          {desc}
        </p>
      </div>
    </button>
  );
};
