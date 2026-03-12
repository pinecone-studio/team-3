"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  AvatarImage,
  AvatarFallback,
  Avatar,
} from "@/libs";
import {
  Package,
  QrCode,
  History,
  LayoutDashboard,
  PenTool,
  AlertTriangle,
  Undo2,
  Bell,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
  {
    title: "Хянах самбар",
    icon: LayoutDashboard,
    active: true,
    path: "/",
  },
  { title: "Миний хөрөнгө", icon: Package, path: "/my-asset" },
  { title: "Гарын үсэг", icon: PenTool, badge: 1, path: "/confirmation" },
  { title: "QR баталгаажуулалт", icon: QrCode, path: "/qr" },
  { title: "Асуудал мэдээлэх", icon: AlertTriangle, path: "/my-asset" },
  { title: "Түүх", icon: History },
];
export function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Sidebar className="border-r border-slate-200 bg-[#F8FAFC]">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3 px-2">
          <div className="h-8 w-8  rounded-full bg-black  items-center justify-center" />
          <span className="font-bold text-lg tracking-tight ">Assets.M.S</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarMenu className="">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <SidebarMenuItem className="" key={item.title}>
                <SidebarMenuButton
                  onClick={() => item.path && router.push(item.path)}
                  className={`flex  items-center gap-3 px-4 py-6  transition-all ${
                    item.active
                      ? "bg-slate-100/80 text-black font-medium"
                      : "text-slate-600 hover:bg-white"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1 font-medium text-[14px] text-[#222222] ">
                    {item.title}
                  </span>
                  {item.badge && (
                    <span className="bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-md">
                      {item.badge}
                    </span>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-4  font-medium text-gray-500 text-[10px] uppercase">
            Чөлөөлөлт
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => router.push("/asset-return")}
                className="flex items-center gap-3 px-4 py-6 "
              >
                <Undo2 className="w-5 h-5" />
                <span className="text-[14px] font-medium">Буцаалт</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 mt-auto w-[239px]">
        <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-2xl border border-slate-100">
          <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>ДБ</AvatarFallback>{" "}
          </Avatar>

          <div className="flex flex-col flex-1 ">
            <span className="text-sm font-semibold text-slate-900 truncate">
              Т. Энхжаргал
            </span>
            <span className="text-xs text-slate-500">Инженер</span>
          </div>
          <button className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <Bell className="w-4 h-4 text-slate-600" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
