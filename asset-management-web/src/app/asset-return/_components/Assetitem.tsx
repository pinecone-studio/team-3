import { MacBook } from "@/app/_components/icons/icons";
import { Clock, Keyboard, Monitor, Phone, Timer } from "lucide-react";

interface Asset {
  id: number;
  name: string;
  code: string;
  status: "pending" | "returned" | "lost";
  type?: "macbook" | "monitor" | "keyboard" | "phone";
  instructions?: string[];
}
interface AssetItemProps {
  asset: Asset;
}

export default function AssetItem({ asset }: any) {
  const getIcon = () => {
    switch (asset.type) {
      case "macbook":
        return <MacBook />;
      case "monitor":
        return <Monitor />;
      case "keyboard":
        return <Keyboard />;
      case "phone":
        return <Phone />;
      default:
        return <MacBook />;
    }
  };
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-start border-b-2 border-gray-50 pb-4">
        <div className="flex gap-4 items-center">
          {getIcon()}

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-medium text-[16px]">{asset.name}</h1>

              <div className="px-2 py-0.5 text-center items-center justify-center gap-2 bg-[#FFF4DB] text-[12px] flex rounded-sm font-medium">
                <Clock className="text-[#cf9816]" size={12} />
                <p>
                  {asset.status == "pending"
                    ? "Хүлээгдэж байна"
                    : asset.status === "returned"
                      ? "Буцаагдсан"
                      : "Алга болсон"}
                </p>
              </div>
            </div>

            <p className="text-[14px] text-[#555555] font-medium tracking-wider">
              {asset.code}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-[14px] font-bold text-gray-800 mb-2">
          Зааварчилгаа:
        </p>
        <ul className="space-y-1.5 text-[14px] font-medium text-[#555555]">
          {asset.instructions?.map((item: string, idx: number) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 bg-gray-500 rounded-full shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
