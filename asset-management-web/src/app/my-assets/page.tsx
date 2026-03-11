import { AssetListItem } from "./_components/AssetListItem";
import StatCard from "./_components/Stat-card";

export default function MyAssetsPage() {
  const assets = [
    {
      name: 'MacBook Pro 14"',
      specs: "M3 Pro, 18GB RAM, 512GB SSD",
      serial: "MAC-2026-005",
      subSerial: "C02G9XXXJG5H",
      iconType: "laptop",
      status: "Хуваарилагдсан",
      condition: "Хэвийн",
      date: "2026.01.15",
    },
    {
      name: 'Dell UltraSharp 27"',
      specs: "4K UHD, USB-C",
      serial: "MON-2026-012",
      subSerial: "CN0XXXDLT418",
      iconType: "monitor",
      status: "Хуваарилагдсан",
      condition: "Хэвийн",
      date: "2026.01.15",
    },
    {
      name: "iPhone 15 Pro",
      specs: "256GB, Natural Titanium",
      serial: "PHN-2026-003",
      subSerial: "DNPXXX2Q5MKL",
      iconType: "smartphone",
      status: "Хуваарилагдсан",
      condition: "Хэвийн",
      date: "2026.02.01",
    },
    {
      name: "Magic Keyboard",
      specs: "Touch ID, Numeric Keypad",
      serial: "PER-2026-008",
      subSerial: "FVFXXXQ1G5YK",
      iconType: "keyboard",
      status: "Баталгаажуулах",
      condition: "Шинэ",
      date: "2026.03.08",
    },
  ];

  return (
    <div className="flex flex-col gap-8 p-6 bg-[#F9FAFB] min-h-screen">
      <div>
        <h1 className="font-bold text-[28px] text-gray-900">Миний хөрөнгө</h1>
        <p className="text-[14px] text-gray-500">
          Танд олгогдсон бүх төхөөрөмжүүдийн жагсаалт
        </p>
      </div>

      <StatCard />

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="font-bold text-[16px] text-gray-900">
            Хөрөнгийн жагсаалт
          </h2>
          <p className="text-[13px] text-gray-400">
            Таны хариуцлагад байгаа бүх төхөөрөмжүүд
          </p>
        </div>

        <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_1fr_40px] gap-4 pb-4 border-b border-gray-100 mb-2">
          <div className="text-[13px] font-bold text-gray-800">Төхөөрөмж</div>
          <div className="text-[13px] font-bold text-gray-800">
            Код / Серийн дугаар
          </div>
          <div className="text-[13px] font-bold text-gray-800">Төлөв</div>
          <div className="text-[13px] font-bold text-gray-800">Нөхцөл</div>
          <div className="text-[13px] font-bold text-gray-800">
            Олгосон огноо
          </div>
          <div></div>
        </div>

        <div className="flex flex-col">
          {assets.map((asset, index) => (
            <AssetListItem key={index} data={asset} />
          ))}
        </div>
      </div>
    </div>
  );
}
