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
    <div className="space-y-4">
      <div className="border bg-gray-50 rounded-lg overflow-hidden touch-none">
        <SignatureCanvas
          ref={sigRef}
          penColor="black"
          canvasProps={{
            className: "w-full h-48 cursor-crosshair",
          }}
        />
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => sigRef.current?.clear()}
          className="text-sm px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className="text-sm px-4 py-2 bg-blue-600 text-white rounded-md flex-1 font-medium hover:bg-blue-700 transition-colors"
        >
          Confirm Signature
        </button>
      </div>
    </div>
  );
}
