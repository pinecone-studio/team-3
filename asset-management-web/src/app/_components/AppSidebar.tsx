"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  cn,
} from "@/libs";
import {
  LayoutDashboard,
  AlertTriangle,
  Boxes,
  Settings,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
  {
    title: "Хянах самбар",
    icon: LayoutDashboard,
    path: "/employee-dashboard",
    badge: 1,
  },

  { title: "Асуудал мэдээлэх", icon: AlertTriangle, path: "/report" },
  { title: "Буцаалт", icon: Boxes, path: "/asset-return" },
  { title: "admin asset ", icon: Settings, path: "/admin/asset-page" },
];
export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Sidebar className="border-r border-slate-200 ">
      <SidebarHeader className="p-6 bg-[#17203F]">
        <div className="flex items-center gap-3 px-2">
          <div className="h-8 w-8  rounded-full bg-white  items-center justify-center" />
          <span className="font-bold text-lg text-white tracking-tight ">
            Assets.M.S
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-[#17203F] text-white px-0">
        <SidebarMenu>
          {menuItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <SidebarMenuItem key={item.title}>
                <div
                  onClick={() => item.path && router.push(item.path)}
                  className={cn(
                    "relative flex items-center gap-3 px-4 py-4 transition-all duration-300 rounded-none group",

                    isActive
                      ? "bg-gradient-to-r from-transparent via-[#1e293b]/50 to-[#3b82f6]/20"
                      : "hover:bg-white/5",
                  )}
                >
                  <item.icon
                    className={cn(
                      "w-5 h-5 transition-colors",
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-white",
                    )}
                  />

                  <span
                    className={cn(
                      "flex-1 font-medium text-[15px] transition-colors",
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-white",
                    )}
                  >
                    {item.title}
                  </span>

                  {isActive && (
                    <div className="absolute right-0 top-0 h-full w-[4px] bg-[#3B82F6] shadow-[-4px_0_15px_rgba(59,130,246,0.6)]" />
                  )}
                </div>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
