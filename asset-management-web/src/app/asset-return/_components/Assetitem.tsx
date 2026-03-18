"use client";

import { useQuery, gql } from "@apollo/client";
import { Clock, Keyboard, Monitor, Phone } from "lucide-react";
import { MacBook } from "@/app/_components/icons/icons";

const GET_ASSETS = gql`
  query GetAssets {
    getAssets {
      id
      assetTag
      category {
        name
      }
      assignedTo
      status
    }
  }
`;

interface Asset {
  id: string;
  assetTag: string;
  category: { name: string };
  assignedTo: string | null;
  status:
    | "AVAILABLE"
    | "ASSIGNED"
    | "IN_REPAIR"
    | "DISPOSED"
    | "PENDING_DISPOSAL"
    | "LOST";
}

interface AssetItemProps {
  asset: Asset;
}

export default function AssetItem({ asset }: AssetItemProps) {
  const getIcon = () => {
    const name = asset.category?.name.toLowerCase();
    if (name.includes("macbook") || name.includes("laptop")) return <MacBook />;
    if (name.includes("keyboard")) return <Keyboard />;
    if (name.includes("monitor")) return <Monitor />;
    if (name.includes("phone")) return <Phone />;
    return <MacBook />;
  };

  const getStatusLabel = () => {
    switch (asset.status) {
      case "ASSIGNED":
        return "Хүлээгдэж байна";
      case "AVAILABLE":
        return "Боломжтой";
      case "IN_REPAIR":
        return "Засварт байна";
      case "DISPOSED":
      case "PENDING_DISPOSAL":
        return "Устгагдсан";
      case "LOST":
        return "Алга болсон";
      default:
        return "Тодорхойгүй";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-start border-b-2 border-gray-50 pb-4">
        <div className="flex gap-4 items-center">
          {getIcon()}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-medium text-[16px]">
                {asset.category?.name}
              </h1>
              <div className="px-2 py-0.5 text-center items-center justify-center gap-2 bg-[#FFF4DB] text-[12px] flex rounded-sm font-medium">
                <Clock className="text-[#cf9816]" size={12} />
                <p>{getStatusLabel()}</p>
              </div>
            </div>
            <p className="text-[14px] text-[#555555] font-medium tracking-wider">
              {asset.assetTag}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
