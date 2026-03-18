"use client";

import { useState } from "react";
import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/libs";
import {
  EmployeeStatus,
  useGetAssetsForAssetPageQuery,
  useUpdateEmployeeMutation,
} from "@/gql/graphql";
import AssetAssignDialog from "./AssetAssignDialog";
import TerminateEmployeeDialog from "./TerminateEmployeeDialog";

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  department: string;
  employeeCode: string;
  branch: string;
  level: string;
  status: EmployeeStatus;
};

export default function EmployeeTable({ data }: { data: Employee[] }) {
  const [page, setPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [terminateEmployee, setTerminateEmployee] = useState<Employee | null>(
    null,
  );
  const [updateEmployee] = useUpdateEmployeeMutation();
  const pageSize = 8;

  const start = (page - 1) * pageSize;
  const paginated = data.slice(start, start + pageSize);
  const totalPages = Math.ceil(data.length / pageSize);

  const { data: assetsData } = useGetAssetsForAssetPageQuery();
  const availableAssets = (assetsData?.getAssets || []).filter(
    (asset) => asset.status === "AVAILABLE",
  );

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-[13px] text-left">
          <thead>
            <tr className="text-gray-500 border-b border-gray-100 bg-white">
              <th className="px-6 py-4 font-medium">Ажилтан</th>
              <th className="px-6 py-4 font-medium">Код</th>
              <th className="px-6 py-4 font-medium">Байршил</th>
              <th className="px-6 py-4 font-medium">Түвшин</th>
              <th className="px-6 py-4 font-medium text-center">Төлөв</th>
              <th className="px-6 py-4 font-medium text-center">Хөрөнгө</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {paginated.map((emp) => (
              <tr
                key={emp.id}
                className="hover:bg-gray-50/50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-[10px] font-bold text-gray-400 border border-gray-100 uppercase">
                      {emp.lastName[0]}
                      {emp.firstName[0]}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-gray-800 font-medium">
                        {emp.lastName[0]}. {emp.firstName}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        {emp.department}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-900 font-medium">
                  {emp.employeeCode}
                </td>
                <td className="px-6 py-4 text-gray-500 font-normal">
                  {emp.branch}
                </td>
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {emp.level}
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex px-3 py-0.5 rounded-md text-[11px] font-medium border ${
                      emp.status === "ACTIVE"
                        ? "bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]"
                        : emp.status === "TERMINATED"
                          ? "bg-red-50 text-red-500 border-red-100"
                          : "bg-[#FFF7ED] text-[#EA580C] border-[#FFEDD5]"
                    }`}
                  >
                    {emp.status === "ACTIVE"
                      ? "Идэвхтэй"
                      : emp.status === "TERMINATED"
                        ? "Чөлөөлөгдсөн"
                        : "Амралт"}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center min-w-[24px] px-1.5 py-0.5 border border-gray-200 rounded-md text-gray-500 text-[11px] bg-white">
                    3
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 hover:bg-gray-100 rounded-md transition-colors text-gray-400">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-44 shadow-lg border-gray-100"
                    >
                      <DropdownMenuItem
                        className="text-[13px] py-2 cursor-pointer focus:bg-blue-50 focus:text-blue-600"
                        onClick={() => setSelectedEmployee(emp)}
                      >
                        Хөрөнгө олгох
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-50" />
                      <DropdownMenuItem
                        onClick={() => setTerminateEmployee(emp)}
                        className="text-[13px] py-2 text-red-500 cursor-pointer focus:bg-red-50 focus:text-red-600"
                      >
                        Ажлаас чөлөөлөх
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-100">
          <p className="text-[12px] text-gray-500 font-medium">
            <span className="text-gray-900">{data.length}</span> ажилтнаас{" "}
            <span className="text-gray-900">
              {Math.min(start + pageSize, data.length)}
            </span>
            -г харуулж байна
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1.5 border border-gray-200 rounded-md text-[12px] text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Өмнөх
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1.5 border border-gray-900 rounded-md text-[12px] text-gray-900 font-medium hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
            >
              Дараах <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {selectedEmployee && (
        <AssetAssignDialog
          key={selectedEmployee.id}
          employee={selectedEmployee}
          availableAssets={availableAssets}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
      {terminateEmployee && (
        <TerminateEmployeeDialog
          employee={terminateEmployee}
          onClose={() => setTerminateEmployee(null)}
          onConfirm={async (id, date) => {
            try {
              await updateEmployee({
                variables: {
                  updateEmployeeId: id,
                  input: {
                    terminationDate: date,
                    status: EmployeeStatus.Terminated,
                  },
                },
              });
              setTerminateEmployee(null);
            } catch (err) {
              console.error(err);
            }
          }}
        />
      )}
    </div>
  );
}
