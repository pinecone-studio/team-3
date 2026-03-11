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
}: ReturnInfoSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
        <div>
          <h1 className="text-[16px] font-bold">Буцаалтын явц</h1>

          <p className="text-[14px] text-gray-500 mt-1">
            0 / 3 хөрөнгө буцаагдсан
          </p>

          <div className="w-full bg-gray-100 h-2 rounded-full mt-4 overflow-hidden border border-gray-50">
            <div className="h-full transition-all bg-[#00713A33] duration-500"></div>
          </div>
        </div>

        <div className="flex gap-8 mt-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-lg text-gray-400 border border-gray-100">
              <Calendar size={18} />
            </div>

            <div>
              <p className="text-[10px] text-gray-400 uppercase font-medium tracking-tight">
                Сүүлчийн ажлын өдөр
              </p>
              <p className="text-sm font-medium">{lastWorkingDay}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-lg text-gray-400 border border-gray-100">
              <Clock size={18} />
            </div>

            <div>
              <p className="text-[10px] text-gray-400 uppercase font-medium tracking-tight">
                Буцаах эцсийн хугацаа
              </p>
              <p className="text-sm font-medium text-red-500">{deadline}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h1 className="text-[16px] font-medium text-gray-800">
          Буцаах байршил
        </h1>

        <p className="text-[14px] text-gray-500 mt-1 mb-6">
          Хөрөнгө хүлээлгэж өгөх мэдээлэл
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b-1 pb-2">
            <MapPin size={18} className="text-gray-400" />
            <p className="text-[14px] font-medium">{location.room}</p>
          </div>

          <div className="flex items-center gap-3">
            <User size={18} className="text-gray-400" />
            <p className="text-[16px] text-gray-600 font-medium">
              Холбогдох хүн:
              <span className="text-black font-medium">{location.person}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Phone size={18} className="text-gray-400" />
            <p className="text-[16px] text-gray-600 font-medium">
              Утас: {""}
              <span className="text-[14px] font-medium tracking-widest">
                {" "}
                {location.phone}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
