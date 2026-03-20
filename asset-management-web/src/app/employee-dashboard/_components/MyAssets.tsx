"use client";

import Image from "next/image";
import { Monitor, Laptop, Smartphone, HardDrive, Package } from "lucide-react";
import { AssetWithCategory } from "./GeneralTab";

interface Asset {
  imageUrl: string;
  category?: { name: string };
  assetTag: string;
  serialNumber: string;
  status: string;
}

interface MyAssetsProps {
  assets: AssetWithCategory[] | null;
}

const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
  "Хэрэглэж байна": {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  "Засварт": {
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  "Идэвхгүй": {
    bg: "bg-slate-100",
    text: "text-slate-600",
    dot: "bg-slate-400",
  },
};

const getCategoryIcon = (categoryName: string | undefined) => {
  const name = categoryName?.toLowerCase() || "";
  if (name.includes("компьютер") || name.includes("computer")) {
    return <Monitor className="w-5 h-5" />;
  }
  if (name.includes("laptop") || name.includes("зөөврийн")) {
    return <Laptop className="w-5 h-5" />;
  }
  if (name.includes("утас") || name.includes("phone")) {
    return <Smartphone className="w-5 h-5" />;
  }
  if (name.includes("хард") || name.includes("drive")) {
    return <HardDrive className="w-5 h-5" />;
  }
  return <Package className="w-5 h-5" />;
};

export default function MyAssets({ assets }: MyAssetsProps) {
    console.log(assets)
  const getStatusStyle = (status: string) => {
    return (
      statusStyles[status] || {
        bg: "bg-blue-50",
        text: "text-blue-700",
        dot: "bg-blue-500",
      }
    );
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/80 rounded-2xl p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Миний хөрөнгө
            </h3>
            <p className="text-sm text-slate-500">
              Танд олгогдсон төхөөрөмжүүд
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
          <span className="text-xs font-medium text-slate-600">Нийт:</span>
          <span className="text-sm font-bold text-indigo-600">{assets?.length}</span>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {assets?.map((asset, i) => {
          const statusStyle = getStatusStyle(asset.status);
          return (
            <div
              key={i}
              className="group relative bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-indigo-200 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                {/* Top section with image and info */}
                <div className="flex items-start gap-4 mb-4">
                  {/* Image container */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden group-hover:border-indigo-200 transition-colors">
                      <img
                        src={asset.imageUrl || ""}
                        width={72}
                        height={72}
                        alt={asset.category?.name || "Төхөөрөмж"}
                        className="object-contain p-1"
                      />
                    </div>
                    {/* Category icon badge */}
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-sm group-hover:text-indigo-600 group-hover:border-indigo-200 transition-colors">
                      {getCategoryIcon(asset.category?.name)}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 pt-1">
                    <p className="text-base sm:text-lg font-semibold text-slate-900 truncate mb-1 group-hover:text-indigo-900 transition-colors">
                      {asset.category?.name || "Төхөөрөмж"}
                    </p>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                          Tag
                        </span>
                        <span className="text-xs font-mono text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                          {asset.assetTag}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                          S/N
                        </span>
                        <span className="text-xs font-mono text-slate-600 truncate">
                          {asset.serialNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-3" />

                {/* Status */}
                <div className="flex items-center justify-between">
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${statusStyle.bg}`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${statusStyle.dot} animate-pulse`}
                    />
                    <span className={`text-sm font-medium ${statusStyle.text}`}>
                      {asset.status}
                    </span>
                  </div>
                  <button className="text-xs text-slate-400 hover:text-indigo-600 font-medium transition-colors opacity-0 group-hover:opacity-100">
                    Дэлгэрэнгүй →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {assets?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <Package className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-600 font-medium mb-1">Хөрөнгө олдсонгүй</p>
          <p className="text-sm text-slate-400">Танд олгогдсон төхөөрөмж байхгүй байна</p>
        </div>
      )}
    </div>
  );
}
