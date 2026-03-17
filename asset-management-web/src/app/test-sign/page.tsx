"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import {
  useGetPendingAssignmentsQuery,
  useUpdateAssignmentMutation,
} from "@/gql/graphql";

const SignaturePad = dynamic(() => import("./_components/SignaturePad"), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full bg-white/50 backdrop-blur-sm border-2 border-dashed border-gray-200 rounded-[2rem] animate-pulse flex items-center justify-center">
      <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
        Initializing Secure Pad...
      </span>
    </div>
  ),
});

function AcknowledgeContent() {
  const searchParams = useSearchParams();

  // State to manage identity
  const [effectiveToken, setEffectiveToken] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [useRecent, setUseRecent] = useState(false);

  // Determine identity on mount (Browser only)
  useEffect(() => {
    const urlToken = searchParams.get("token");
    const localToken = localStorage.getItem("employeeId");

    // URL takes precedence, otherwise fallback to localStorage
    const identity = urlToken || localToken;

    setEffectiveToken(identity);
    setIsInitialized(true);
  }, [searchParams]);

  // Query executes only once we know who the user is
  const { data, loading, error } = useGetPendingAssignmentsQuery({
    variables: { token: effectiveToken ?? "" },
    skip: !isInitialized || !effectiveToken,
  });

  const [updateAssignment, { loading: isUpdating }] =
    useUpdateAssignmentMutation();

  const assignments = data?.getPendingAssignments ?? [];
  const history = assignments[0];
  const canReuse =
    !!history?.recentSignatureUrl && !!history?.recentSignatureKey;

  const handleToggleAsset = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleFinalizeBatch = async (signature: string) => {
    if (!effectiveToken || isUpdating || selectedIds.length === 0) return;

    try {
      await Promise.all(
        selectedIds.map((id) =>
          updateAssignment({
            variables: {
              updateAssignmentId: id,
              input: { signatureR2Key: signature },
            },
          }),
        ),
      );
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Batch verification failed. Please try again.");
    }
  };

  // 1. Initial State: Loading/Resolving Identity
  if (!isInitialized || (loading && !data)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-4">
        <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
          Synchronizing
        </p>
      </div>
    );
  }

  // 2. Error State: No token found in URL or LocalStorage
  if (!effectiveToken) {
    return (
      <div className="max-w-md mx-auto mt-20 p-10 text-center bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl">
        <div className="bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
          🆔
        </div>
        <h2 className="text-xl font-black text-gray-900">Identity Required</h2>
        <p className="text-gray-500 text-sm mt-3">
          Please use the link provided in your email to access your assignments.
        </p>
      </div>
    );
  }

  // 3. Error State: API Error or No assignments found
  if (error || (assignments.length === 0 && !isSuccess)) {
    return (
      <div className="max-w-md mx-auto mt-20 p-10 text-center bg-white rounded-[2.5rem] border border-red-100 shadow-2xl shadow-red-900/5">
        <div className="bg-red-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">
          ⚠️
        </div>
        <h2 className="text-xl font-black text-gray-900">Link Inactive</h2>
        <p className="text-gray-500 text-sm mt-3">
          All assets signed, link expired, or invalid credentials.
        </p>
      </div>
    );
  }

  // 4. Success State
  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto pt-32 pb-12 px-6 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-blue-600 w-20 h-20 rounded-[2rem] rotate-6 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-200">
          <svg
            className="w-10 h-10 text-white -rotate-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">
          Handover Complete
        </h2>
        <p className="text-gray-500 mt-3">
          {selectedIds.length} Assets successfully registered.
        </p>
      </div>
    );
  }

  // 5. Main UI
  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-20">
      <div className="max-w-md mx-auto px-6 pt-16 space-y-8">
        <header className="space-y-3">
          <div className="inline-flex items-center space-x-2 bg-gray-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400"></span>
            </span>
            <span>Batch Receipt</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-gray-900">
            Verify Assets
          </h1>
          <p className="text-gray-500 text-xs font-medium uppercase tracking-widest">
            {assignments.length} items pending signature
          </p>
        </header>

        <main className="space-y-4">
          <div className="space-y-3">
            {assignments.map((assignment) => (
              <button
                key={assignment.id}
                onClick={() => handleToggleAsset(assignment.id)}
                className={`w-full flex items-center space-x-4 p-5 rounded-[2rem] border transition-all duration-300 text-left ${
                  selectedIds.includes(assignment.id)
                    ? "bg-white border-blue-600 shadow-xl shadow-blue-900/5 ring-1 ring-blue-600"
                    : "bg-gray-50 border-gray-100 opacity-60"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg border transition-colors ${
                    selectedIds.includes(assignment.id)
                      ? "bg-blue-50 border-blue-100 text-blue-600"
                      : "bg-white border-gray-200 text-gray-400"
                  }`}
                >
                  {selectedIds.includes(assignment.id) ? "✓" : "📦"}
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-gray-900 text-sm">
                    {assignment.asset?.assetTag}
                  </h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    SN: {assignment.asset?.serialNumber}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="bg-white border border-gray-100 rounded-[3rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  {useRecent
                    ? "Confirm Previous Signature"
                    : `Sign for ${selectedIds.length} item${selectedIds.length !== 1 ? "s" : ""}`}
                </p>
                {canReuse && !isUpdating && (
                  <button
                    onClick={() => setUseRecent(!useRecent)}
                    className="text-[10px] font-black text-blue-600 uppercase tracking-widest"
                  >
                    {useRecent ? "✎ Draw New" : "↺ Use Recent"}
                  </button>
                )}
              </div>

              <div
                className={`transition-all duration-500 ${isUpdating || selectedIds.length === 0 ? "opacity-30 grayscale pointer-events-none scale-[0.97]" : ""}`}
              >
                {useRecent && history?.recentSignatureUrl ? (
                  <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                    <div className="h-48 w-full bg-gray-50 border-2 border-dashed border-gray-100 rounded-[2rem] flex items-center justify-center p-6">
                      <img
                        src={history.recentSignatureUrl}
                        alt="Recent"
                        className="max-h-full max-w-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <button
                      onClick={() =>
                        handleFinalizeBatch(history.recentSignatureKey!)
                      }
                      className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-gray-200 active:scale-95"
                    >
                      Confirm & Verify Batch
                    </button>
                  </div>
                ) : (
                  <SignaturePad onConfirm={handleFinalizeBatch} />
                )}
              </div>
            </div>
            <p className="text-[10px] text-center text-gray-400 font-medium leading-relaxed px-6 italic">
              I confirm the receipt of selected equipment in good working order.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function AcknowledgePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AcknowledgeContent />
    </Suspense>
  );
}
