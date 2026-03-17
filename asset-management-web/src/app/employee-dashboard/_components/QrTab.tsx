import { DeviceIcon, PendingBadge, WarningTriangle } from './icons';
import { QrItem } from './mockData';

interface QrTabProps {
  items?: QrItem[];
}

export default function QrTab({ items = [] }: QrTabProps) {
  const total = items.length;
  const done = 2;
  const pct = total > 0 ? Math.round((done / total) * 100) : 50;

  return (
    <div className="space-y-16">

      {/* Progress header */}
      <div className="space-y-10">
        <div className="flex items-start  justify-between">
          <div>
            <p className="text-base font-semibold text-gray-900">Тооллогын баталгаажуулалт</p>
            <p className="text-sm text-gray-400 mt-0.5">2026 оны 1-р улирлын тооллогын явц</p>
          </div>
          <span className="text-base font-medium text-gray-600 whitespace-nowrap">
            {done} / {total} хөрөнгө
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-blue-600 rounded-full transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Warning banner */}
      <div className="flex items-center gap-4">
        <WarningTriangle size={22} />
        <div className="flex-1 min-w-0">
          <p className="text-base font-semibold text-gray-900">Хүлээгдэж буй баталгаажуулалт</p>
          <p className="text-sm text-gray-500 mt-0.5">
            Төхөөрөмжүүдийг хүлээн авахын тулд QR уншуулан баталгаажуулна уу
          </p>
        </div>
        <button className="flex-shrink-0 flex items-center gap-2 bg-[#0251CB] hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M0 3.591V.676C0 .486.064.326.192.196.32.065.479 0 .669 0H3.584c.19 0 .35.064.48.192.131.128.196.287.196.477V3.584c0 .19-.064.35-.192.48-.128.13-.287.196-.477.196H.676C.486 4.26.326 4.196.196 4.067.065 3.939 0 3.78 0 3.591zm.744-.075h2.772V.744H.744v2.772zm0 9.014h2.772V9.858H.744v2.672zm-.744.669V9.784c0-.19.064-.35.192-.48.128-.13.287-.196.477-.196h2.979c.19 0 .35.064.48.192.13.128.196.287.196.477v2.908c0 .19-.064.35-.192.48-.128.134-.287.196-.477.196H.676C.486 13.161.326 13.097.196 12.969.065 12.84 0 12.682 0 12.492zm9.683-8.901h2.772V.744H9.683v2.772zm-.744.075V.676c0-.19.064-.35.192-.48C9.26.065 9.418 0 9.608 0h2.915c.19 0 .35.064.48.192.13.128.196.287.196.477V3.584c0 .19-.064.35-.192.48-.128.13-.287.196-.477.196H9.615C9.425 4.26 9.266 4.196 9.135 4.067 9.004 3.939 8.939 3.78 8.939 3.591zM6.599 0H8.019v1.42H6.599V0zm6.6 11.779v1.42H11.779v-1.42h1.42zm-1.42 0V10.36H10.36v1.42h1.419zm-1.42-1.42V8.94H8.94v1.42h1.42zM8.939 8.94V7.519H7.519V8.94h1.42zm-1.42-1.421V6.1H6.1v1.42h1.42zM4.26 8.94V7.519H2.84V6.1H7.52V7.52H6.1V8.94H4.26zM7.52 6.1V4.68H6.1V3.26H8.94V4.68H7.52V6.1zM0 6.1V4.68h1.42V6.1H0zm0-1.42V3.26h1.42V4.68H0zM5.18 4.26V1.42H6.6V2.84H8.02V4.26H5.18z" fill="white" />
          </svg>
          QR Уншуулах
        </button>
      </div>

      {/* Items — no card, dividers only */}
      <div className="divide-y divide-gray-100">
        {items.map((item, i) => (
          <div key={i} className="py-5 space-y-4">

            {/* Device row */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
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

            {/* Meta */}
            <div className="grid grid-cols-3 gap-6 pl-[60px]">
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

    </div>
  );
}
