import ActivityList from "./_components/ActivityList";
import AssetStatusChart from "./_components/AssetStatusChart";
import QuickActions from "./_components/QuickActions";
import AdminStatCard from "./_components/Stat-card";
import StatCard from "./_components/Stat-card";
import UpcomingTasks from "./_components/UpcomingTasks";

export default function AdminHomePage() {
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
    <div className="flex flex-col gap-8 p-8 bg-white min-h-screen">
      <div>
        <h1 className="font-bold text-[24px] text-gray-900 tracking-tight">
          Хянах самбар
        </h1>
        <p className="text-[14px] text-gray-500 mt-1">
          Хөрөнгийн удирдлагын системийн тойм
        </p>
      </div>

      <AdminStatCard />
      <div className="flex gap-[24px]">
        <AssetStatusChart />
        <UpcomingTasks />
      </div>

      <div className="flex gap-[24px]">
        <ActivityList />
        <QuickActions />
      </div>
    </div>
  );
}
