"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import QrScanner from "qr-scanner";
import { X } from "lucide-react";
import { useUpdateCensusTaskMutation } from "@/gql/graphql";

type ScannedTask = {
  id: string;
  censusId: string;
  assetId: string;
  verifierId?: string | null;
  verifiedAt?: string | null;
  conditionReported?: string | null;
  locationConfirmed?: boolean | null;
  discrepancyFlag?: boolean | null;
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
  const [success, setSuccess] = useState("");

  const [updateCensusTask] = useUpdateCensusTaskMutation();

  const fetchTaskByAssetId = useCallback(
    async (assetId: string) => {
      const cleanAssetId = assetId.trim();
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
              id
              censusId
              assetId
              verifierId
              verifiedAt
              conditionReported
              locationConfirmed
              discrepancyFlag
              asset {
                id
                assetTag
                serialNumber
                status
                category {
                  id
                  name
                }
              }
            }
          }
        `,
            variables: { censusId, assetId: cleanAssetId },
          }),
        });

        const json = await res.json();
        const foundTask = json?.data?.getCensusTaskByAssetId;

        if (!foundTask) {
          setScanError("Энэ QR-д тохирох census task олдсонгүй");
          return;
        }

        setTask(foundTask);
      } catch (error) {
        console.error(error);
        setScanError("Мэдээлэл авахад алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    },
    [censusId],
  );

  const startScanner = useCallback(async () => {
    if (!videoRef.current) return;

    setScanError("");
    setSuccess("");
    setTask(null);

    const scanner = new QrScanner(
      videoRef.current,
      async (result) => {
        const raw = typeof result === "string" ? result : result.data;
        if (!raw) return;

        scanner.stop();
        await fetchTaskByAssetId(raw);
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
      },
    );

    scannerRef.current = scanner;
    try {
      await scanner.start();
    } catch (err) {
      setScanError("Камер асаахад алдаа гарлаа");
    }
  }, [fetchTaskByAssetId]);

  useEffect(() => {
    if (isOpen) {
      startScanner();
    } else {
      scannerRef.current?.stop();
      scannerRef.current?.destroy();
      scannerRef.current = null;
    }

    return () => {
      scannerRef.current?.stop();
      scannerRef.current?.destroy();
    };
  }, [isOpen, startScanner]);

  const handleConfirm = async () => {
    if (!task) return;

    try {
      setConfirming(true);
      setScanError("");

      // Using en-CA locale for consistent YYYY-MM-DD local time
      const today = new Intl.DateTimeFormat("en-CA").format(new Date());

      const { data } = await updateCensusTask({
        variables: {
          input: {
            id: task.id,
            verifierId,
            verifiedAt: today,
            conditionReported: task.conditionReported || "Good",
            locationConfirmed: true,
            discrepancyFlag: false,
          },
        },
      });

      if (data) {
        setSuccess("QR баталгаажуулалт амжилттай");
        // Optional: Close modal after a short delay
        setTimeout(() => onClose(), 1500);
      }
    } catch (error) {
      console.error(error);
      setScanError("Баталгаажуулах үед алдаа гарлаа");
    } finally {
      setConfirming(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-[420px] rounded-[28px] bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-[26px] font-semibold text-gray-900 leading-tight">
              QR баталгаажуулалт
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Хөрөнгийн QR кодыг камераар уншуулна уу
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-[#F1F5F9]">
          {!task ? (
            <div className="p-1">
              <video
                ref={videoRef}
                className="h-[300px] w-full rounded-xl object-cover"
              />
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                  <p className="text-sm font-medium text-blue-600 animate-pulse">
                    Шалгаж байна...
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 p-5 bg-white border border-blue-50">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">
                    Asset Tag
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {task.asset?.assetTag}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">
                    Status
                  </p>
                  <p className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md inline-block">
                    {task.asset?.status}
                  </p>
                </div>
              </div>

              <div className="h-px bg-gray-100 w-full" />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Ангилал</span>
                  <span className="text-sm font-medium text-gray-800">
                    {task.asset?.category?.name || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Сериал дугаар</span>
                  <span className="text-sm font-medium text-gray-800">
                    {task.asset?.serialNumber || "—"}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  onClick={handleConfirm}
                  disabled={confirming}
                  className="flex-1 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:opacity-50 transition-all active:scale-95"
                >
                  {confirming ? "Хадгалж байна..." : "Баталгаажуулах"}
                </button>
                <button
                  onClick={startScanner}
                  className="rounded-xl border border-gray-200 px-4 py-3.5 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
                >
                  Дахин
                </button>
              </div>
            </div>
          )}
        </div>

        {scanError && (
          <div className="mt-4 rounded-xl bg-red-50 p-3.5 text-xs font-medium text-red-600 border border-red-100">
            {scanError}
          </div>
        )}

        {success && (
          <div className="mt-4 rounded-xl bg-green-50 p-3.5 text-xs font-medium text-green-600 border border-green-100 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
            {success}
          </div>
        )}
      </div>
    </div>
  );
}
