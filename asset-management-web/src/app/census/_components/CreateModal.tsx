'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function CreateModal({
  onClose,
  onCreate
}: {
  onClose: () => void;
  onCreate: (data: any) => void;
}) {
  const [form, setForm] = useState({
    name: '',
    type: '',
    location: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name) return alert('Нэр оруулна уу');
    onCreate(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[420px] p-6 shadow-lg">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Тооллого үүсгэх</h2>
          <X
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-gray-600"
          />
        </div>

        {/* FORM */}
        <div className="space-y-5">

          {/* NAME */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Тооллогын нэр</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Нэр оруулна уу"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* TYPE */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Ангилал</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Төрөл сонгоно уу</option>
              <option value="All">All</option>
            </select>
          </div>

          {/* LOCATION */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Байршил</label>
            <select
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Байршил сонгоно уу</option>
              <option value="branch1">Салбар 1</option>
            </select>
          </div>

          {/* START DATE */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Эхлэх огноо</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* END DATE */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Дуусах огноо</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Хадгалах
          </button>

        </div>
      </div>
    </div>
  );
}