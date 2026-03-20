
"use client";

import { useState, useMemo } from "react";
import { Edit2, ChevronLeft, ChevronRight, Search } from "lucide-react";
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
      OPEN: "bg-[#FFF7ED] text-[#FB923C]",
      IN_PROGRESS: "bg-[#EFF6FF] text-[#60A5FA]",
      RESOLVED: "bg-[#F0FDF4] text-[#4ADE80]", 
      CANCELLED: "bg-[#F9FAFB] text-[#9CA3AF]", 
    };

    const labels: Record<TicketStatus, string> = {
      OPEN: "Хүлээгдэж буй",
      IN_PROGRESS: "Шийдвэрлэж буй",
      RESOLVED: "Шийдвэрлэгдсэн",
      CANCELLED: "Цуцлагдсан",
    };

    return (
      <span
        className={`px-4 py-1.5 rounded-full text-[13px] font-medium ${styles[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="p-2 bg-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          Асуудал шийдвэрлэх
        </h1>
        <p className="text-gray-400 text-[15px]">
          Төхөөрөмжтэй холбоотой асуудал шийдвэрлэх
        </p>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            type="text"
            placeholder="Нэр, имэйл эсвэл ажилтны кодоор хайх..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-[15px] focus:outline-none focus:ring-1 focus:ring-gray-200"
          />
        </div>

        <select
          value={locationFilter}
          onChange={(e) => {
            setLocationFilter(e.target.value);
            setPage(1);
          }}
          className="px-6 py-3 bg-white border border-gray-100 rounded-xl text-[15px] text-gray-500 min-w-[140px] appearance-none"
        >
          <option value="ALL">Байршил</option>
          <option value="office">Office</option>
          <option value="warehouse">Warehouse</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="px-6 py-3 bg-white border border-gray-100 rounded-xl text-[15px] text-gray-500 min-w-[140px] appearance-none"
        >
          <option value="ALL">Бүх төлөв</option>
          <option value="OPEN">Хүлээгдэж буй</option>
          <option value="RESOLVED">Шийдвэрлэгдсэн</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-[#F8FAFC] border-[#E2E8F0]">
              <th className="px-8 py-5 text-[14px] font-medium text-gray-900">
                Үүсгэсэн
              </th>
              <th className="px-8 py-5 text-[14px] font-medium text-gray-900">
                Байршил
              </th>
              <th className="px-8 py-5 text-[14px] font-medium text-gray-900">
                Асуудлын төрөл
              </th>
              <th className="px-8 py-5 text-[14px] font-medium text-gray-900">
                Мэдэгдсэн огноо
              </th>
              <th className="px-8 py-5 text-[14px] font-medium text-gray-900">
                Төлөв
              </th>
              <th className="px-8 py-5"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {paginated.map((ticket) => {
              const reporter = employees.find(
                (e) => e.id === ticket.reporterId,
              );
              return (
                <tr
                  key={ticket.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-8 py-5">
                    <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-[12px] font-bold text-gray-500 uppercase">
                        {reporter
                          ? `${reporter.firstName[0]}${reporter.lastName[0]}`
                          : "??"}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[14px] font-medium text-gray-900">
                          {reporter
                            ? `${reporter.firstName[0]}. ${reporter.lastName}`
                            : "Unknown"}
                        </span>
                        <span className="text-[13px] text-gray-400">
                          {ticket.asset?.department?.name || "Хэлтэсгүй"}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-5 text-[14px] text-gray-600">
                    {ticket.asset?.locationId || "N/A"}
                  </td>

                  <td className="px-8 py-5 text-[14px] text-gray-600">
                    {ticket.description}
                  </td>

                  <td className="px-8 py-5 text-[14px] text-gray-400">
                    {ticket.createdAt
                      ? ticket.createdAt.split("T")[0].replace(/-/g, "/")
                      : "-"}
                  </td>

                  <td className="px-8 py-5">{getStatusBadge(ticket.status)}</td>

                  <td className="px-8 py-5 text-right">
                    <button
                      onClick={() => {
                        setSelectedTicket(ticket);
                        setOpen(true);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-900"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        
        <div className="flex justify-between items-center px-8 py-6 border-t border-gray-50">
          <p className="text-[14px] text-gray-400">
            Нийт {filteredData.length}
          </p>

          <div className="flex items-center gap-6">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="p-1 disabled:opacity-30 text-gray-600"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-[14px] text-gray-600 font-medium">
              {page} / {totalPages}
            </span>

            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="p-1 disabled:opacity-30 text-gray-600"
            >
              <ChevronRight className="w-5 h-5" />
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
