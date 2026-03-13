import { Check } from "lucide-react";
import { Add, CheckSmall, Macbook } from "../_components/icons/icons";

export default function ReportPage() {
  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-bold text-[#000000] text-2xl">
            Асуудал мэдэгдэх
          </div>
          <div className="text-[#666666] text-sm">
            Төхөөрөмжтэй холбоотой асуудал мэдэгдэх, засвар хүсэх
          </div>
        </div>
        <div className="bg-[#000000] py-2.5 px-3 cursor-pointer text-[#FFFFFF] text-sm font-medium rounded-lg flex items-center gap-2">
          <Add />
          Шинэ мэдэгдэл
        </div>
      </div>
      <div className="w-full border-[#E2E8F0] border p-6 rounded-xl flex flex-col gap-6">
        <div>
          <div className="font-semibold text-[#000000] text-lg">
            Идэвхтэй мэдэгдлүүд
          </div>
          <div className="text-[#666666] font-medium text-sm">
            Одоо шийдвэрлэгдэж буй асуудлууд
          </div>
        </div>
        <div className="items-center flex flex-col justify-center gap-1 mt-[56px]">
          <div className="rounded-full w-[48px] h-[48px] bg-[#F8FAFC] items-center flex justify-center">
            <Check />
          </div>
          <div className="text-[#666666] text-sm">
            Идэвхтэй мэдэгдэл байхгүй
          </div>
        </div>
      </div>
      <div className="w-full border-[#E2E8F0] border p-6 rounded-xl flex flex-col gap-6">
        <div>
          <div className="text-[#0B0B0D] font-semibold text-lg">
            Өмнөх мэдэгдлүүд
          </div>
          <div className="text-[#555555] text-sm">
            Шийдвэрлэгдсэн асуудлуудын түүх
          </div>
        </div>
        <div className="w-full bg-white border border-gray-200 rounded-xl p-6 flex items-start justify-between">
          <div className="flex gap-4">
            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg">
              <Macbook />
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  MacBook Pro 14
                </h2>
                <span className="flex items-center gap-1 text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  <CheckSmall />
                  Шийдвэрлэгдсэн
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-1">MAC-2026-005</p>

              <p className="text-gray-800 mt-4">
                <span className="font-medium">Шалтгаан:</span> Дэлгэцийн зүүн
                талд зураас гарч ирсэн
              </p>

              <div className="flex gap-6 text-sm text-gray-500 mt-4">
                <p>Мэдэгдсэн хугацаа: 11/15/2025</p>
                <p>Шийдвэрлэсэн хугацаа: 11/20/2025</p>
              </div>
            </div>
          </div>

          <div>
            <span className="text-sm border border-gray-200 text-gray-600 px-3 py-1 rounded-lg bg-gray-50">
              Техник хангамж
            </span>
          </div>
        </div>
        <div className="w-full bg-white border border-gray-200 rounded-xl p-6 flex items-start justify-between">
          <div className="flex gap-4">
            <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg">
              <Macbook />
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-gray-900">
                  Dell P2419H
                </h2>
                <span className="flex items-center gap-1 text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  <CheckSmall />
                  Шийдвэрлэгдсэн
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-1">MON-2024-008</p>

              <p className="text-gray-800 mt-4">
                <span className="font-medium">Шалтгаан:</span> Дэлгэцийн зүүн
                талд зураас гарч ирсэн
              </p>

              <div className="flex gap-6 text-sm text-gray-500 mt-4">
                <p>Мэдэгдсэн хугацаа: 10/5/2025</p>
                <p>Шийдвэрлэсэн хугацаа: 10/12/2025</p>
              </div>
            </div>
          </div>

          <div>
            <span className="text-sm border border-gray-200 text-gray-600 px-3 py-1 rounded-lg bg-gray-50">
              Гэмтэл
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
