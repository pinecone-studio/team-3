"use client";

import { Asset, AssetStatusEnum } from "@/gql/graphql";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/libs";
import { ChevronLeft, ChevronRight, Download, PanelLeft, Search } from "lucide-react";
import { useState, useMemo } from "react";
import { AddAsset } from "./add-asset/AddAsset";
import Image from "next/image";
import { AssetActions } from "./AssetActions";
import { exportAssetsToExcel } from "../_utils/exportAssetsToExcel";
import { useRouter } from "next/navigation";


type AssetManagementProps = {
  assets: Asset[];
  onDelete: (id: string) => void;
  onUpdate?: (id: string, input: any) => void;
  refetch: () => void;

}
export default function AssetManagement({ assets, refetch }: AssetManagementProps) {
  const router = useRouter()
  const [category, setCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const pageSize = 12;


  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ASSIGNED":
        return "Хуваарилагдсан";
      case "REPAIR":
        return "Засварт";
      case "DECOMMISSION":
        return "Актлах";
      case "AVAILABLE":
        return "Сул";
      default:
        return status;
    }
  };

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const searchLower = search.toLowerCase();

      const matchSearch =
        asset?.assetTag?.toLowerCase().includes(searchLower) ||
        asset?.serialNumber?.toLowerCase().includes(searchLower);

      const matchCategory =
        category === "all" || asset?.category?.name === category;

      const matchStatus =
        statusFilter === "all" || asset?.status === statusFilter;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [assets, search, category, statusFilter]);

  const totalPages = Math.ceil(filteredAssets.length / pageSize);

  const paginatedAssets = filteredAssets.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === paginatedAssets.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(paginatedAssets.map((item) => item.id));
    }
  };

  const handleRowClick = (assetId: string) => {
    router.push(`/asset-page/detail?assetId=${assetId}`);
  };

  return (
    <div className="flex  min-h-screen bg-white">
      <main className="flex-1 ">
        <div className="p-2 space-y-6">
          {/* Page Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Хөрөнгө</h1>
              <p className="text-gray-500 text-sm mt-1">
                Компанийн бүх хөрөнгийг удирдах, хянах
              </p>
            </div>
            <div className="flex gap-2">
              <div className="relative group">
                <button
                  onClick={() => exportAssetsToExcel(assets)}
                  className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download size={20} className="text-gray-500" />
                </button>
                <span className="absolute w-[90px] -top-13 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Татаж авах
                </span>
              </div>
              <AddAsset refetch={refetch} />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Хөрөнгийн код, серийн дугаар эсвэл нэрээр хайх..."
                className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 shadow-sm"
              />
            </div>

            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-36 border-gray-200">
                <SelectValue placeholder="Төлөв" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Төлөв</SelectItem>
                <SelectItem value="ASSIGNED">Хуваарилсан</SelectItem>
                <SelectItem value="AVAILABLE">Сул</SelectItem>
                <SelectItem value="REPAIR">Засварт</SelectItem>
                <SelectItem value="DECOMMISSION">Актлах</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={category}
              onValueChange={(value) => {
                setCategory(value);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-36 border-gray-200">
                <SelectValue placeholder="Хэлтэс" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Хэлтэс</SelectItem>
                <SelectItem value="MacBook">MacBook</SelectItem>
                <SelectItem value="Зөөврийн">Зөөврийн</SelectItem>
                <SelectItem value="Монитор">Монитор</SelectItem>
                <SelectItem value="Утас">Утас</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse bg-white">
              <thead className="border-b border-gray-200">
                <tr className="text-gray-500 text-sm font-normal">
                  <th className="px-4 py-4 w-10 font-normal">
                    <input
                      type="checkbox"
                      checked={
                        selectedItems.length === paginatedAssets.length &&
                        paginatedAssets.length > 0
                      }
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300 w-4 h-4 accent-amber-500 cursor-pointer"
                    />
                  </th>
                  <th className="py-4 font-normal text-left" style={{ width: '40%' }}>Хөрөнгө</th>
                  <th className="px-4 py-4 font-normal text-left">Ангилал</th>

                  <th className="px-4 py-4 font-normal text-left">
                    <span className="inline-flex items-center gap-1">
                      Хуваарилагдсан
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                        <path strokeLinecap="round" strokeWidth="1.5" d="M12 16v-4m0-4h.01" />
                      </svg>
                    </span>
                  </th>
                  <th className="px-4 py-4 font-normal text-left">Хэлтэс</th>
                  <th className="px-4 py-4 font-normal text-left">Үнэ</th>
                  <th className="px-4 py-4 font-normal text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {paginatedAssets.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => handleRowClick(item.id)}
                    className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                  >
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleSelectItem(item.id)}
                        className="rounded border-gray-300 w-4 h-4 accent-amber-500 cursor-pointer"
                      />
                    </td>

                    <td className="py-4 font-medium text-gray-900">
                      <div className="flex items-center gap-3">
                        <div className="border border-gray-200 p-1.5 w-12 h-12 rounded-md flex items-center justify-center bg-white">
                          <img src={item.imageUrl} width={32} height={32} alt="zurag" className="object-contain" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                          <span
                            className={`inline-flex items-center gap-1.5 text-xs font-medium ${item.status === AssetStatusEnum.Available ? "text-emerald-600" :
                              item.status === AssetStatusEnum.Assigned ? "text-blue-600" :
                                item.status === AssetStatusEnum.InRepair ? "text-amber-600" : "text-red-600"
                              }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${item.status === AssetStatusEnum.Available ? "bg-emerald-500" :
                              item.status === AssetStatusEnum.Assigned ? "bg-blue-500" :
                                item.status === AssetStatusEnum.InRepair ? "bg-amber-500" : "bg-red-500"
                              }`}></span>
                            {getStatusLabel(item.status)}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 max-w-[140px] text-center">
                      <span className="block truncate px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium">
                        {item?.category?.name || "—"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-400 text-sm">
                      {item.assignedTo ? "Хувиарлагдсан" : "Хувиардагдаагүй"}
                    </td>
                    <td className="px-4 py-4 text-gray-400 text-sm">
                      {item.department?.name || "—"}
                    </td>
                    <td className="px-4 py-4 text-gray-400 text-sm">
                      {item.purchaseCost}
                    </td>


                    <td className="px-4 py-4">
                      <AssetActions item={item} refetch={refetch} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center pt-2">
            <span className="text-sm text-gray-500">
              <span className="font-semibold text-gray-900">
                {filteredAssets.length}
              </span>{" "}
              хөрөнгөөс{" "}
              <span className="font-semibold text-gray-900">
                {paginatedAssets.length}
              </span>
              -г харуулж байна
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className={`flex items-center gap-1.5 border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-all ${page === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <ChevronLeft size={16} />
                Өмнөх
              </button>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || totalPages === 0}
                className={`flex items-center gap-1.5 border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-all ${page === totalPages || totalPages === 0
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                Дараах
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
