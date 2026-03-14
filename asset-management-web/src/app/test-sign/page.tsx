"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useGetAssignmentByTokenQuery } from "@/gql/graphql";

const SignaturePad = dynamic(() => import("./_components/SignaturePad"), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full bg-gray-100 animate-pulse rounded-xl" />
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

  const handleFinalize = async (assignmentId: string, signature: string) => {
    if (!token) return;

    try {
      console.log(`Finalizing assignment ${assignmentId}...`, signature);

      // TODO: Call your updateAssignment mutation here
      // This is where we will eventually send the signature to the backend

      setIsSuccess(true);
    } catch (err) {
      alert("Error saving acknowledgment. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="max-w-md mx-auto p-10 text-center text-gray-500">
        Verifying security token...
      </div>
    );

  if (error || (!data?.getAssignmentByToken && !isSuccess))
    return (
      <div className="max-w-md mx-auto p-10 text-center text-red-500 font-medium">
        {error?.message ||
          "Invalid or expired link. Please contact IT support."}
      </div>
    );

  if (isSuccess) {
    return (
      <div className="text-center py-20 animate-in fade-in zoom-in duration-300">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">All Set!</h2>
        <p className="text-gray-500 mt-2 px-6">
          The asset has been acknowledged. A record of this signature has been
          stored.
        </p>
      </div>
    );
  }
  if (!data?.getAssignmentByToken) return <div>No assignment found.</div>;
  const assignment = data.getAssignmentByToken;
  const asset = assignment.asset;

  /* // ACCESSORIES LOGIC - ON HOLD
    const accessories = assignment.accessoriesJson 
      ? JSON.parse(assignment.accessoriesJson) 
      : [];
  */

  return (
    <div className="max-w-md mx-auto p-6 space-y-8 min-h-screen bg-gray-50/50">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Confirm Receipt
        </h1>
        <p className="text-sm text-gray-500">
          Please review the details below and provide your signature.
        </p>
      </header>

      <div className="space-y-6">
        <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white space-y-5">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h2 className="font-bold text-lg text-blue-600">
                {asset?.assetTag || "Asset Assigned"}
              </h2>
              <p className="text-xs text-gray-500 font-mono">
                S/N: {asset?.serialNumber || "N/A"}
              </p>
            </div>
            <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded-full uppercase font-bold">
              Action Required
            </span>
          </div>

          {/* {asset?.picture && (
            <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden border">
              <img
                src={asset.picture}
                alt={asset.assetTag}
                className="w-full h-full object-cover"
              />
            </div>
          )} */}

          {/* {accessories.length > 0 && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Included Accessories</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  {accessories.map((item: any, idx: number) => (
                    <li key={idx}>• {item.name || item}</li>
                  ))}
                </ul>
              </div>
            )} 
          */}

          <div className="pt-4 border-t border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase mb-3 tracking-wider text-center">
              Digital Signature
            </p>
            <SignaturePad
              onConfirm={(base64) => handleFinalize(assignment.id, base64)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AcknowledgePage() {
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center text-gray-400">
          Loading secure form...
        </div>
      }
    >
      <AcknowledgeContent />
    </Suspense>
  );
}
