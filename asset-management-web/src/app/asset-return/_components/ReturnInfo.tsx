import { Calendar, Clock, MapPin, User, Phone } from "lucide-react";

interface Location {
  room: string;
  person: string;
  phone: string;
}

interface ReturnInfoSectionProps {
  lastWorkingDay: string;
  deadline: string;
  location: Location;
  progress: { done: number; total: number };
}

export default function ReturnInfoSection({
  lastWorkingDay,
  deadline,
  location,
  progress,
}: ReturnInfoSectionProps) {
  const percentage = Math.min(
    Math.max((progress.done / progress.total) * 100, 0),
    100,
  );

  return (
    <div className="flex flex-col w-full gap-6 font-gilroy">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
        <div>
          <h1 className="font-medium text-[16px] leading-[20px] text-[#0F172A]">
            Буцаалтын явц
          </h1>
          <p className="text-[14px] font-normal text-gray-500 mt-1">
            {progress.done} / {progress.total} хөрөнгө буцаагдсан
          </p>

          <div className="relative w-full h-3 mt-4 bg-gray-100 rounded-full overflow-hidden border border-gray-50">
            <div
              className="h-full bg-blue-600 transition-all duration-700 ease-out rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                Сүүлчийн өдөр
              </p>
              <p className="text-sm font-medium text-gray-800">
                {lastWorkingDay}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-l pl-4 border-gray-100">
            <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
              <Clock size={18} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                Эцсийн хугацаа
              </p>
              <p className="text-sm font-medium text-gray-800">{deadline}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h1 className="font-medium text-[16px] leading-[20px] text-[#0F172A]">
          Буцаах байршил
        </h1>
        <p className="text-[14px] text-gray-500 font-normal mt-1 mb-6">
          Хөрөнгө хүлээлгэж өгөх дэлгэрэнгүй мэдээлэл
        </p>

        <div className="space-y-5">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <MapPin size={18} className="text-gray-400" />
            </div>
            <div>
              <p className="text-gray-400 font-normal text-[13px]">
                Хүлээлгэж өгөх байршил
              </p>
              <p className="text-[14px] text-gray-800 font-medium leading-relaxed">
                {location.room}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1">
              <User size={18} className="text-gray-400" />
            </div>
            <div>
              <p className="text-[13px] text-gray-400 font-normal">
                Холбогдох хүн
              </p>
              <p className="text-gray-800 font-medium">{location.person}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1">
              <Phone size={18} className="text-gray-400" />
            </div>
            <div>
              <p className="text-[13px] text-gray-400 font-normal">
                Холбоо барих утас
              </p>
              <p className="text-gray-800 font-medium tracking-wide">
                {location.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
