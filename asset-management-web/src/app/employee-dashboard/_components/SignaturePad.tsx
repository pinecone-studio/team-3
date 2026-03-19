"use client";

import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { X, RotateCcw, PenLine } from "lucide-react";

interface SignaturePadProps {
  onClose: () => void;
  onConfirm: (signatureData: string) => void;
  canReuse?: boolean;
  onReuseSignature?: () => void;
  recentSignatureUrl?: string;
}

export default function SignaturePad({
  onClose,
  onConfirm,
  canReuse,
  onReuseSignature,
  recentSignatureUrl,
}: SignaturePadProps) {
  const sigRef = useRef<SignatureCanvas>(null);
  const [showRecent, setShowRecent] = useState(false);

  const handleConfirmDrawing = () => {
    if (sigRef.current?.isEmpty()) {
      return alert("Гарын үсгээ зурна уу.");
    }
    const base64 = sigRef.current?.getTrimmedCanvas().toDataURL("image/png");
    if (base64) onConfirm(base64);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-[540px] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-[24px] font-bold text-gray-900 tracking-tight">
              Гарын үсэг зурах
            </h2>
            <p className="text-gray-500 text-sm mt-1 font-medium">
              {showRecent
                ? "Өмнөх гарын үсгийг ашиглах"
                : "Энд гарын үсгээ зурна уу"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors mt-1"
          >
            <X size={28} className="text-gray-900" />
          </button>
        </div>

        {/* Content Area */}
        <div className="relative">
          {/* Toggle Button at the top right of the canvas */}
          {canReuse && (
            <div className="flex justify-end mb-3">
              <button
                onClick={() => setShowRecent(!showRecent)}
                className="text-[11px] font-bold text-blue-600 uppercase tracking-widest flex items-center gap-1.5 hover:text-blue-700 transition-colors"
              >
                {showRecent ? <PenLine size={14} /> : <RotateCcw size={14} />}
                <span>{showRecent ? "Шинээр зурах" : "Өмнөхөө ашиглах"}</span>
              </button>
            </div>
          )}

          {showRecent && recentSignatureUrl ? (
            <div className="space-y-6">
              <div className="h-[280px] w-full bg-[#F8FAFF] border-[3px] border-[#4A85F6] rounded-xl flex items-center justify-center p-6">
                <img
                  src={recentSignatureUrl}
                  alt="Recent Signature"
                  className="max-h-full max-w-full object-contain mix-blend-multiply"
                />
              </div>
              <button
                onClick={onReuseSignature}
                className="w-full py-4 bg-[#4A85F6] text-white rounded-xl font-bold text-base hover:bg-blue-600 transition-all active:scale-[0.98] shadow-lg shadow-blue-200"
              >
                Илгээх
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Drawing Box with Blue Border */}
              <div className="border-[3px] border-[#4A85F6] bg-[#F8FAFF] rounded-xl overflow-hidden touch-none shadow-inner">
                <SignatureCanvas
                  ref={sigRef}
                  penColor="black"
                  canvasProps={{
                    className: "w-full h-[280px] cursor-crosshair",
                  }}
                />
              </div>

              {/* Bottom Buttons Grid */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => sigRef.current?.clear()}
                  className="py-4 border-2 border-gray-100 text-gray-900 rounded-xl font-bold text-base hover:bg-gray-50 transition-all active:scale-[0.98]"
                >
                  Арилгах
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDrawing}
                  className="py-4 bg-[#4A85F6] text-white rounded-xl font-bold text-base hover:bg-blue-600 shadow-lg shadow-blue-100 transition-all active:scale-[0.98]"
                >
                  Илгээх
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
