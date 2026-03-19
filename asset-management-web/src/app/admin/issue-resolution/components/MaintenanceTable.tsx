"use client";

import { useState, useMemo } from "react";
import { Edit2, ChevronLeft, ChevronRight, Search } from "lucide-react";
import EditMaintenanceTicketModal from "./EditMaintenanceTicketModal";
import { useUpdateMaintenanceTicketMutation } from "@/gql/graphql";

export type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CANCELLED";

export interface MaintenanceTicket {
  id: string;
  reporterId: string;
  assetId: string;
  description: string;
  status: TicketStatus;
  createdAt?: string | null;
  resolvedAt?: string | null;
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

  // ✅ FILTER STATES
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [locationFilter, setLocationFilter] = useState<string>("ALL");

  const [updateTicket] = useUpdateMaintenanceTicketMutation();

  const pageSize = 8;

  const getReporter = (id: string) => employees.find((e) => e.id === id);

  const getAsset = (id: string) => assets.find((a) => a.id === id);

  // ✅ FILTER LOGIC
  const filteredData = useMemo(() => {
    return data.filter((ticket) => {
      const reporter = getReporter(ticket.reporterId);
      const asset = getAsset(ticket.assetId);

      const fullName = reporter
        ? `${reporter.firstName} ${reporter.lastName}`.toLowerCase()
        : "";

      const matchesSearch =
        search === "" ||
        fullName.includes(search.toLowerCase()) ||
        ticket.description.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || ticket.status === statusFilter;

      const matchesLocation =
        locationFilter === "ALL" ||
        (asset?.location || "")
          .toLowerCase()
          .includes(locationFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesLocation;
    });
  }, [data, search, statusFilter, locationFilter]);

  // reset pagination when filter changes
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
      });

      setOpen(false);
      setSelectedTicket(null);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const getStatusBadge = (status: TicketStatus) => {
    const styles: Record<TicketStatus, string> = {
      OPEN: "bg-orange-50 text-orange-400",
      IN_PROGRESS: "bg-blue-50 text-blue-400",
      RESOLVED: "bg-emerald-50 text-emerald-400",
      CANCELLED: "bg-gray-50 text-gray-400",
    };

    const labels: Record<TicketStatus, string> = {
      OPEN: "Хүлээгдэж буй",
      IN_PROGRESS: "Шийдвэрлэж буй",
      RESOLVED: "Шийдвэрлэгдсэн",
      CANCELLED: "Цуцлагдсан",
    };

    return (
      <span
        className={`px-3 py-1 rounded-lg text-[12px] font-medium ${styles[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Асуудал шийдвэрлэх</h1>
        <p className="text-gray-500 text-sm">
          Төхөөрөмжтэй холбоотой асуудал шийдвэрлэх
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            type="text"
            placeholder="Хайх..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm"
          />
        </div>

        <select
          value={locationFilter}
          onChange={(e) => {
            setLocationFilter(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm"
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
          className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm"
        >
          <option value="ALL">Бүх төлөв</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="RESOLVED">Resolved</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-500 text-sm">
              <th className="px-6 py-4">Үүсгэсэн</th>
              <th className="px-6 py-4">Байршил</th>
              <th className="px-6 py-4">Асуудал</th>
              <th className="px-6 py-4">Огноо</th>
              <th className="px-6 py-4">Төлөв</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((ticket) => {
              const reporter = getReporter(ticket.reporterId);
              const asset = getAsset(ticket.assetId);

              const initials = reporter
                ? `${reporter.lastName[0]}${reporter.firstName[0]}`
                : "??";

              return (
                <tr key={ticket.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex gap-3 items-center">
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold">
                        {initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {reporter
                            ? `${reporter.lastName[0]}. ${reporter.firstName}`
                            : "Unknown"}
                        </p>
                        <p className="text-xs text-gray-400">
                          {reporter?.department}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm">
                    {asset?.location || "N/A"}
                  </td>

                  <td className="px-6 py-4 text-sm">{ticket.description}</td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {ticket.createdAt
                      ? new Date(ticket.createdAt).toISOString().split("T")[0]
                      : "-"}
                  </td>

                  <td className="px-6 py-4">{getStatusBadge(ticket.status)}</td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedTicket(ticket);
                        setOpen(true);
                      }}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-between px-6 py-4 border-t">
          <p className="text-sm text-gray-400">{filteredData.length} нийт</p>

          <div className="flex items-center gap-2">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              <ChevronLeft />
            </button>

            <span>
              {page} / {totalPages}
            </span>

            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
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
