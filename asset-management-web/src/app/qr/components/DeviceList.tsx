const mockDevices = [
  {
    name: "MacBook Pro 14\"",
    code: "MAC-2026-005",
    date: "3/8/2026",
    status: "Баталгаажсан",
    isVerified: true,
    icon: "💻"
  },
  {
    name: "Dell UltraSharp 27\"",
    code: "MON-2026-012",
    date: "3/8/2026",
    status: "Баталгаажсан",
    isVerified: true,
    icon: "🖥"
  },
  {
    name: "MacBook Pro 14\"",
    code: "MAC-2026-006",
    description: "Зөөврийн компьютер",
    status: "Баталгаажуулах",
    isVerified: false,
    icon: "💻"
  },
  {
    name: "MacBook Pro 14\"",
    code: "MAC-2026-008",
    description: "Зөөврийн компьютер",
    status: "Баталгаажуулах",
    isVerified: false,
    icon: "💻"
  },
];

export default function DeviceList() {
  return (
    <div>
      <h2 className="text-base font-semibold text-black mb-2">
        Миний хөрөнгүүд
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Доорх хөрөнгүүд танд олгогдсон байгааг баталгаажуулна уу
      </p>

      <div className="space-y-3">
        {mockDevices.map((device, index) => (
          <div
            key={`${device.code}-${index}`}
            className={`flex items-center justify-between rounded-lg p-4 ${
              device.isVerified ? '' : 'bg-white'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-xl">
                {device.icon}
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-medium text-black text-sm">
                    {device.name}
                  </h3>
                  {device.isVerified && (
                    <span className="rounded  px-2 py-0.5 text-xs font-medium text-dark">
                      Баталгаажсан
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  {device.code}
                  {device.description && ` · ${device.description}`}
                </p>
                {device.date && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {device.date}
                  </p>
                )}
              </div>
            </div>

            {!device.isVerified && (
              <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Баталгаажуулаагүй
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}