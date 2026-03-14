"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

interface PendingAsset {
  id: string;
  picture: string;
  serialNumber: string;
  accessoryJson: string;
  assetTag: string;
}

const SignaturePad = dynamic(() => import("./_components/SignaturePad"), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full bg-gray-100 animate-pulse rounded-xl" />
  ),
});

function AcknowledgeContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [pendingAssets, setPendingAssets] = useState<PendingAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAssets() {
      if (!token) {
        setError("No security token found in URL.");
        setLoading(false);
        return;
      }

      try {
        // TODO: Replace with your actual GraphQL fetch
        // const result = await GQL_CLIENT.query(GET_PENDING, { token });
        // setPendingAssets(result.data.pendingAssetsForToken);
      } catch (err) {
        setError("Failed to verify assignments. The link may be expired.");
      } finally {
        setLoading(false);
      }
    }
    fetchAssets();
  }, [token]);

  const handleFinalize = async (assignmentId: string, signature: string) => {
    if (!token) return;

    try {
      console.log(`Finalizing assignment ${assignmentId}...`);

      // Perform Mutation Call here

      // Update local state by filtering out the finalized asset
      setPendingAssets((prev) =>
        prev.filter((asset) => asset.id !== assignmentId),
      );
      alert("Acknowledgment saved. PDF generated and stored.");
    } catch (err) {
      alert("Error saving acknowledgment. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="max-w-md mx-auto p-10 text-center text-gray-500">
        Verifying assignments...
      </div>
    );

  if (error)
    return (
      <div className="max-w-md mx-auto p-10 text-center text-red-500 font-medium">
        {error}
      </div>
    );

  return (
    <div className="max-w-md mx-auto p-6 space-y-8 min-h-screen bg-gray-50/50">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Confirm Receipt
        </h1>
        <p className="text-sm text-gray-500">
          Please review the details and sign for each piece of equipment.
        </p>
      </header>

      <div className="space-y-6">
        {pendingAssets.map((asset) => (
          <div
            key={asset.id}
            className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white space-y-5"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h2 className="font-bold text-lg text-blue-600">
                  {asset.assetTag}
                </h2>
                <p className="text-xs text-gray-500 font-mono">
                  S/N: {asset.serialNumber}
                </p>
                {asset.accessoryJson && (
                  <p className="text-xs text-gray-400 italic">
                    Incl: {asset.accessoryJson}
                  </p>
                )}
              </div>
              <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded-full uppercase font-bold">
                Pending
              </span>
            </div>

            {/* Optional: Render picture if available */}
            {asset.picture && (
              <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={asset.picture}
                  alt={asset.assetTag}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase mb-3 tracking-wider">
                Authorized Signature
              </p>
              <SignaturePad
                onConfirm={(base64) => handleFinalize(asset.id, base64)}
              />
            </div>
          </div>
        ))}
      </div>

      {pendingAssets.length === 0 && (
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
          <p className="text-gray-500 mt-2">
            All assigned assets have been acknowledged. You may now close this
            browser window.
          </p>
        </div>
      )}
    </div>
  );
}

export default function AcknowledgePage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <AcknowledgeContent />
    </Suspense>
  );
}
