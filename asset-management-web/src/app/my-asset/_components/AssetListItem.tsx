import {
  Laptop,
  Monitor,
  Smartphone,
  Keyboard,
  MoreHorizontal,
} from "lucide-react";

const getIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "monitor":
      return <Monitor className="w-5 h-5 text-gray-500" />;
    case "smartphone":
      return <Smartphone className="w-5 h-5 text-gray-500" />;
    case "keyboard":
      return <Keyboard className="w-5 h-5 text-gray-500" />;
    default:
      return <Laptop className="w-5 h-5 text-gray-500" />;
  }
};

export const AssetListItem = ({ data }: { data: any }) => {
  return (
    <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_40px] gap-4 items-center py-4 border-b-2 border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
          {getIcon(data.iconType)}
        </div>
        <div>
          <h4 className="font-semibold text-[14px] text-gray-900 leading-tight">
            {data.name}
          </h4>
          <p className="text-[12px] text-gray-400 mt-0.5">{data.specs}</p>
        </div>
      </div>

      <div>
        <p className="text-[13px] font-medium text-gray-800">{data.serial}</p>
        <p className="text-[11px] text-gray-400 uppercase tracking-wider">
          {data.subSerial}
        </p>
      </div>

      <div>
        <span
          className={`px-3 py-1 rounded-md text-[12px] font-medium ${
            data.status === "Баталгаажуулах"
              ? "bg-[#D32F2F] text-white"
              : "bg-[#F3F4F6] text-gray-600"
          }`}
        >
          {data.status}
        </span>
      </div>

      <div>
        <p
          className={`text-[13px] font-medium ${
            data.condition === "Шинэ" ? "text-teal-500" : "text-green-600"
          }`}
        >
          {data.condition}
        </p>
      </div>

      <div>
        <p className="text-[13px] text-gray-500">{data.date}</p>
      </div>

      <button className="flex justify-center text-gray-400 hover:text-gray-600">
        <MoreHorizontal size={20} />
      </button>
    </div>
  );
};
