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
import { Button } from "@/libs";

export type Asset = {
  id: string;
  name: string;
  sn: string;
  category: string;
  status: string;
  user: string;
  dept: string;
  location: string;
  price: string;
  initial: string;
};

type Props = {
  assets: Asset[];
};

export default function AssetManagement({ assets }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  const pageSize = 6;

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchSearch =
        asset.name.toLowerCase().includes(search.toLowerCase()) ||
        asset.id.toLowerCase().includes(search.toLowerCase()) ||
        asset.sn.toLowerCase().includes(search.toLowerCase());

      const matchCategory = category === "all" || asset.category === category;
      const matchStatus = status === "all" || asset.status === status;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [assets, search, category, status]);

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
            <Button className="bg-[#0251CB] hover:bg-[#0241a1] h-[40px] px-5 text-white text-[14px] font-semibold rounded-lg flex items-center gap-2 transition-colors">
              <Plus size={18} />
              Хөрөнгө бүртгэх
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
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">Бүх ангилал</option>
            <option value="MacBook">MacBook</option>
            <option value="Зөөврийн">Зөөврийн</option>
            <option value="Монитор">Монитор</option>
          </select>

          <select
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] bg-white min-w-[160px] text-gray-600 outline-none cursor-pointer"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">Бүх төлөв</option>
            <option value="Хуваарилсан">Хуваарилсан</option>
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
              <tr className="text-gray-800 text-[13px] font-semibold leading-[125%] uppercase tracking-wider">
                <th className="px-6 py-4 w-12"></th>
                <th className="px-4 py-4">Код</th>
                <th className="px-4 py-4">Нэр</th>
                <th className="px-4 py-4 text-center">Ангилал</th>
                <th className="px-4 py-4">Төлөв</th>
                <th className="px-4 py-4">Хуваарилсан</th>
                <th className="px-4 py-4">Байршил</th>
                <th className="px-4 py-4 text-right whitespace-nowrap">
                  Үлдэгдэл өртөг
                </th>
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
                    {item.id}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-semibold text-[14px] text-gray-900 leading-tight">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-gray-400 font-normal mt-0.5 uppercase tracking-tighter">
                      SN: {item.sn}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className="px-2.5 py-1 border border-gray-200 rounded-md text-[12px] font-medium text-gray-600 bg-white shadow-sm">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-gray-600 font-medium">
                    {item.status}
                  </td>
                  <td className="px-4 py-3.5">
                    {item.user !== "-" ? (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 border border-gray-200 shrink-0">
                          {item.initial}
                        </div>
                        <div className="min-w-0">
                          <div className="text-gray-900 font-semibold leading-none truncate">
                            {item.user}
                          </div>
                          <div className="text-[11px] text-gray-400 font-medium mt-1 truncate">
                            {item.dept}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-300 ml-3">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-gray-500 font-medium">
                    {item.location}
                  </td>
                  <td className="px-4 py-3.5 text-right font-bold text-gray-900">
                    {item.price}
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <button className="p-1 hover:bg-gray-100 rounded-md text-gray-400 transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center pt-2 mt-auto">
          <span className="text-[14px] font-medium text-gray-500">
            {page} / {totalPages || 1}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className={`flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg text-[14px] font-semibold transition-all ${
                page === 1
                  ? "text-gray-300 cursor-not-allowed opacity-50"
                  : "text-gray-900 hover:bg-gray-50 active:scale-95"
              }`}
            >
              <ChevronLeft size={18} />
              Өмнөх
            </button>

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages || totalPages === 0}
              className={`flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg text-[14px] font-bold transition-all ${
                page === totalPages || totalPages === 0
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
