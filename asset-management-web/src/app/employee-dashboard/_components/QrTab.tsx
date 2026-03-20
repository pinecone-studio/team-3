import { DeviceIcon, PendingBadge, WarningTriangle } from "./icons";
import { QrItem } from "./mockData";

interface QrTabProps {
  items?: QrItem[];
  onOpenScanner: () => void;
}

export default function QrTab({ items = [], onOpenScanner }: QrTabProps) {
  const total = items.length;
  const done = 2;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Top progress card */}
      <div className="rounded-3xl border border-gray-200 bg-white p-4 sm:p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0">
          <div>
            <p className="text-[18px] font-semibold text-gray-900">
              Тооллогын баталгаажуулалт
            </p>
            <p className="mt-1 text-sm text-gray-500">
              2026 оны 1-р улирлын тооллогын явц
            </p>
          </div>

          <span className="whitespace-nowrap text-[18px] font-medium text-gray-800">
            {done} / {total} хөрөнгө
          </span>
        </div>

        <div className="h-2.5 w-full rounded-full bg-gray-200">
          <div
            className="h-2.5 rounded-full bg-blue-600 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Pending QR verification card */}
      <div className="rounded-3xl border border-gray-200 bg-[#F8FAFC] p-4 sm:p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="pt-0.5">
              <WarningTriangle size={22} />
            </div>

            <div>
              <p className="text-[18px] font-semibold text-gray-900">
                Хүлээгдэж буй баталгаажуулалт
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Төхөөрөмжүүдийг хүлээн авахын тулд QR уншуулан баталгаажуулна уу
              </p>
            </div>
          </div>

          <button
            onClick={onOpenScanner}
            className="flex w-full sm:w-auto justify-center items-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2 sm:px-5 sm:py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
              <path
                d="M0 3.591V.676C0 .486.064.326.192.196.32.065.479 0 .669 0H3.584c.19 0 .35.064.48.192.131.128.196.287.196.477V3.584c0 .19-.064.35-.192.48-.128.13-.287.196-.477.196H.676C.486 4.26.326 4.196.196 4.067.065 3.939 0 3.78 0 3.591zm.744-.075h2.772V.744H.744v2.772zm0 9.014h2.772V9.858H.744v2.672zm-.744.669V9.784c0-.19.064-.35.192-.48.128-.13.287-.196.477-.196h2.979c.19 0 .35.064.48.192.13.128.196.287.196.477v2.908c0 .19-.064.35-.192.48-.128.134-.287.196-.477.196H.676C.486 13.161.326 13.097.196 12.969.065 12.84 0 12.682 0 12.492zm9.683-8.901h2.772V.744H9.683v2.772zm-.744.075V.676c0-.19.064-.35.192-.48C9.26.065 9.418 0 9.608 0h2.915c.19 0 .35.064.48.192.13.128.196.287.196.477V3.584c0 .19-.064.35-.192.48-.128.13-.287.196-.477.196H9.615C9.425 4.26 9.266 4.196 9.135 4.067 9.004 3.939 8.939 3.78 8.939 3.591zM6.599 0H8.019v1.42H6.599V0zm6.6 11.779v1.42H11.779v-1.42h1.42zm-1.42 0V10.36H10.36v1.42h1.419zm-1.42-1.42V8.94H8.94v1.42h1.42zM8.939 8.94V7.519H7.519V8.94h1.42zm-1.42-1.421V6.1H6.1v1.42h1.42zM4.26 8.94V7.519H2.84V6.1H7.52V7.52H6.1V8.94H4.26zM7.52 6.1V4.68H6.1V3.26H8.94V4.68H7.52V6.1zM0 6.1V4.68h1.42V6.1H0zm0-1.42V3.26h1.42V4.68H0zM5.18 4.26V1.42H6.6V2.84H8.02V4.26H5.18z"
                fill="white"
              />
            </svg>
            QR Уншуулах
          </button>
        </div>

        {/* QR items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-3xl border border-gray-200 bg-white p-4 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                {/* Device icon */}
                <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center overflow-hidden rounded-2xl bg-[#F8FAFC]">
                  <DeviceIcon type={item.type || "monitor"} size={40} />
                </div>

                {/* Text content */}
                <div className="min-w-0 flex-1 flex flex-col gap-2">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="text-[18px] font-semibold text-gray-900">
                      {item.asset.assetTag}
                    </h3>
                    <PendingBadge />
                  </div>

                  <p className="text-sm text-gray-500">{item.code}</p>
                  <p className="mt-1 text-sm text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="my-5 h-px w-full bg-gray-200" />

              {/* Info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <p className="mb-1 text-sm text-gray-400">Нөхцөл</p>
                  <p className="text-[15px] font-semibold text-gray-900">
                    {item.location}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-sm text-gray-400">Олгосон огноо</p>
                  <p className="text-[15px] font-semibold text-gray-900">
                    {item.date}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-sm text-gray-400">Олгосон</p>
                  <p className="text-[15px] font-semibold text-gray-900">
                    {item.owner}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
