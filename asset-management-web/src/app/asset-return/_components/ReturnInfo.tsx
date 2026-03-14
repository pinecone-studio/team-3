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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gilroy">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
        <div>
          <h1 className="text-[16px] font-medium">Буцаалтын явц</h1>

          <p className="text-[14px] font-normal  text-[#555555] mt-1">
            0 / 3 хөрөнгө буцаагдсан
          </p>
          <div className="h-[12px] mt-30 bg-gray-300  rounded-full overflow-hidden border border-gray-50">
            <div className="h-full transition-all  bg-gray-200 duration-500"></div>
          </div>
        </div>

        <div className="flex gap-8 mt-8">
          <div className="flex items-center gap-3">
            <div className="p-2  text-[#555555]  ">
              <Calendar size={18} />
            </div>

            <div>
              <p className="text-[10px] text-[#555555] uppercase font-normal tracking-tight">
                Сүүлчийн ажлын өдөр
              </p>
              <p className="text-sm font-medium">{lastWorkingDay}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2   text-[#555555] border-l-2 ">
              <Clock size={18} />
            </div>

            <div>
              <p className="text-[10px] text-[#555555] uppercase font-normal tracking-tight">
                Буцаах эцсийн хугацаа
              </p>
              <p className="text-sm font-medium ">{deadline}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h1 className="text-[16px] font-medium text-gray-800">
          Буцаах байршил
        </h1>

        <p className="text-[14px] text-[#555555] font-normal mt-1 mb-6">
          Хөрөнгө хүлээлгэж өгөх мэдээлэл
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-3   pb-2">
            <MapPin size={18} className="text-[#555555]" />
            <div>
              <p className="text-[#555555] font-normal text-[14px]">
                Хүлээлгэж өгөх байршил
              </p>
              <p className="text-[14px] text-black font-medium">
                {location.room}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <User size={18} className="text-[#555555]" />
            <div>
              <p className="text-[14px] text-[#555555] font-normal">
                Холбогдох хүн
              </p>
              <p className="text-black font-medium">{location.person}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone size={16} className="text-[#555555] " />
            <div>
              <p className="text-[14px] text-[#555555] font-normal">
                Утас {""}
              </p>
              <p className="text-black text-[14px] font-medium tracking-widest">
                {" "}
                {location.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
