"use client";

import { useMemo, useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { gql, useMutation, useQuery } from "@apollo/client";
import StatCard from "./_components/Statcard";

import CreateModal from "./_components/CreateModal";
import ProjectCard from "./_components/ProjectCard";
import { useEmployee } from "@/app/_providers/user-provider";

const GET_CENSUS_EVENTS = gql`
  query GetCensusEvents {
    getCensusEvents {
      id
      name
      scope
      scopeFilter
      startedAt
      closedAt
      createdBy
    }
  }
`;

const CREATE_CENSUS_EVENT = gql`
  mutation CreateCensusEvent($input: CreateCensusEventInput!) {
    createCensusEvent(input: $input)
  }
`;

type CensusEventItem = {
  id: string;
  name: string;
  scope: string;
  scopeFilter?: string | null;
  startedAt: string;
  closedAt?: string | null;
  createdBy: string;
};

type GetCensusEventsResponse = {
  getCensusEvents: CensusEventItem[];
};

type CreateCensusEventResponse = {
  createCensusEvent: string;
};

type CreateCensusEventInput = {
  name: string;
  scope: string;
  scopeFilter?: string;
  createdBy: string;
  startedAt?: string;
  closedAt?: string;
};

type CensusProject = {
  id: string | number;
  title: string;
  status: "Идэвхтэй" | "Дууссан";
  tag: string;
  progress: number;
  pending: number;
  error: number;
  createdBy: string;
  endDate: string;
};
const { employee } = useEmployee();
export default function Page() {
  const [open, setOpen] = useState(false);

  const {
    data: censusData,
    loading: listLoading,
    error: listError,
    refetch,
  } = useQuery<GetCensusEventsResponse>(GET_CENSUS_EVENTS, {
    fetchPolicy: "network-only",
  });

  const [createCensusEvent, { loading: createLoading, error: createError }] =
    useMutation<CreateCensusEventResponse>(CREATE_CENSUS_EVENT);

  const projects: CensusProject[] = useMemo(() => {
    const events = censusData?.getCensusEvents || [];

    return events.map((event) => ({
      id: event.id,
      title: event.name,
      status: event.closedAt ? "Дууссан" : "Идэвхтэй",
      tag: event.scopeFilter || event.scope || "company",
      progress: 0,
      pending: 0,
      error: 0,
      createdBy: event.createdBy || "-",
      endDate: event.closedAt
        ? new Date(event.closedAt).toLocaleDateString("en-CA")
        : "-",
    }));
  }, [censusData]);

  const stats = useMemo(() => {
    const total = projects.length;
    const active = projects.filter((p) => p.status === "Идэвхтэй").length;
    const done = projects.filter((p) => p.status === "Дууссан").length;

    return [
      {
        label: "Идэвхтэй тооллого",
        value: active,
        subtext: "Одоо явагдаж байгаа",
        type: "active" as const,
      },
      {
        label: "Нийт тооллого",
        value: total,
        subtext: "Бүртгэлтэй census",
        type: "success" as const,
      },
      {
        label: "Дууссан",
        value: done,
        subtext: "Хаагдсан census",
        type: "warning" as const,
      },
      {
        label: "Хүлээгдэж буй",
        value: active,
        subtext: "Үргэлжилж байна",
        type: "pending" as const,
      },
    ];
  }, [projects]);

  const handleCreate = async (formData: {
    name: string;
    scope: string;
    location: string;
    startDate: string;
    closedAt: string;
  }) => {
    try {
      const input: CreateCensusEventInput = {
        name: formData.name,
        scope: formData.scope || "company",
        scopeFilter: formData.location || undefined,
        createdBy: employee?.id as string,
        startedAt: formData.startDate
          ? new Date(formData.startDate).toISOString()
          : new Date().toISOString(),
        closedAt: formData.closedAt
          ? new Date(formData.closedAt).toISOString()
          : undefined,
      };

      console.log("CREATE INPUT:", input);

      const result = await createCensusEvent({
        variables: { input },
      });

      const status = result.data?.createCensusEvent;

      console.log("CREATE RESULT:", status);

      if (status && status.toUpperCase() === "SUCCESS") {
        await refetch();
        setOpen(false);
        return;
      }

      alert(`Тооллого үүсгэж чадсангүй: ${status}`);
    } catch (err) {
      console.error("Create census failed:", err);
      alert("Тооллого үүсгэх үед алдаа гарлаа");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6 flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Тооллого</h1>
          {listError && (
            <p className="text-sm text-red-500">Алдаа: {listError.message}</p>
          )}
          {createError && (
            <p className="text-sm text-red-500">Алдаа: {createError.message}</p>
          )}
        </div>

        <button
          onClick={() => setOpen(true)}
          disabled={createLoading}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:bg-blue-300"
        >
          {createLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Plus size={18} />
          )}
          Тооллого үүсгэх
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        {stats.map((stat, i) => (
          <StatCard key={i} stat={stat} />
        ))}
      </div>

      <div className="space-y-4">
        {listLoading && (
          <div className="rounded-xl border bg-white p-4 text-sm text-gray-500">
            Census list ачаалж байна...
          </div>
        )}

        {!listLoading && projects.length === 0 && (
          <div className="rounded-xl border bg-white p-4 text-sm text-gray-500">
            Census байхгүй байна
          </div>
        )}

        {!listLoading &&
          projects.map((p) => <ProjectCard key={p.id} project={p} />)}
      </div>

      {open && (
        <CreateModal
          onClose={() => setOpen(false)}
          onCreate={handleCreate}
          loading={createLoading}
        />
      )}
    </div>
  );
}
