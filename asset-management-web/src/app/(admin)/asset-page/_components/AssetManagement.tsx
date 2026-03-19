"use client";

import { Asset } from "@/gql/graphql";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/libs";
import { ChevronLeft, ChevronRight, Download, ExternalLink, MoreHorizontal, PanelLeft, Pencil, Search } from "lucide-react";
import { useState, useMemo } from "react";
import { AddAsset } from "./add-asset/AddAsset";
import Image from "next/image";


type AssetManagementProps = {
  assets: Asset[];
  onDelete: (id: string) => void;
  onUpdate?: (id: string, input: any) => void;
  refetch: () => void;

}
export default function AssetManagement({ assets, refetch }: AssetManagementProps) {

  const [category, setCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const pageSize = 12;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "ASSIGNED":
        return "text-[#0251CB] bg-[#EEF4FF] border-[#D1E0FF]";
      case "REPAIR":
        return "text-[#F79009] bg-[#FFFAEB] border-[#FEDF89]";
      case "DECOMMISSION":
        return "text-[#F04438] bg-[#FEF3F2] border-[#FEE4E2]";
      case "AVAILABLE":
        return "text-[#12B76A] bg-[#ECFDF3] border-[#ABEFC6]";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

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
console.log(paginatedAssets)
  return (
    <div className="flex min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center px-6 z-50">
        <div className="flex items-center gap-3">
          <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
            <PanelLeft size={20} className="text-gray-500" />
          </button>
          <div className="w-px h-6 bg-gray-200" />
          <span className="text-[15px] font-semibold text-gray-900">
            Asset Management System
          </span>
        </div>
      </header>

      <main className="flex-1 pt-14">
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Хөрөнгө</h1>
              <p className="text-gray-500 text-sm mt-1">
                Компанийн бүх хөрөнгийг удирдах, хянах
              </p>
            </div>
            <div className="flex gap-2">
              <button className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Download size={20} className="text-gray-500" />
              </button>
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
          <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse bg-white">
              <thead className="border-b border-gray-200 bg-gray-50/50">
                <tr className="text-gray-600 text-xs font-medium uppercase tracking-wider">
                  <th className="px-6 py-4 w-12">
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
                  <th className="px-4 py-4">Нэр</th>
                  <th className="px-4 py-4">Ангилал</th>
                  <th className="px-4 py-4">Таг</th>
                  <th className="px-4 py-4">Хувиарлагдсан</th>
                  <th className="px-4 py-4">Байршил</th>
                  <th className="px-4 py-4 text-right">Үнэ</th>
                  <th className="px-10 py-4 w-10"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {paginatedAssets.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleSelectItem(item.id)}
                        className="rounded border-gray-300 w-4 h-4 accent-amber-500 cursor-pointer"
                      />
                    </td>

                    <td className="px-4 py-4 font-medium text-gray-900">
                      <div className="flex gap-2">
                        <div className="border p-2 w-12 rounded-sm">
                          <img src={item.imageUrl} width={30} height={20} alt="zurag" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <p>{item.subCategory?.name}</p>

                          <span
                            className={`px-5 border rounded-[8px] text-xs font-medium inline-flex items-center whitespace-nowrap ${getStatusStyle(
                              item.status
                            )}`}
                          >
                            {getStatusLabel(item.status)}
                          </span>
                        </div>

                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className="px-2.5 py-1 border border-gray-200 rounded-md text-xs text-gray-700 font-medium bg-white">
                        {item?.category?.name}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-600 font-medium">
                      {item.assetTag}
                    </td>
                    <td className="px-4 py-4">
                      {item.assignedTo ? (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-600 border border-gray-200">
                          <p>Хуваарилагдсан</p>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">Хуваарилагдаагүй</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-gray-600 text-sm">
                      Гурван гол
                    </td>
                    <td className="px-4 py-4 text-right font-semibold text-gray-900 whitespace-nowrap">
                      {item.purchaseCost?.toLocaleString()} ₮
                    </td>
                    <td className="px-6 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors  group-hover:opacity-100">
                            <MoreHorizontal size={18}/>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem className="gap-2">
                            <Pencil size={14} />
                            Засах
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <ExternalLink size={14} />
                            Дэлгэрэнгүй
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
