"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  useGetPendingAssignmentsQuery,
  useUpdateAssignmentMutation,
} from "@/gql/graphql";
import { Inbox, CheckCircle2, RotateCcw, PenLine } from "lucide-react";

// 1. Define the Interface for the Signature Pad Props
interface SignaturePadProps {
  onClose: () => void;
  onConfirm: (signatureData: string) => void;
  canReuse?: boolean;
  onReuseSignature?: () => void;
  recentSignatureUrl?: string;
}

// 2. Dynamic Import to prevent SSR Canvas issues
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
  // Identity Logic (Consistent with your AssetsPage)
  const effectiveToken =
    typeof window !== "undefined" ? localStorage.getItem("employeeId") : null;

  // State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);

  // Data Fetching
  const { data, loading, error, refetch } = useGetPendingAssignmentsQuery({
    variables: { token: effectiveToken ?? "" },
    skip: !effectiveToken,
  });

  const [updateAssignment, { loading: isUpdating }] =
    useUpdateAssignmentMutation();

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

      setIsSuccess(true);
      setShowSignatureModal(false);
      setSelectedIds([]);
      refetch();
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Batch update error:", err);
      alert("Баталгаажуулалт амжилтгүй боллоо. Дахин оролдоно уу.");
    }
  };

  // --- Conditional Views ---

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
      {/* Selection Header */}
      <div className="flex justify-between items-center mb-6">
        <div></div>

        <button
          onClick={handleSelectAll}
          className="flex items-center space-x-2 text-[13px] font-medium text-gray-900 hover:opacity-70 transition-opacity group"
        >
          {/* Circular Checkbox Icon */}
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
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
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

          {/* Text label */}
          <span className="tracking-tight">
            {selectedIds.length === assignments.length
              ? "Сонголтыг цуцлах"
              : "Бүгдийг сонгох"}
          </span>
        </button>
      </div>

      {/* Asset Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

      {/* Floating Confirm Button */}
      <div className="flex justify-end px-4 z-40 pointer-events-none mt-10">
        <button
          disabled={selectedIds.length === 0 || isUpdating}
          onClick={() => setShowSignatureModal(true)}
          className={`pointer-events-auto flex items-center space-x-4 px-10 py-5 rounded-[6px] font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95 ${
            selectedIds.length > 0
              ? "bg-[#2F6FED] text-white hover:bg-blue-700"
              : "bg-[#888888] text-white cursor-not-allowed"
          }`}
        >
          <span>
            {isUpdating ? (
              "Түр хүлээнэ үү..."
            ) : (
              <div className="flex gap-2 rounded-[1px]">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.1507 3.48417L10.4707 1.80417C10.3216 1.65451 10.1444 1.53587 9.94915 1.45509C9.75395 1.37431 9.54468 1.33298 9.33341 1.3335H4.00008C3.64646 1.3335 3.30732 1.47398 3.05727 1.72403C2.80722 1.97407 2.66675 2.31321 2.66675 2.66683V13.3335C2.66675 13.6871 2.80722 14.0263 3.05727 14.2763C3.30732 14.5264 3.64646 14.6668 4.00008 14.6668H12.0001C12.3537 14.6668 12.6928 14.5264 12.9429 14.2763C13.1929 14.0263 13.3334 13.6871 13.3334 13.3335V13.0995"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.2519 8.41743C14.5175 8.15186 14.6667 7.79167 14.6667 7.4161C14.6667 7.04053 14.5175 6.68034 14.2519 6.41477C13.9863 6.1492 13.6261 6 13.2506 6C12.875 6 12.5148 6.1492 12.2492 6.41477L9.5759 9.08943C9.4174 9.24785 9.30138 9.44366 9.23857 9.65877L8.68057 11.5721C8.66384 11.6295 8.66283 11.6903 8.67767 11.7482C8.6925 11.806 8.72261 11.8589 8.76487 11.9011C8.80712 11.9434 8.85996 11.9735 8.91784 11.9883C8.97573 12.0032 9.03654 12.0022 9.0939 11.9854L11.0072 11.4274C11.2223 11.3646 11.4182 11.2486 11.5766 11.0901L14.2519 8.41743Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.33325 12H5.99992"
                    stroke="white"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Гарын үсэг зурах
              </div>
            )}
          </span>
        </button>
      </div>

      {/* Signature Modal Logic */}
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
