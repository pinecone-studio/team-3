import { DeviceIcon, PendingBadge, WarningTriangle } from './icons';
import { GarItem } from './mockData';

interface GarTabProps {
  items?: GarItem[];
}

export default function GarTab({ items = [] }: GarTabProps) {
  return (
    <div className="space-y-4">

      {/* Warning card */}
      <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm flex items-center gap-4">
        <WarningTriangle size={20} />
        <div className="flex-1 min-w-0">
          <p className="text-base font-semibold text-gray-900">Хүлээгдэж буй гарын үсэг</p>
          <p className="text-sm text-gray-500 mt-0.5">
           Төхөөрөмжүүдийг хүлээн авахын тулд гарын үсгээ зурж баталгаажуулна уу
          </p>
        </div>
        <button className="flex-shrink-0 flex items-center gap-2 bg-[#0251CB] hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path d="M12.151 3.484L10.471 1.804A2.667 2.667 0 009.333 1.333H4A1.333 1.333 0 002.667 2.667v10.666A1.333 1.333 0 004 14.667h8a1.333 1.333 0 001.333-1.334v-.299" stroke="white" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14.252 8.417a1.415 1.415 0 000-2.002 1.415 1.415 0 00-2.002 0L9.576 9.09a1.4 1.4 0 00-.338.568l-.558 1.914a.333.333 0 00.42.42l1.913-.558c.215-.063.411-.179.569-.337l2.67-2.68z" stroke="white" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.333 12H6" stroke="white" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Баталгаажуулалт
        </button>
      </div>

      {/* Item cards */}
      {items.map((item, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <DeviceIcon type={item.type} size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <span className="text-base font-semibold text-gray-900">{item.name}</span>
                <PendingBadge />
              </div>
              <p className="text-sm text-gray-500">{item.code}</p>
              <p className="text-sm text-gray-400">{item.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 pl-[56px]">
            <div>
              <p className="text-sm text-gray-400 mb-1">Нөхцөл</p>
              <p className="text-base font-medium text-gray-800">{item.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Олгосон огноо</p>
              <p className="text-base text-gray-800">{item.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Олгосон</p>
              <p className="text-base text-gray-800">{item.owner}</p>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}
