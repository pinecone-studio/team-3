"use client";

import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { X } from "lucide-react";

type AssetInfo = {
  id: string;
  assetTag: string;
  serialNumber?: string | null;
  status: string;
  assignedTo?: string | null;
  category?: {
    id: string;
    name: string;
  } | null;
};

type CensusTaskInfo = {
  id: string;
  censusId: string;
  assetId: string;
  verifierId?: string | null;
  verifiedAt?: string | null;
  conditionReported?: string | null;
  locationConfirmed?: boolean | null;
  discrepancyFlag?: boolean | null;
};

interface QRScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  censusId: string;
  employeeId: string;
}

export default function QRScanModal({
  isOpen,
  onClose,
  censusId,
  employeeId,
}: QRScanModalProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const scannerRef = useRef<QrScanner | null>(null);

  const [loading, setLoading] = useState(false);
  const [scanError, setScanError] = useState("");
  const [asset, setAsset] = useState<AssetInfo | null>(null);
  const [task, setTask] = useState<CensusTaskInfo | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!isOpen || !videoRef.current) return;

    let stopped = false;

    const startScanner = async () => {
      try {
        setScanError("");
        setSuccess("");
        setAsset(null);
        setTask(null);

        const scanner = new QrScanner(
          videoRef.current!,
          async (result) => {
            if (stopped) return;

            const raw = typeof result === "string" ? result : result.data;
            const assetId = raw.trim();
            if (!assetId) return;

            scanner.stop();
            await fetchScanData(assetId);
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
  }, [isOpen]);

  const fetchScanData = async (assetId: string) => {
    try {
      setLoading(true);
      setScanError("");
      setAsset(null);
      setTask(null);

      const res = await fetch("http://localhost:8787/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query GetScanData($assetId: ID!, $censusId: ID!) {
              getAssetById(id: $assetId) {
                id
                assetTag
                serialNumber
                status
                assignedTo
                category {
                  id
                  name
                }
              }

              getCensusTaskByAssetId(censusId: $censusId, assetId: $assetId) {
                id
                censusId
                assetId
                verifierId
                verifiedAt
                conditionReported
                locationConfirmed
                discrepancyFlag
              }
            }
          `,
          variables: {
            assetId,
            censusId,
          },
        }),
      });

      const json = await res.json();
      const foundAsset = json?.data?.getAssetById;
      const foundTask = json?.data?.getCensusTaskByAssetId;

      if (!foundAsset) {
        setScanError("Asset мэдээлэл олдсонгүй");
        return;
      }

      setAsset(foundAsset);
      setTask(foundTask || null);
    } catch (error) {
      console.error(error);
      setScanError("QR мэдээлэл авахад алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  // verifierId-г түр тоохгүй, verifiedAt null байвал pending гэж үзнэ
  const canVerify =
    !!task && !task.verifiedAt && asset?.assignedTo === employeeId;

  const handleConfirm = async () => {
    if (!task || !asset) return;

    if (asset.assignedTo !== employeeId) {
      setScanError("Энэ хөрөнгө танд хуваарилагдаагүй байна");
      return;
    }

    try {
      setConfirming(true);
      setScanError("");
      setSuccess("");

      const res = await fetch("http://localhost:8787/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation UpdateCensusTask($input: UpdateCensusTaskInput!) {
              updateCensusTask(input: $input)
            }
          `,
          variables: {
            input: {
              id: task.id,
              verifierId: employeeId,
              verifiedAt: new Date().toISOString(),
              conditionReported: task.conditionReported || "Good",
              locationConfirmed: true,
              discrepancyFlag: false,
            },
          },
        }),
      });

      const json = await res.json();
      const status = json?.data?.updateCensusTask;

      if (status && String(status).toUpperCase() === "SUCCESS") {
        setSuccess("QR баталгаажуулалт амжилттай");
        setTask({
          ...task,
          verifierId: employeeId,
          verifiedAt: new Date().toISOString(),
        });
        return;
      }

      setScanError("Баталгаажуулж чадсангүй");
    } catch (error) {
      console.error(error);
      setScanError("Баталгаажуулах үед алдаа гарлаа");
    } finally {
      setConfirming(false);
    }
  };

  const handleRescan = async () => {
    setAsset(null);
    setTask(null);
    setScanError("");
    setSuccess("");

    if (!videoRef.current) return;

    try {
      const scanner = new QrScanner(
        videoRef.current,
        async (result) => {
          const raw = typeof result === "string" ? result : result.data;
          const assetId = raw.trim();
          if (!assetId) return;

          scanner.stop();
          await fetchScanData(assetId);
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
      setScanError("Камер дахин асаахад алдаа гарлаа");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-[420px] rounded-[28px] bg-white p-5 shadow-2xl sm:p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 sm:text-[28px]">
              QR баталгаажуулалт
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Төхөөрөмж дээрх QR кодыг камераар скан хийнэ үү
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {!asset && (
          <div className="rounded-2xl bg-[#EEF2F7] p-3 sm:p-4">
            <div className="overflow-hidden rounded-2xl bg-[#E9EEF5]">
              <video
                ref={videoRef}
                className="h-[260px] w-full rounded-2xl object-cover sm:h-[320px]"
              />
            </div>

            {loading && (
              <p className="mt-4 text-center text-sm text-gray-500">
                QR шалгаж байна...
              </p>
            )}

            {!loading && !scanError && (
              <p className="mt-4 text-center text-sm text-gray-500">
                Камер ачаалж байна...
              </p>
            )}
          </div>
        )}

        {asset && (
          <div className="space-y-4 rounded-2xl border border-gray-200 bg-[#F8FAFC] p-4">
            <div>
              <p className="text-xs text-gray-400">Asset tag</p>
              <p className="text-lg font-semibold text-gray-900">
                {asset.assetTag}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Category</p>
              <p className="text-base font-medium text-gray-900">
                {asset.category?.name || "Тодорхойгүй"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Serial number</p>
              <p className="text-base font-medium text-gray-900">
                {asset.serialNumber || "Сериал дугааргүй"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Status</p>
              <p className="text-base font-medium text-gray-900">
                {asset.status || "Тодорхойгүй"}
              </p>
            </div>

            {!task && (
              <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-700">
                Энэ asset дээр идэвхтэй census task байхгүй байна
              </div>
            )}

            {task && task.verifiedAt && (
              <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                Энэ item аль хэдийн баталгаажсан байна
              </div>
            )}

            {task && asset.assignedTo !== employeeId && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                Энэ хөрөнгө танд хуваарилагдаагүй байна
              </div>
            )}

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              {canVerify && (
                <button
                  onClick={handleConfirm}
                  disabled={confirming}
                  className="flex-1 rounded-xl bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {confirming ? "Баталгаажуулж байна..." : "Баталгаажуулах"}
                </button>
              )}

              <button
                onClick={handleRescan}
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Дахин уншуулах
              </button>
            </div>
          </div>
        )}

        {scanError && (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {scanError}
          </div>
        )}

        {success && (
          <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 p-3 text-sm text-green-600">
            {success}
          </div>
        )}
      </div>
    </div>
  );
}
