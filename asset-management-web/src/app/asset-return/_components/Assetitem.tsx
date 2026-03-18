"use client";

import { MacBook, Macbook } from "@/app/_components/icons/icons";
import { Clock, Keyboard, Monitor, Phone } from "lucide-react";

interface Asset {
  id: string;
  assetTag: string;
  category: { name: string };
  assignedTo: string | null;
  status: string;
  instructions?: string[];
}

interface AssetItemProps {
  asset: Asset;
}

export default function AssetItem({ asset }: AssetItemProps) {
  const getIcon = () => {
    const name = asset.category?.name.toLowerCase();
    if (name.includes("macbook") || name.includes("laptop")) return <Macbook />;
    if (name.includes("keyboard")) return <Keyboard />;
    if (name.includes("monitor")) return <Monitor size={22} />;
    if (name.includes("phone")) return <Phone />;
    return <MacBook />;
  };

  const getStatusLabel = () => {
    switch (asset.status) {
      case "ASSIGNED":
        return "Хүлээгдэж буй";
      case "AVAILABLE":
        return "Боломжтой";
      case "IN_REPAIR":
        return "Засварт байна";
      default:
        return "Хүлээгдэж буй";
    }
  };

  const defaultInstructions = {
    'MacBook Pro 14"': [
      "Бүх хувийн файлуудаа нөөцөлнө үү",
      "iCloud-оос гарна уу",
      "Цэнэглэгчийг хамт авчирна уу",
    ],
    'Dell UltraSharp 27"': [
      "Цахилгаан кабелийн хамт авчирч өгнө үү",
      "Stand-ийг салгаж болохгүй",
    ],
  };

  const currentInstructions = asset.instructions ||
    defaultInstructions[
      asset.category?.name as keyof typeof defaultInstructions
    ] || ["Цэнэглэгч кабелийн хамт авчирч өгнө үү"];

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-[20px] p-6 shadow-sm mb-4 w-full">
      <div className="flex justify-between items-start pb-5">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 flex items-center justify-center bg-[#F8FAFC] rounded-lg text-[#64748B]">
            {getIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[16px] font-medium leading-[20px] text-[#000000]">
                {asset.category?.name}
              </h1>
              <div className="px-3 py-1 bg-[#FFF9EB] text-[#D97706] text-[12px] flex items-center gap-1.5 rounded-full font-bold">
                <Clock
                  className="text-[#cf9816]"
                  size={12}
                  fill="currentColor"
                  fillOpacity={0.2}
                />
                <span>{getStatusLabel()}</span>
              </div>
            </div>
            <p className="text-[#666666] text-[14px] font-normal mt-0.5">
              {asset.assetTag}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t-2 pt-3 pb-3 ">
        <h3 className="text-[#000000] text-[14px] font-medium leading-[125%]">
          Зааварчилгаа:
        </h3>
        <ul className="space-y-2.5">
          {currentInstructions.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <span className="w-[5px] h-[5px] rounded-full bg-gray-300 mt-1.5 shrink-0" />
              <span className=" text-[14px] text-[#666666] font-normal">
                {" "}
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
