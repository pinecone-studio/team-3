import React from "react";
import { StatCard } from "./_components/StatCard";
import { QuickActionCard } from "./_components/QuickActionCard";
import { TaskList } from "./_components/TaskList";
import { RecentActivity } from "./_components/RecentActivity";

export const STATS_DATA = [
  {
    title: "Нийт хөрөнгө",
    value: 156,
    change: "+12",
    label: "өмнөх сараас",
    iconType: "blue",
  },
  {
    title: "Хуваарилагдсан",
    value: 128,
    change: "82%",
    label: "хуваарилалтын хувь",
    iconType: "green",
  },
  {
    title: "Идэвхтэй тооллого",
    value: 2,
    change: "45",
    label: "баталгаажуулалт хүлээгдэж буй",
    iconType: "yellow",
  },
  {
    title: "Хүлээгдэж буй",
    value: 8,
    change: "-3",
    label: "өчигдрөөс",
    iconType: "red",
  },
];

export const QUICK_ACTIONS = [
  { title: "Хөрөнгө бүртгэх", desc: "Шинэ хөрөнгө нэмэх", icon: "Plus" },
  { title: "QR Скан хийх", desc: "Хайх болон баталгаажуулах", icon: "QrCode" },
  { title: "Тайлан үүсгэх", desc: "Хөрөнгийн дата экспорт", icon: "FileText" },
  {
    title: "Тооллого эхлүүлэх",
    desc: "Шинэ тооллого үүсгэх",
    icon: "ClipboardCheck",
  },
  { title: "Чөлөөлөлт", desc: "Ажилтны ажлаас гарах үед", icon: "UserMinus" },
  { title: "QR шошго хэвлэх", desc: "Шошгоны хуудас татах", icon: "Download" },
];
export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content - Баруун талын хэсэг */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Хянах самбар</h1>
          <p className="text-gray-500">Хөрөнгийн удирдлагын системийн тойм</p>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {/* Stats Cards */}
          <div className="col-span-8 grid grid-cols-2 gap-4">
            {STATS_DATA.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="col-span-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-semibold mb-4 text-gray-800">
              Хялбар үйлдлүүд
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {QUICK_ACTIONS.map((action, idx) => (
                <QuickActionCard key={idx} {...action} />
              ))}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="col-span-7">
            <TaskList />
          </div>

          {/* Recent Activity */}
          <div className="col-span-5">
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  );
}
