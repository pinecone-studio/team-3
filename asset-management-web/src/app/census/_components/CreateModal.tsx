"use client";

import { useState } from "react";
import { X } from "lucide-react";

type CreateModalProps = {
  onClose: () => void;
  onCreate: (data: {
    name: string;
    scope: string;
    location: string;
    startDate: string;
    closedAt: string;
  }) => void;
  loading?: boolean;
};

export default function CreateModal({
  onClose,
  onCreate,
  loading = false,
}: CreateModalProps) {
  const [form, setForm] = useState({
    name: "",
    scope: "",
    location: "",
    startDate: "",
    closedAt: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (!form.name.trim()) {
      alert("Нэр оруулна уу");
      return;
    }

    if (!form.scope.trim()) {
      alert("Scope сонгоно уу");
      return;
    }

    onCreate(form);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Тооллого үүсгэх
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5">
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Тооллогын нэр</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Нэр оруулна уу"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Scope</label>
            <select
              name="scope"
              value={form.scope}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Төрөл сонгоно уу</option>
              <option value="company">Company</option>
              <option value="department">Department</option>
              <option value="category">Category</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Scope filter</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Ж: Engineering эсвэл category id"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Эхлэх огноо</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-600">Дуусах огноо</label>
            <input
              type="date"
              name="closedAt"
              value={form.closedAt}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-2 text-white transition-colors hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? "Үүсгэж байна..." : "Хадгалах"}
          </button>
        </div>
      </div>
    </div>
  );
}
