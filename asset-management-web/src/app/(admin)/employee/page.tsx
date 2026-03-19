"use client";

import { useMemo, useState } from "react";
import {
  Search,
  RefreshCw,
  Download,
  ChevronDown,
  FilterX,
} from "lucide-react";
import EmployeeTable from "./_components/EmployeeTable";
import { useGetEmployeesQuery } from "@/gql/graphql";
import { debounce } from "lodash";

import Lottie from "lottie-react";
import loaderAnimation from "../../../libs/lottie/animation.json";

export default function EmployeePage() {
  const { data, loading, error, refetch } = useGetEmployeesQuery();

  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const handleSearch = useMemo(
    () =>
      debounce((val: string) => {
        setSearchTerm(val);
      }, 200),
    [],
  );

  const employees = data?.getEmployees || [];

  const departments = useMemo(() => {
    const depts = employees
      .map((e) => e.department)
      .filter((d): d is string => !!d);
    return Array.from(new Set(depts));
  }, [employees]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-32 h-32 md:w-48 md:h-48  ">
          {/* Controlled size container */}
          <Lottie
            animationData={loaderAnimation}
            loop
            autoplay
            onError={(error) => console.error("Lottie Error:", error)}
          />
        </div>
      </div>
    );

  if (error)
    return (
      <div className="p-8 text-center bg-red-50/50 rounded-xl m-6 border border-red-100">
        <p className="text-red-500 mb-3 text-[14px]">
          Алдаа гарлаа: {error.message}
        </p>
        <button
          className="px-5 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-[13px] font-medium"
          onClick={() => refetch()}
        >
          Дахин ачааллах
        </button>
      </div>
    );

  const filtered = employees.filter((emp) => {
    const fullName =
      `${emp.firstName ?? ""} ${emp.lastName ?? ""}`.toLowerCase();
    const code = emp.employeeCode?.toLowerCase() ?? "";

    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      code.includes(searchTerm.toLowerCase());
    const matchesDept =
      selectedDept === "all" || emp.department === selectedDept;
    const matchesStatus =
      selectedStatus === "all" || emp.status === selectedStatus;

    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <div className="p-8 min-h-screen bg-[#F9FAFB]">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-[#020617] tracking-tight">
            Ажилтан
          </h1>
          <p className="text-[13px] text-gray-500 mt-1">
            Ажилчдын бүртгэл, хөрөнгийн хуваарилалтыг удирдах
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
            <RefreshCw className="w-4 h-4 text-gray-400" />
            HR-ээс татах
          </button>
          <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-all shadow-sm">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleSearch(e.target.value);
            }}
            placeholder="Нэр, имэйл эсвэл ажилтны кодоор хайх..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="appearance-none w-40 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] text-gray-600 hover:bg-gray-50 transition-all cursor-pointer outline-none shadow-sm pr-10"
            >
              <option value="all">Бүх хэлтэс</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none w-40 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] text-gray-600 hover:bg-gray-50 transition-all cursor-pointer outline-none shadow-sm pr-10"
            >
              <option value="all">Бүх төлөв</option>
              <option value="ACTIVE">Идэвхтэй</option>
              <option value="TERMINATED">Чөлөөлөгдсөн</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          {(selectedDept !== "all" || selectedStatus !== "all") && (
            <button
              onClick={() => {
                setSelectedDept("all");
                setSelectedStatus("all");
              }}
              className="p-2.5 bg-white border border-gray-200 text-gray-400 hover:text-red-500 rounded-xl transition-all shadow-sm"
            >
              <FilterX className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6 text-gray-300" />
          </div>
          <p className="text-gray-500 text-[14px]">Илэрц олдсонгүй</p>
          <button
            onClick={() => {
              setSearch("");
              setSearchTerm("");
            }}
            className="text-blue-600 text-[13px] font-medium mt-2 hover:underline"
          >
            Хайлтыг цэвэрлэх
          </button>
        </div>
      ) : (
        <EmployeeTable data={filtered} />
      )}
    </div>
  );
}
