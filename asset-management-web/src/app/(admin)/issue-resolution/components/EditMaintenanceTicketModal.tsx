"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60  ">
      <div className="bg-white w-full max-w-[500px] rounded-md p-8 shadow-2xl relative">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[20px] font-bold text-gray-900">Дэлгэрэнгүй</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Шийдвэрлэгдсэн огноо
            </label>
            <input
              type="date"
              value={formData.resolvedAt}
              onChange={(e) =>
                setFormData({ ...formData, resolvedAt: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-xl"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Өртөг</label>
            <input
              type="number"
              value={formData.cost}
              onChange={(e) =>
                setFormData({ ...formData, cost: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-xl"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Тайлбар</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-xl resize-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleStatus}
              className={`w-11 h-6 flex items-center rounded-full transition ${
                formData.status === "RESOLVED" ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`w-4 h-4 bg-white rounded-full transform transition ${
                  formData.status === "RESOLVED"
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>
            <span>Шийдвэрлэгдсэн</span>
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <button
            onClick={handleSubmit}
            className="w-32 py-3 bg-blue-600 text-white rounded-xl"
          >
            Хадгалах
          </button>
        </div>
      </div>
    </div>
  );
}
