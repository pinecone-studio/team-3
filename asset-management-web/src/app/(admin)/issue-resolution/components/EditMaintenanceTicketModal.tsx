"use client";

import { useState, useEffect } from "react";
import {
  X,
  Calendar,
  DollarSign,
  AlignLeft,
  CheckCircle2,
  Info,
} from "lucide-react";

interface EditMaintenanceTicketModalProps {
  open: boolean;
  ticket: any;
  onClose: () => void;
  onSave: (form: any) => void;
}

type FormState = {
  resolvedAt: string;
  cost: string;
  description: string;
  status: "OPEN" | "RESOLVED";
};

export default function EditMaintenanceTicketModal({
  open,
  ticket,
  onClose,
  onSave,
}: EditMaintenanceTicketModalProps) {
  const [formData, setFormData] = useState<FormState>({
    resolvedAt: "",
    cost: "",
    description: "",
    status: "OPEN",
  });

  useEffect(() => {
    if (open && ticket) {
      setFormData({
        resolvedAt: ticket.resolvedAt ? ticket.resolvedAt.slice(0, 10) : "",
        cost: ticket.cost ? String(ticket.cost) : "",
        description: ticket.description ?? "",
        status: ticket.status ?? "OPEN",
      });
    }
  }, [ticket, open]);

  if (!open) return null;

  const handleSubmit = () => {
    onSave({
      resolvedAt: formData.resolvedAt || null,
      cost: formData.cost ? Number(formData.cost) : 0,
      description: formData.description,
      status: formData.status,
    });
  };

  const toggleStatus = () => {
    setFormData((prev) => ({
      ...prev,
      status: prev.status === "RESOLVED" ? "OPEN" : "RESOLVED",
    }));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

      <div
        className="absolute inset-0 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

  
      <div className="relative bg-white w-full max-w-[560px] rounded-[24px] shadow-2xl shadow-blue-500/10 overflow-hidden animate-in fade-in zoom-in duration-200 border border-blue-50">
  
        <div className="px-8 pt-8 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-[18px] font-bold text-[#1E293B] tracking-tight">
              Засварын мэдээлэл
            </h2>
            <p className="text-[13px] text-gray-400">
              Шийдвэрлэлтийн явцыг тэмдэглэх
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-50 rounded-full transition-colors text-gray-400 hover:text-blue-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-8 space-y-5">
          {/* Resolved Date */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-[13px] font-semibold text-gray-600 px-1">
              <Calendar className="w-4 h-4 text-blue-500" />
              Шийдвэрлэгдсэн огноо
            </label>
            <input
              type="date"
              value={formData.resolvedAt}
              onChange={(e) =>
                setFormData({ ...formData, resolvedAt: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
            />
          </div>

          {/* Cost */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-[13px] font-semibold text-gray-600 px-1">
              <DollarSign className="w-4 h-4 text-blue-500" />
              Засварын өртөг
            </label>
            <input
              type="number"
              placeholder="0.00"
              value={formData.cost}
              onChange={(e) =>
                setFormData({ ...formData, cost: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-[13px] font-semibold text-gray-600 px-1">
              <AlignLeft className="w-4 h-4 text-blue-500" />
              Тайлбар
            </label>
            <textarea
              rows={3}
              placeholder="Хийгдсэн ажлын тайлбар..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none"
            />
          </div>

          {/* Status Select Box */}
          <div
            onClick={toggleStatus}
            className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
              formData.status === "RESOLVED"
                ? "bg-blue-50/50 border-blue-100"
                : "bg-gray-50 border-gray-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${formData.status === "RESOLVED" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"}`}
              >
                {formData.status === "RESOLVED" ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <Info className="w-4 h-4" />
                )}
              </div>
              <div>
                <p
                  className={`text-[13px] font-bold ${formData.status === "RESOLVED" ? "text-blue-700" : "text-gray-600"}`}
                >
                  {formData.status === "RESOLVED"
                    ? "Шийдвэрлэгдсэн"
                    : "Хүлээгдэж буй"}
                </p>
                <p className="text-[11px] text-gray-400">
                  Төлөв солих бол дарна уу
                </p>
              </div>
            </div>

            <div
              className={`w-10 h-5 flex items-center rounded-full px-0.5 transition-colors ${
                formData.status === "RESOLVED" ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                  formData.status === "RESOLVED"
                    ? "translate-x-5"
                    : "translate-x-0"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-blue-100 text-blue-600 rounded-xl text-[14px] font-bold hover:bg-blue-50 transition-colors"
          >
            Цуцлах
          </button>
          <button
            onClick={handleSubmit}
            className="flex-[1.5] py-3 px-4 bg-blue-600 text-white rounded-xl text-[14px] font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
          >
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
}
