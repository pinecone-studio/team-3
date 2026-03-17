import { X } from 'lucide-react';

export default function CreateModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      
      <div className="bg-white rounded-xl w-[420px] p-6">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold">
            Тооллого үүсгэх
          </h2>

          <X
            className="cursor-pointer text-gray-400 hover:text-gray-600"
            onClick={onClose}
          />
        </div>

        {/* FORM */}
        <div className="space-y-4">

          {/* NAME */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Тооллогын нэр
            </label>
            <input
              placeholder="0000/00/00"
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* TYPE */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Ангилал
            </label>
            <select className="w-full border rounded-lg px-3 py-2 text-sm">
              <option>Төрөл сонгоно уу</option>
            </select>
          </div>

          {/* LOCATION */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Байршил
            </label>
            <select className="w-full border rounded-lg px-3 py-2 text-sm">
              <option>Байршил сонгоно уу</option>
            </select>
          </div>

          {/* START DATE */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Эхлэх огноо
            </label>
            <input
              placeholder="0000/00/00"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* END DATE */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Дуусах огноо
            </label>
            <input
              placeholder="0000/00/00"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* BUTTON */}
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2 hover:bg-blue-700">
            Хадгалах
          </button>

        </div>
      </div>
    </div>
  );
}