"use client";

import { useMemo, useState } from "react";
import { Plus, Loader2, QrCode, AlertCircle } from "lucide-react";
import { gql, useMutation, useQuery } from "@apollo/client";

import { useEmployee } from "@/app/_providers/user-provider";
import CreateModal from "./_components/CreateModal";

import Lottie from "lottie-react";
import loaderAnimation from "../../../libs/lottie/animation.json";
import { useGetCensusTasksQuery } from "@/gql/graphql";

/** * GQL Definitions */
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

interface CensusEvent {
  id: string;
  name: string;
  scope: string;
  scopeFilter?: string | null;
  startedAt: string;
  closedAt?: string | null;
  createdBy: string;
}

interface GetCensusEventsResponse {
  getCensusEvents: CensusEvent[];
}

export default function CensusPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { employee } = useEmployee();

  const {
    data: eventData,
    loading: eventsLoading,
    error: eventError,
    refetch,
  } = useQuery<GetCensusEventsResponse>(GET_CENSUS_EVENTS, {
    fetchPolicy: "network-only",
  });
  console.log("eventData", eventData);

  const { data: tasksData, loading: tasksLoading } = useGetCensusTasksQuery();

  const [createEvent, { loading: createLoading, error: createError }] =
    useMutation(CREATE_CENSUS_EVENT);

  const censusView = useMemo(() => {
    const events = eventData?.getCensusEvents || [];
    if (events.length === 0) return null;
    console.log("events", events);

    const lastCensus = events[events.length - 1];
    const allTasks = tasksData?.getCensusTasks || [];
    const censusTasks = allTasks.filter((t) => t.censusId === lastCensus.id);
    const pendingTasks = censusTasks.filter(
      (t) => t.verifiedAt === null || t.verifiedAt === undefined,
    );

    const totalCount = censusTasks.length;
    const pendingCount = pendingTasks.length;
    const confirmedCount = totalCount - pendingCount;
    const progressPercent =
      totalCount > 0 ? Math.round((confirmedCount / totalCount) * 100) : 0;

    return {
      event: lastCensus,
      stats: {
        total: totalCount,
        confirmed: confirmedCount,
        pending: pendingCount,
        progress: progressPercent,
      },
    };
  }, [eventData, tasksData]);
  console.log("censusView", censusView);

  const handleCreate = async (formData: any) => {
    try {
      const input = {
        name: formData.name,
        scope: formData.scope || "company",
        scopeFilter: formData.location || undefined,
        createdBy: employee?.id || "anonymous",
        startedAt: new Date().toISOString(),
      };
      const { data } = await createEvent({ variables: { input } });
      if (data?.createCensusEvent?.toUpperCase() === "SUCCESS") {
        await refetch();
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const isLoading = eventsLoading || tasksLoading;
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        {/* Controlled size container */}
        <div className="w-32 h-32 md:w-48 md:h-48">
          <Lottie
            animationData={loaderAnimation}
            loop
            autoplay
            onError={(error) => console.error("Lottie Error:", error)}
          />
        </div>
      </div>
    );
  }
  if (
    (censusView?.event.closedAt as unknown as string) < new Date().toISOString()
  ) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="bg-yellow-50 p- rounded-2xl border border-yellow-100 flex items-center gap-4">
          <AlertCircle className="w-6 h-6 text-yellow-400" />
          <p className="text-yellow-700 font-medium">
            Сүүлийн тооллого хаагдсан байна.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white p-2 font-sans text-[#2D3748]">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">Тооллого</h1>
          <p className="text-gray-400 text-sm">
            Хөрөнгийн баталгаажуулалт, аудитын мөчлөгийг удирдах
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#4C6EF5] hover:bg-[#3b5bdb] text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
        >
          {createLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Plus size={16} />
          )}
          Тооллого үүсгэх
        </button>
      </header>

      {/* Main Card */}
      <div className="  flex flex-col mb-6">
        {isLoading ? (
          <div className="p-12 text-center text-gray-400">Ачаалж байна...</div>
        ) : censusView ? (
          <div className="flex flex-col  gap-6">
            {/* Top Stats Row */}
            <div className="flex border border-gray-200 rounded- flex-wrap md:flex-nowrap divide-x rounded-2xl divide-gray-50 border-b">
              <div className="flex-1 p-6 min-w-62.5 flex items-center justify-center">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-sm">
                    {censusView.event.name}
                  </span>
                  <span className="bg-[#E6FCF5] text-[#20C997] text-[10px] px-2 py-0.5 rounded-md font-bold">
                    Идэвхтэй
                  </span>
                </div>
              </div>

              <StatDisplay
                value={censusView.stats.total}
                label="Нийт хөрөнгө"
                color="text-[#4C6EF5]"
              />
              <StatDisplay
                value={censusView.stats.confirmed}
                label="Баталгаажсан"
                color="text-[#20C997]"
              />
              <StatDisplay
                value={censusView.stats.pending}
                label="Хүлээгдэж буй"
                color="text-[#FAB005]"
              />
            </div>

            {/* Progress Section */}
            <div className=" p-4.25 rounded-lg border ">
              <div className="flex justify-between items-end mb-2">
                <span className="text-[11px] text-gray-400 font-medium">
                  {censusView.stats.confirmed}/{censusView.stats.total}{" "}
                  баталгаажсан
                </span>
                <span className="text-[11px] text-gray-400 font-medium">
                  {censusView.stats.progress}%
                </span>
              </div>

              {/* The Blue Progress Bar */}
              <div className="w-full bg-[#E9ECEF] h-[7px] rounded-full overflow-hidden mb-4">
                <div
                  className="bg-[#4C6EF5] h-full rounded-full transition-all duration-700"
                  style={{ width: `${censusView.stats.progress}%` }}
                />
              </div>

              {/* Bottom Meta */}
              <div className="flex flex-wrap gap-8 text-[11px] text-gray-400">
                <p>
                  Эцсийн хугацаа:{" "}
                  <span className="text-gray-600 ml-1">2026.03.15</span>
                </p>
                <p>
                  Хүлээгдэж буй:{" "}
                  <span className="text-gray-600 ml-1 font-semibold">
                    {censusView.stats.pending}
                  </span>
                </p>

                <p>
                  Үүсгэсэн:{" "}
                  <span className="text-gray-600 ml-1">
                    {censusView.event.createdBy || "Бат-Эрдэнэ А."}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center text-gray-300">
            Тооллого олдсонгүй.
          </div>
        )}
      </div>

      {/* QR Footer */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 border border-gray-100 hover:bg-gray-50 px-4 py-2 rounded-[6px] text-[11px] font-bold text-gray-700 shadow-sm transition-all">
          <QrCode size={14} />
          QR УНШУУЛАХ
        </button>
      </div>

      {isModalOpen && (
        <CreateModal
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreate}
          loading={createLoading}
        />
      )}
    </div>
  );
}

function StatDisplay({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color: string;
}) {
  return (
    <div className="flex-1 p-6 flex flex-col items-center justify-center">
      <div className="flex items-baseline gap-2">
        <span className={`text-4xl font-bold tracking-tight ${color}`}>
          {value}
        </span>
        <span className="text-gray-700 text-sm font-medium">{label}</span>
      </div>
    </div>
  );
}
