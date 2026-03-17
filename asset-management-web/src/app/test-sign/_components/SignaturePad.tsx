"use client";

import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

interface Props {
  onConfirm: (base64: string) => void;
}

export default function SignaturePad({ onConfirm }: Props) {
  const sigRef = useRef<SignatureCanvas>(null);

  const handleConfirm = () => {
    if (sigRef.current?.isEmpty()) {
      return alert("Please provide a signature before confirming.");
    }
    const base64 = sigRef.current?.getTrimmedCanvas().toDataURL("image/png");
    if (base64) onConfirm(base64);
  };

  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-gray-100 bg-gray-50 rounded-[2rem] overflow-hidden touch-none">
        <SignatureCanvas
          ref={sigRef}
          penColor="black"
          canvasProps={{
            className: "w-full h-48 cursor-crosshair",
          }}
        />
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => sigRef.current?.clear()}
          className="text-[10px] px-6 py-4 border border-gray-200 text-gray-400 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-50 transition-colors"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className="text-[10px] px-6 py-4 bg-gray-900 text-white rounded-2xl flex-1 font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-gray-200 active:scale-95"
        >
          Confirm & Verify Batch
        </button>
      </div>
    </div>
  );
}
