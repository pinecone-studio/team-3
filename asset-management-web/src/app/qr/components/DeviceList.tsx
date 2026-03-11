
const mockDevices = [
  {
    name: "MacBook Pro 14\"",
    code: "MAC-2025-005",
    date: "3/30/2025",
    status: "Баталгаажсан",
    isVerified: true,
  },
  {
    name: "Dell UltraSharp 27\"",
    code: "MON-2025-012",
    date: "3/30/2025 → 3/30/2026",
    status: "Баталгаажсан",
    isVerified: true,
  },
  {
    name: "iPhone 15 Pro",
    code: "PHN-2025-003",
    date: "",
    status: "Баталгаажуулах",
    isVerified: false,
  },
  {
    name: "Magic Keyboard",
    code: "PER-2025-008",
    date: "",
    status: "Баталгаажуулах",
    isVerified: false,
  },
];

export default function DeviceList() {
  return (
    <div className="space-y-4">
      {mockDevices.map((device) => (
        <div
          key={device.code}
          className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:border-gray-300"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-xl">
              {device.name.includes("MacBook") || device.name.includes("iPhone")
                ? ""
                : "🖥"}
            </div>

            <div>
              <h3 className="font-medium text-gray-900">{device.name}</h3>
              <p className="text-sm text-gray-500">{device.code}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {device.date && (
              <span className="text-sm text-gray-600">{device.date}</span>
            )}

            {device.isVerified ? (
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                Баталгаажсан
              </span>
            ) : (
              <button className="rounded-lg border border-green-600 px-4 py-1.5 text-sm font-medium text-green-700 hover:bg-green-50">
                Баталгаажуулах
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}