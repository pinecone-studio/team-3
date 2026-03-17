"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Download,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Settings2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Button,
} from "@/libs";

import { GetAssetsQuery } from "@/gql/graphql";


type AssetType = NonNullable<GetAssetsQuery["getAssets"]>[number];
interface Props {
  assets: AssetType[];
  onDelete: (id: string) => void;
  onUpdate?: (id: string, input: any) => void;
}
export default function AssetManagement({ assets, onDelete, onUpdate }: Props) {
  const [category, setCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 10;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "ASSIGNED":
        return "text-[#0251CB] bg-[#EEF4FF] border-[#D1E0FF]";
      case "Засварт":
        return "text-[#F79009] bg-[#FFFAEB] border-[#FEDF89]";
      case "Актлах":
        return "text-[#F04438] bg-[#FEF3F2] border-[#FEE4E2]";
      case "Сул":
        return "text-[#12B76A] bg-[#ECFDF3] border-[#ABEFC6]";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };
  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const searchLower = search.toLowerCase();

      const matchSearch =
        asset.assetTag?.toLowerCase().includes(searchLower) ||
        asset.serialNumber?.toLowerCase().includes(searchLower);

      const matchCategory =
        category === "all" || asset.category?.name === category;

      const matchStatus =
        statusFilter === "all" || asset.status === statusFilter;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [assets, search, category, statusFilter]);

  const totalPages = Math.ceil(filteredAssets.length / pageSize);

  const paginatedAssets = filteredAssets.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  return (
    <div className="flex-1 flex flex-col bg-white font-gilroy min-h-screen">
      <main className="p-6 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-[24px] font-semibold leading-[125%] text-gray-900">
              Хөрөнгө
            </h1>
            <p className="text-[#666666] text-[14px] font-normal leading-[125%] mt-1">
              Компанийн бүх хөрөнгийг удирдах, хянах
            </p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Download size={20} className="text-gray-500" />
            </button>
            <Button className="bg-[#0251CB] hover:bg-[#0241a1] h-[40px] px-5 text-white cursor-pointer text-[14px] font-semibold rounded-lg flex items-center gap-2 transition-colors">
              <Plus size={18} />
              Хөрөнгө нэмэх
            </Button>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Хөрөнгийн код, серийн дугаар эсвэл нэрээр хайх..."
              className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 shadow-sm"
            />
          </div>

          <select
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] bg-white min-w-[160px] text-gray-600 outline-none cursor-pointer"
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          >
            <option value="all">Бүх ангилал</option>
            <option value="MacBook M4 Pro">MacBook</option>
            <option value="Зөөврийн">Зөөврийн</option>
            <option value="Монитор">Монитор</option>
          </select>

          <select
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] bg-white min-w-[160px] text-gray-600 outline-none cursor-pointer"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Бүх төлөв</option>
            <option value="ASSIGNED">Хуваарилсан</option>
            <option value="Сул">Сул</option>
            <option value="Засварт">Засварт</option>
          </select>

          <button className="p-2.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
            <Settings2 size={20} />
          </button>
        </div>

        <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm p-5 min-h-[530px]">
          <table className="w-full text-left border-collapse bg-white">
            <thead className=" border-b border-gray-200">
              <tr className="text-[#000000] text-[14px] font-semibold leading-[125%] uppercase  tracking-wider">
                <th className="px-6 py-4 w-12"></th>
                <th className="px-4 py-4">Серийн дугаар</th>
                <th className="px-4 py-4">Ангилал</th>
                <th className="px-4 py-4 text-center">Таг</th>
                <th className="px-4 py-4">Төлөв</th>
                <th className="px-4 py-4">Хуваарилсан</th>
                <th className="px-4 py-4">Хэлтэс</th>
                <th className="px-4 py-4 text-right whitespace-nowrap">Үнэ</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {paginatedAssets.map((item, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-6 py-3.5 text-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 w-4 h-4 accent-blue-600 cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3.5 font-medium text-gray-900">
                    {item.serialNumber || "-"}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="px-2.5 py-1 border border-[#E2E8F0] rounded-lg text-[12px] text-[#000000] font-medium">
                      {item.category?.name || "Бусад"}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-semibold text-gray-900">
                    {item.assetTag}
                  </td>
                  <td className="px-4 py-3.5 text-center ">
                    <span
                      className={`px-3 py-1  border rounded-full text-[12px] font-medium inline-flex items-center justify-center whitespace-nowrap ${getStatusStyle(item.status || "")}`}
                    >
                      {item.status || "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    {item.assignedTo ? (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 border border-gray-200 shrink-0">
                          {item.assignedTo.substring(0, 2).toUpperCase()}
                        </div>{" "}
                        <span className="font-normal text-[14px] text-[#000000] truncate ">
                          T. Enkhjargal
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-300 ml-3">—</span>
                    )}
                  </td>

                  <td className="px-4 py-3.5 text-right font-bold text-[14px] text-[#666666]">
                    GG - Floor 1
                  </td>
                  <td className="px-4 py-4 text-right font-bold text-gray-900 whitespace-nowrap">
                    {item.currentBookValue?.toLocaleString()} ₮
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 hover:bg-gray-100 rounded-md text-gray-400 transition-colors">
                          <MoreHorizontal size={20} />
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end" className="w-[140px]">
                        <DropdownMenuItem
                          onClick={() => {
                            const newName = prompt(
                              "Шинэ нэрийг оруулна уу:",
                              item.assetTag,
                            );
                            if (newName && onUpdate) {
                              onUpdate(item.id!, { assetTag: newName });
                            }
                          }}
                        >
                          Засах
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() =>
                            console.log("duplicate", item.assetTag)
                          }
                        >
                          Хувилах
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => onDelete(item.id)}
                        >
                          Устгах
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center pt-2 mt-auto">
          <span className="text-[14px] font-medium text-gray-500">
            {filteredAssets.length}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg text-[14px] font-semibold transition-all ${page === 1
                  ? "text-gray-300 cursor-not-allowed opacity-50"
                  : "text-gray-900 hover:bg-gray-50 active:scale-95"
                }`}
            >
              <ChevronLeft size={18} />
              Өмнөх
            </button>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
              className={`flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg text-[14px] font-bold transition-all ${page === totalPages || totalPages === 0
                  ? "text-gray-300 cursor-not-allowed opacity-50"
                  : "text-gray-900 hover:bg-gray-50 active:scale-95"
                }`}
            >
              Дараах
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
