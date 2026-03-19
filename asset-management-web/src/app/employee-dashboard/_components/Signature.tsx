"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  useGetPendingAssignmentsQuery,
  useUpdateAssignmentMutation,
} from "@/gql/graphql";
import { Inbox, CheckCircle2 } from "lucide-react";
import { useEmployee } from "@/app/_providers/user-provider";

interface SignaturePadProps {
  onClose: () => void;
  onConfirm: (signatureData: string) => void;
  canReuse?: boolean;
  onReuseSignature?: () => void;
  recentSignatureUrl?: string;
}

const SignaturePad = dynamic<SignaturePadProps>(
  () => import("./SignaturePad"),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-[2rem] shadow-xl flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Ачаалж байна...
          </p>
        </div>
      </div>
    ),
  },
);

interface GarTabProps {
  onSuccess?: () => void;
}

export default function GarTab({ onSuccess }: GarTabProps) {
  // 1. Move Hook inside component to follow React Rules
  const { employee } = useEmployee();
  const effectiveToken = employee?.id;

  // State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);

  // Data Fetching
  const { data, loading, refetch } = useGetPendingAssignmentsQuery({
    variables: { token: effectiveToken ?? "" },
    skip: !effectiveToken,
  });
  console.log("data", data);

  const [updateAssignment, { loading: isUpdating }] =
    useUpdateAssignmentMutation();

  // Memoized derived data
  const assignments = data?.getPendingAssignments ?? [];
  const history = assignments[0];
  const canReuse =
    !!history?.recentSignatureUrl && !!history?.recentSignatureKey;

  // Handlers
  const handleToggleAsset = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === assignments.length && assignments.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(assignments.map((a) => a.id));
    }
  };

  const handleFinalizeBatch = async (signatureData: string) => {
    if (!effectiveToken || isUpdating || selectedIds.length === 0) return;

    try {
      // Execute all mutations
      await Promise.all(
        selectedIds.map((id) =>
          updateAssignment({
            variables: {
              updateAssignmentId: id,
              input: { signatureR2Key: signatureData },
            },
          }),
        ),
      );

      // Ensure data is fresh before showing success screen
      await refetch();

      setIsSuccess(true);
      setShowSignatureModal(false);
      setSelectedIds([]);

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Batch update error:", err);
      alert("Баталгаажуулалт амжилтгүй боллоо. Дахин оролдоно уу.");
    }
  };

  // --- Views ---

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
          Хөрөнгийг синк хийж байна...
        </p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white border border-blue-100 rounded-[2.5rem] animate-in zoom-in-95">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-100">
          <CheckCircle2 className="text-white" size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          Амжилттай баталгаажлаа
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Хөрөнгүүд таны бүртгэлд амжилттай бүртгэгдлээ.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-6 text-blue-600 font-bold text-xs uppercase tracking-widest"
        >
          Дуусгах
        </button>
      </div>
    );
  }

  if (assignments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-gray-200 rounded-[2.5rem]">
        <Inbox className="text-gray-300 mb-4" size={40} />
        <h3 className="text-sm font-bold text-gray-900">
          Хүлээгдэж буй хөрөнгө алга
        </h3>
        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">
          Бүх хөрөнгө баталгаажсан байна
        </p>
      </div>
    );
  }

  return (
    <div className="relative pb-32">
      <div className="flex justify-between items-center mb-6">
        <div />
        <button
          onClick={handleSelectAll}
          className="flex items-center space-x-2 text-[13px] font-medium text-gray-900 hover:opacity-70 transition-opacity group"
        >
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              selectedIds.length === assignments.length &&
              assignments.length > 0
                ? "bg-blue-600 border-blue-600 shadow-sm"
                : "border-[#888888] bg-white group-hover:border-gray-300"
            }`}
          >
            {selectedIds.length === assignments.length &&
              assignments.length > 0 && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2.5 6L5 8.5L9.5 3.5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
          </div>
          <span className="tracking-tight">
            {selectedIds.length === assignments.length
              ? "Сонголтыг цуцлах"
              : "Бүгдийг сонгох"}
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {assignments.map((item) => (
          <div
            key={item.id}
            onClick={() => handleToggleAsset(item.id)}
            className={`relative p-5 rounded-2xl border transition-all cursor-pointer flex items-center space-x-4 ${
              selectedIds.includes(item.id)
                ? "bg-white border-blue-500 ring-2 ring-blue-500/5 shadow-md"
                : "bg-gray-50/50 border-gray-100 hover:border-gray-200"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${selectedIds.includes(item.id) ? "bg-blue-50" : "bg-white"}`}
            >
              📦
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900 text-sm truncate">
                {item.asset?.assetTag}
              </h4>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-tight">
                СН: {item.asset?.serialNumber}
              </p>
            </div>
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${selectedIds.includes(item.id) ? "bg-blue-600 border-blue-600" : "border-gray-200 bg-white"}`}
            >
              {selectedIds.includes(item.id) && (
                <span className="text-white text-[10px]">✓</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end px-0 sm:px-4 z-40 pointer-events-none mt-10">
        <button
          disabled={selectedIds.length === 0 || isUpdating}
          onClick={() => setShowSignatureModal(true)}
          className={`pointer-events-auto w-full sm:w-auto flex items-center justify-center space-x-4 px-10 py-5 rounded-[6px] font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 ${
            selectedIds.length > 0
              ? "bg-[#2F6FED] text-white hover:bg-blue-700"
              : "bg-[#888888] text-white cursor-not-allowed"
          }`}
        >
          {isUpdating ? "Түр хүлээнэ үү..." : "Гарын үсэг зурах"}
        </button>
      </div>

      {showSignatureModal && (
        <SignaturePad
          onClose={() => setShowSignatureModal(false)}
          onConfirm={handleFinalizeBatch}
          canReuse={canReuse}
          recentSignatureUrl={history?.recentSignatureUrl ?? undefined}
          onReuseSignature={() => {
            if (history?.recentSignatureKey) {
              handleFinalizeBatch(history.recentSignatureKey);
            }
          }}
        />
      )}
    </div>
  );
}
