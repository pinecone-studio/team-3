"use client";

import { useMemo, useState } from "react";
import MaintenanceTable from "./components/MaintenanceTable";

type TicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CANCELLED";

interface MaintenanceTicket {
  id: string;
  reporterId: string;
  assetId: string;
  description: string;
  status: TicketStatus;
  createdAt?: string | null;
}
import {
  useGetEmployeesQuery,
  useGetAssetsQuery,
  useGetAdminMaintenanceTicketsQuery,
} from "@/gql/graphql";

export default function MaintenancePage() {
  const { data: ticketsData, loading: tLoading } =
    useGetAdminMaintenanceTicketsQuery();

  const { data: employeesData } = useGetEmployeesQuery();
  const { data: assetsData } = useGetAssetsQuery();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const tickets = (ticketsData?.getMaintenanceTickets ||
    []) as MaintenanceTicket[];
  const employees = employeesData?.getEmployees || [];
  const assets = (assetsData?.getAssets || []) as any[];

  const filtered = useMemo(() => {
    return tickets.filter((ticket) => {
      if (!ticket) return false;
      const matchesSearch = ticket.description
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        selectedStatus === "all" || ticket.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [tickets, searchTerm, selectedStatus]);

  if (tLoading)
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-3 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );

  return (
    <div className=" min-h-screen ">
      <MaintenanceTable
        data={filtered}
        employees={employees as any}
        assets={assets}
      />
    </div>
  );
}
