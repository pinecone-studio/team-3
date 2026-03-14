"use client";
import ActivityList from "./_components/ActivityList";
import AssetStatusChart from "./_components/AssetStatusChart";
import QuickActions from "./_components/QuickActions";
import AdminStatCard from "./_components/Stat-card";
import UpcomingTasks from "./_components/UpcomingTasks";

export default function AdminHomePage() {
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
