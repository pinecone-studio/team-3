"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import {
  useGetAssignmentByTokenQuery,
  useUpdateAssignmentMutation,
} from "@/gql/graphql";

// Modern Signature Pad Loading State
const SignaturePad = dynamic(() => import("./_components/SignaturePad"), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl animate-pulse flex items-center justify-center">
      <span className="text-gray-400 text-sm">
        Initializing Signature Pad...
      </span>
    </div>
  ),
});

function AcknowledgeContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isSuccess, setIsSuccess] = useState(false);

  const { data, loading, error } = useGetAssignmentByTokenQuery({
    variables: { token: token ?? "" },
    skip: !token,
  });

  // Fixed variable name and loading state
  const [updateAssignment, { loading: isUpdating }] =
    useUpdateAssignmentMutation();

  const handleFinalize = async (assignmentId: string, signature: string) => {
    if (!token || isUpdating) return;

    try {
      await updateAssignment({
        variables: {
          updateAssignmentId: assignmentId, // Make sure this matches your schema (id or updateAssignmentId)
          input: {
            signatureR2Key: signature,
          },
        },
      });
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      alert(
        "Verification failed. Please ensure the signature is clear and try again.",
      );
    }
  };

  // 1. LOADING STATE
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-500 font-medium">Verifying Secure Link...</p>
      </div>
    );

  // 2. ERROR STATE
  if (error || (!data?.getAssignmentByToken && !isSuccess))
    return (
      <div className="max-w-md mx-auto mt-20 p-8 text-center bg-red-50 rounded-3xl border border-red-100">
        <div className="text-red-600 text-4xl mb-4">⚠️</div>
        <h2 className="text-lg font-bold text-red-900">Link Expired</h2>
        <p className="text-red-700/70 text-sm mt-2">
          {error?.message ||
            "This acknowledgment link is no longer valid. Please request a new one from IT."}
        </p>
      </div>
    );

  // 3. SUCCESS STATE
  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto pt-24 pb-12 px-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-green-500 w-20 h-20 rounded-3xl rotate-12 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-200">
          <svg
            className="w-10 h-10 text-white -rotate-12"
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
        <p className="text-gray-500 mt-3 leading-relaxed">
          Your digital signature has been verified and stored securely. You may
          now close this window.
        </p>
        <button
          onClick={() => window.close()}
          className="mt-10 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
        >
          Close Application
        </button>
      </div>
    );
  }

  const assignment = data?.getAssignmentByToken;
  const asset = assignment?.asset;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      <div className="max-w-md mx-auto px-6 pt-12 space-y-8">
        <header className="space-y-2">
          <div className="inline-flex items-center space-x-2 bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span>Security Portal</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">
            Asset Receipt
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Verify the equipment details below and provide your digital
            signature to finalize the handover.
          </p>
        </header>

        <main className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-xl shadow-blue-900/5 space-y-8">
            {/* Asset Info Section */}
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 text-2xl">
                💻
              </div>
              <div className="flex-1">
                <h2 className="font-black text-gray-900 text-xl tracking-tight">
                  {asset?.assetTag || "Device Name"}
                </h2>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-tighter">
                  {/* {asset?.category || "Equipment"} •{" "} */}
                  {asset?.serialNumber || "No S/N"}
                </p>
              </div>
            </div>

            {/* Signature Area */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  Sign below
                </p>
                {isUpdating && (
                  <span className="text-[11px] font-bold text-blue-600 animate-pulse">
                    Encrypting & Saving...
                  </span>
                )}
              </div>

              <div
                className={`transition-all duration-300 ${isUpdating ? "opacity-50 pointer-events-none scale-[0.98]" : ""}`}
              >
                <SignaturePad
                  onConfirm={(base64) => handleFinalize(assignment!.id, base64)}
                />
              </div>
            </div>

            <p className="text-[10px] text-center text-gray-400 leading-relaxed px-4">
              By signing, you acknowledge that you have received the asset
              listed above in good working condition.
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
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-6 h-6 border-2 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
        </div>
      }
    >
      <AcknowledgeContent />
    </Suspense>
  );
}
