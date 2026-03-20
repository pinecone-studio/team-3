"use client";

import { useState, useMemo } from "react";
import {
  Edit2,
  ChevronLeft,
  ChevronRight,
  Search,
  ChevronDown,
  Wrench,
} from "lucide-react";
import EditMaintenanceTicketModal from "./EditMaintenanceTicketModal";
import { useUpdateMaintenanceTicketMutation } from "@/gql/graphql";

export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CANCELLED";

export interface MaintenanceTicket {
  id: string;
  reporterId: string;
  description: string;
  status: TicketStatus;
  severity?: string;
  createdAt?: string | null;
  resolvedAt?: string | null;
  asset?: {
    id: string;
    assetTag: string;
    locationId?: string;
    department?: {
      name: string;
    } | null;
  } | null;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  department: string;
}

export interface Asset {
  id: string;
  assetTag: string;
  location?: string;
  category?: {
    name: string;
  } | null;
}

interface Props {
  data: MaintenanceTicket[];
  employees: Employee[];
  assets: Asset[];
}

export default function MaintenanceTable({
  data = [],
  employees = [],
  assets = [],
}: Props) {
  const [page, setPage] = useState(1);
  const [selectedTicket, setSelectedTicket] =
    useState<MaintenanceTicket | null>(null);
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [locationFilter, setLocationFilter] = useState<string>("ALL");

  const [updateTicket] = useUpdateMaintenanceTicketMutation();

  const pageSize = 8;

  const filteredData = useMemo(() => {
    return data.filter((ticket) => {
      const reporter = employees.find((e) => e.id === ticket.reporterId);
      const fullName = reporter
        ? `${reporter.firstName} ${reporter.lastName}`.toLowerCase()
        : "";

      const matchesSearch =
        search === "" ||
        fullName.includes(search.toLowerCase()) ||
        ticket.asset?.assetTag.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || ticket.status === statusFilter;

      const matchesLocation =
        locationFilter === "ALL" ||
        ticket.asset?.locationId
          ?.toLowerCase()
          .includes(locationFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesLocation;
    });
  }, [data, search, statusFilter, locationFilter, employees]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const start = (page - 1) * pageSize;
  const paginated = filteredData.slice(start, start + pageSize);

  const handleSave = async (form: any) => {
    if (!selectedTicket) return;
    try {
      await updateTicket({
        variables: {
          updateMaintenanceTicketId: selectedTicket.id,
          input: {
            status: form.status,
            resolvedAt: form.resolvedAt,
            description: form.description,
          },
        },
        refetchQueries: ["GetAdminMaintenanceTickets"],
      });
      setOpen(false);
      setSelectedTicket(null);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const getStatusBadge = (status: TicketStatus) => {
    const styles: Record<TicketStatus, string> = {
      OPEN: "bg-[#FFF7ED] text-[#EA580C] border-[#FFEDD5]",
      IN_PROGRESS: "bg-[#EFF6FF] text-[#1D4ED8] border-[#DBEAFE]",
      RESOLVED: "bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]",
      CANCELLED: "bg-gray-50 text-gray-500 border-gray-200",
    };

    const labels: Record<TicketStatus, string> = {
      OPEN: "Хүлээгдэж буй",
      IN_PROGRESS: "Шийдвэрлэж буй",
      RESOLVED: "Шийдвэрлэгдсэн",
      CANCELLED: "Цуцлагдсан",
    };

    return (
      <span
        className={`inline-flex px-3 py-0.5 rounded-md text-[11px] font-medium border ${styles[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="p-6 min-h-screen ">
   
      <div className="mb-6">
        <h1 className="text-[24px] font-bold text-[#020617] tracking-tight">
          Асуудал шийдвэрлэх
        </h1>
        <p className="text-[13px] text-gray-500 mt-1">
          Төхөөрөмжтэй холбоотой асуудал шийдвэрлэх, засвар үйлчилгээ
        </p>
      </div>

 
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            type="text"
            placeholder="Нэр, имэйл эсвэл ажилтны кодоор хайх..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
          />
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <select
              value={locationFilter}
              onChange={(e) => {
                setLocationFilter(e.target.value);
                setPage(1);
              }}
              className="appearance-none w-40 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] text-gray-600 hover:bg-gray-50 transition-all cursor-pointer outline-none shadow-sm pr-10"
            >
              <option value="ALL">Байршил</option>
              <option value="office">Office</option>
              <option value="warehouse">Warehouse</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="appearance-none w-40 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] text-gray-600 hover:bg-gray-50 transition-all cursor-pointer outline-none shadow-sm pr-10"
            >
              <option value="ALL">Бүх төлөв</option>
              <option value="OPEN">Хүлээгдэж буй</option>
              <option value="RESOLVED">Шийдвэрлэгдсэн</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

   
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-[13px] text-left">
          <thead>
            <tr className="text-gray-500 border-b border-gray-100 bg-white">
              <th className="px-6 py-4 font-medium">Үүсгэсэн</th>
              <th className="px-6 py-4 font-medium">Байршил</th>
              <th className="px-6 py-4 font-medium">Асуудлын төрөл</th>
              <th className="px-6 py-4 font-medium">Огноо</th>
              <th className="px-6 py-4 font-medium text-center">Төлөв</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {paginated.map((ticket) => {
              const reporter = employees.find(
                (e) => e.id === ticket.reporterId,
              );
              return (
                <tr
                  key={ticket.id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400 uppercase">
                        {reporter
                          ? `${reporter.lastName[0]}${reporter.firstName[0]}`
                          : "??"}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-800 font-medium">
                          {reporter
                            ? `${reporter.lastName[0]}. ${reporter.firstName}`
                            : "Unknown"}
                        </span>
                        <span className="text-[11px] text-gray-400">
                          {ticket.asset?.department?.name || "Хэлтэсгүй"}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {ticket.asset?.locationId || "Байршилгүй"}
                  </td>

                  <td className="px-6 py-4 text-gray-900 font-medium max-w-[200px] truncate">
                    {ticket.description}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {ticket.createdAt
                      ? ticket.createdAt.split("T")[0].replace(/-/g, "/")
                      : "-"}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {getStatusBadge(ticket.status)}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedTicket(ticket);
                        setOpen(true);
                      }}
                      className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-400 hover:text-gray-900"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

  
        <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-100">
          <p className="text-[12px] text-gray-500 font-medium">
            Нийт <span className="text-gray-900">{filteredData.length}</span>{" "}
            асуудал
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1.5 border border-gray-200 rounded-md text-[12px] text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Өмнөх
            </button>
            <div className="px-3 text-[12px] text-gray-500 font-medium">
              {page} / {totalPages}
            </div>
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

      <EditMaintenanceTicketModal
        open={open}
        ticket={selectedTicket}
        onClose={() => {
          setOpen(false);
          setSelectedTicket(null);
        }}
        onSave={handleSave}
      />
    </div>
  );
}
