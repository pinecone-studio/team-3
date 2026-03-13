"use client";

import { MacBook } from "../_components/icons/icons";

export default function HistoryHomePage() {
  const stats = [
    { title: "Одоо хэрэглэж буй", number: 4 },
    { title: "Өмнө хэрэглэсэн", number: 3 },
    { title: "Нийт ашигласан", number: 7 },
  ];

  const currentAssets = [
    {
      name: 'MacBook Pro 14"',
      code: "MAC-2026-005",
      icon: MacBook(),
      assignedDate: "2026.01.15",
      duration: "Одоо хүртэл",
      status: "Идэвхтэй",
    },
    {
      name: 'Dell UltraSharp 27"',
      code: "MON-2026-012",
      icon: MacBook(),
      assignedDate: "2026.01.15",
      duration: "Одоо хүртэл",
      status: "Идэвхтэй",
    },
    {
      name: "iPhone 15 Pro",
      code: "PHN-2026-005",
      icon: MacBook(),
      assignedDate: "2026.02.01",
      duration: "Одоо хүртэл",
      status: "Идэвхтэй",
    },
    {
      name: "Magic Keyboard",
      code: "PER-2026-008",
      icon: MacBook(),
      assignedDate: "2026.03.08",
      duration: "Одоо хүртэл",
      status: "Идэвхтэй",
    },
  ];

  const previousAssets = [
    {
      name: 'MacBook Air 13"',
      code: "MAC-2024-012",
      icon: MacBook(),
      period: "2024.03.01 → 2026.01.14",
      used: "1 жил 10 сар",
      reason: "Шинэчлэлт",
    },
    {
      name: "Dell P2419H",
      code: "MON-2024-008",
      icon: MacBook(),
      period: "2024.03.01 → 2026.01.14",
      used: "1 жил 10 сар",
      reason: "Шинэчлэлт",
    },
    {
      name: "iPhone 13",
      code: "PHN-2024-005",
      icon: MacBook(),
      period: "2024.05.15 → 2026.01.31",
      used: "1 жил 10 сар",
      reason: "Шинэчлэлт",
    },
  ];

  function StatusBadge({ text }: { text: string }) {
    return (
      <span className="inline-flex rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-600">
        {text}
      </span>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Хөрөнгийн түүх</h1>
        <p className="mt-1 text-sm text-gray-500">
          Таны өмнө ашиглаж байсан болон одоо ашиглаж буй хөрөнгүүд
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {stats.map((item, i) => (
          <div
            key={i}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-gray-500">{item.title}</p>
            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              {item.number}
            </h2>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Одоо хэрэглэж буй
          </h2>
          <p className="text-sm text-gray-500">
            Таны хэрэглэж буй төхөөрөмжүүд
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-left text-sm ">
                <th className="py-3 font-medium">Төхөөрөмж</th>
                <th className="py-3 font-medium">Код</th>
                <th className="py-3 font-medium">Олгосон огноо</th>
                <th className="py-3 font-medium">Хугацаа</th>
                <th className="py-3 font-medium">Төлөв</th>
              </tr>
            </thead>
            <tbody>
              {currentAssets.map((item, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-4 text-sm text-gray-900">{item.icon}</td>

                  <td className="py-4 text-sm text-gray-900">{item.name}</td>
                  <td className="py-4 text-sm text-gray-600">{item.code}</td>
                  <td className="py-4 text-sm text-gray-600">
                    {item.assignedDate}
                  </td>
                  <td className="py-4 text-sm text-gray-600">
                    {item.duration}
                  </td>
                  <td className="py-4">
                    <StatusBadge text={item.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Өмнө хэрэглэсэн
          </h2>
          <p className="text-sm text-gray-500">Буцааж өгсөн төхөөрөмжүүд</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-left text-sm ">
                <th className="py-3 font-medium">Төхөөрөмж</th>
                <th className="py-3 font-medium">Код</th>
                <th className="py-3 font-medium">Хугацаа</th>
                <th className="py-3 font-medium">Ашигласан</th>
                <th className="py-3 font-medium">Буцаасан шалтгаан</th>
              </tr>
            </thead>
            <tbody>
              {previousAssets.map((item, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-4 text-sm text-gray-900">{item.icon}</td>
                  <td className="py-4 text-sm text-gray-900">{item.name}</td>
                  <td className="py-4 text-sm text-gray-600">{item.code}</td>
                  <td className="py-4 text-sm text-gray-600">{item.period}</td>
                  <td className="py-4 text-sm text-gray-600">{item.used}</td>
                  <td className="py-4">
                    <StatusBadge text={item.reason} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
