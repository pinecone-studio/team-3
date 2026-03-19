"use client";

import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { X, CheckCircle2 } from "lucide-react";
import { useUpdateCensusTaskMutation } from "@/gql/graphql";

type ScannedTask = {
  id: string;
  censusId: string;
  assetId: string;
  asset?: {
    id: string;
    assetTag: string;
    serialNumber?: string | null;
    status: string;
    category?: {
      id: string;
      name: string;
    } | null;
  } | null;
};

interface QRScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  censusId: string;
  verifierId: string;
}

export default function QRScanModal({
  isOpen,
  onClose,
  censusId,
  verifierId,
}: QRScanModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const scannerRef = useRef<QrScanner | null>(null);

  const [loading, setLoading] = useState(false);
  const [scanError, setScanError] = useState("");
  const [task, setTask] = useState<ScannedTask | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [success, setSuccess] = useState(false);

  const [updateCensusTask] = useUpdateCensusTaskMutation();

  // Reset logic to scan next QR
  const handleResetAndNext = () => {
    setSuccess(false);
    setTask(null);
    setScanError("");
  };

  useEffect(() => {
    // Only run camera if modal is open, not in success state, and no task is currently loaded
    if (!isOpen || success || task || !videoRef.current) return;

    let stopped = false;

    const startScanner = async () => {
      try {
        setScanError("");
        const scanner = new QrScanner(
          videoRef.current!,
          async (result) => {
            if (stopped) return;
            const raw = typeof result === "string" ? result : result.data;
            const assetId = raw.trim();
            if (!assetId) return;

            scanner.stop();
            await fetchTaskByAssetId(assetId);
          },
          {
            returnDetailedScanResult: true,
            highlightScanRegion: true,
            highlightCodeOutline: true,
          },
        );

        scannerRef.current = scanner;
        await scanner.start();
      } catch (error) {
        console.error(error);
        setScanError("Камер асаахад алдаа гарлаа");
      }
    };

    startScanner();

    return () => {
      stopped = true;
      if (scannerRef.current) {
        scannerRef.current.stop();
        scannerRef.current.destroy();
        scannerRef.current = null;
      }
    };
  }, [isOpen, success, !!task]);

  const fetchTaskByAssetId = async (assetId: string) => {
    try {
      setLoading(true);
      setScanError("");
      const res = await fetch("http://localhost:8787/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
          query GetCensusTaskByAssetId($censusId: ID!, $assetId: ID!) {
            getCensusTaskByAssetId(censusId: $censusId, assetId: $assetId) {
              id assetId asset { id assetTag serialNumber status category { id name } }
            }
          }`,
          variables: { censusId, assetId },
        }),
      });

      const json = await res.json();
      const foundTask = json?.data?.getCensusTaskByAssetId;

      if (!foundTask) {
        setScanError("Энэ QR-д тохирох census task олдсонгүй");
        // Restart scanner if not found
        setTask(null);
        return;
      }
      setTask(foundTask);
    } catch (error) {
      setScanError("QR мэдээлэл авахад алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!task) return;
    try {
      setConfirming(true);
      await updateCensusTask({
        variables: {
          input: {
            id: task.id,
            verifierId,
            verifiedAt: new Date().toISOString(),
            locationConfirmed: true,
            discrepancyFlag: false,
          },
        },
      });
      setSuccess(true);
    } catch (error) {
      setScanError("Баталгаажуулах үед алдаа гарлаа");
    } finally {
      setConfirming(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      {success ? (
        /* Success State View */
        <div className="relative w-full max-w-[450px] overflow-hidden rounded-[32px] bg-white p-8 shadow-2xl transition-all">
          <button
            onClick={handleResetAndNext}
            className="absolute right-6 top-6 rounded-full p-2 text-gray-900 transition-colors hover:bg-gray-100"
          >
            <X className="h-6 w-6" strokeWidth={2.5} />
          </button>

          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-8 flex items-center justify-center">
              <CheckCircle2
                className="h-20 w-20 text-[#67C4B0]"
                strokeWidth={1.5}
              />
            </div>
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">
              Амжилттай илгээгдсэн
            </h2>
            <p className="max-w-[280px] text-base leading-relaxed text-gray-500">
              Өөрийн хөрөнгийн жагсаалтыг хянах самбараас харах боломжтой
            </p>
            <button
              onClick={handleResetAndNext}
              className="mt-8 w-full rounded-xl bg-[#2563EB] py-3 text-white font-semibold"
            >
              Дараагийн QR уншуулах
            </button>
          </div>
        </div>
      ) : (
        /* Scanner / Info View */
        <div className="w-full max-w-[420px] rounded-[28px] bg-white p-6 shadow-2xl">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h2 className="text-[28px] font-semibold text-gray-900">
                QR баталгаажуулалт
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Кодыг камераар скан хийнэ үү
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100"
            >
              <X className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          {!task ? (
            <div className="rounded-2xl bg-[#EEF2F7] p-4">
              <div className="overflow-hidden rounded-2xl bg-[#E9EEF5]">
                <video
                  ref={videoRef}
                  className="h-[320px] w-full rounded-2xl object-cover"
                />
              </div>
              <p className="mt-4 text-center text-sm text-gray-500">
                {loading ? "QR шалгаж байна..." : "Камер ачаалж байна..."}
              </p>
            </div>
          ) : (
            <div className="space-y-4 rounded-2xl border border-gray-200 bg-[#F8FAFC] p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400">Asset tag</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {task.asset?.assetTag}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Status</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {task.asset?.status}
                  </p>
                </div>
              </div>
              <button
                onClick={handleConfirm}
                disabled={confirming}
                className="w-full rounded-xl bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {confirming ? "Илгээж байна..." : "Баталгаажуулах"}
              </button>
              <button
                onClick={() => setTask(null)}
                className="w-full text-sm text-gray-500 hover:underline"
              >
                Буцах
              </button>
            </div>
          )}

          {scanError && (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {scanError}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
