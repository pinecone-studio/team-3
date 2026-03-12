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
      return <Monitor className="w-5 h-5 text-gray-500 strokeWidth={1.5}" />;
    case "smartphone":
      return <Smartphone className="w-5 h-5 text-gray-500 strokeWidth={1.5}" />;
    case "keyboard":
      return <Keyboard className="w-5 h-5 text-gray-500 strokeWidth={1.5}" />;
    default:
      return <Laptop className="w-5 h-5 text-gray-500 strokeWidth={1.5}" />;
  }
};

export const AssetListItem = ({ data }: { data: any }) => {
  return (
    <div className="grid grid-cols-[2.5fr_2fr_1.5fr_1fr_1.5fr_40px] gap-4 items-center py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#F9FAFB] border border-gray-200 rounded-md flex items-center justify-center shrink-0">
          {getIcon(data.iconType)}
        </div>
        <div>
          <h4 className="font-medium text-[14px] text-[#111827] ">
            {data.name}
          </h4>
          <p className="text-[13px] text-gray-400 mt-0.5">{data.specs}</p>
        </div>
      </div>

      <div>
        <p className="text-[14px] font-medium text-[#111827]">{data.serial}</p>
        <p className="text-[13px] text-gray-400 mt-0.5">{data.subSerial}</p>
      </div>

      <div>
        <span
          className={`px-2.5 py-1 rounded-[6px] text-[12px] font-medium ${
            data.status === "Баталгаажуулах"
              ? "bg-[#FCE8E8] text-[#C62828]"
              : "bg-white border border-gray-200 text-gray-600"
          }`}
        >
          {data.status}
        </span>
      </div>

      <div>
        <p className="text-[14px] text-[#111827]">{data.condition}</p>
      </div>

      <div>
        <p className="text-[14px] text-gray-500">{data.date}</p>
      </div>

      <button className="flex justify-center text-gray-400 hover:text-gray-600">
        <MoreHorizontal size={20} />
      </button>
    </div>
  );
};
