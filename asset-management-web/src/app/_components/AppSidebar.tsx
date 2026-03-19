"use client";

import {
  useGetAdminEmployeesQuery,
  useGetEmployeeByIdQuery,
} from "@/gql/graphql";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  cn,
} from "@/libs";
import { useUser } from "@clerk/nextjs";
import {
  LayoutDashboard,
  AlertTriangle,
  Boxes,
  Settings,
  User,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEmployee } from "../_providers/user-provider";

export function AppSidebar() {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const employeeId = "-H7_24M85L-FMHKpkv4gp";

  const { data, loading } = useGetEmployeeByIdQuery({
    variables: {
      getEmployeeByIdId: employeeId!,
    },
    skip: !employeeId,
  });

  const currentEmployee = data?.getEmployeeById;

  const hasTerminationEmployee = Boolean(currentEmployee?.terminationDate);

  const isAdmin = employee?.role === EmployeeRole.Admin;

  const menuItems = [
    {
      title: "Хянах самбар",
      icon: LayoutDashboard,
      path: "/employee-dashboard",
    },
    { title: "Асуудал мэдээлэх", icon: AlertTriangle, path: "/report" },
    ...(hasTerminationEmployee
      ? [{ title: "Буцаалт", icon: Boxes, path: "/asset-return" }]
      : []),
    { title: "Ажилтан", icon: Settings, path: "/admin/employee" },
  ];

  const adminItems = [
    { title: "Бүх хөрөнгүүд", icon: Settings, path: "/asset-page" },
    { title: "Ангилал", icon: Settings, path: "/category" },
    { title: "дэд ангилал", icon: Settings, path: "/sub-category" },
  ];

  const renderMenuItems = (items: typeof menuItems) =>
    items.map((item) => {
      const isActive = pathname === item.path;
      return (
        <SidebarMenuItem key={item.title}>
          <div
            onClick={() => item.path && router.push(item.path)}
            className={cn(
              "relative flex items-center gap-3 px-4 py-4 transition-all duration-300 rounded-none group cursor-pointer",
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
    });

  return (
    <Sidebar className="border-r border-slate-200">
      <SidebarHeader className="p-6 bg-[#17203F]">
        <div className="flex items-center gap-3 px-2">
          <div className="h-8 w-8 rounded-full bg-white items-center justify-center" />
          <span className="font-bold text-lg text-white tracking-tight">
            Assets.M.S
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-[#17203F] text-white px-0">
        <div>
          <p className="px-6 py-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Цэс
          </p>
          <SidebarMenu>{renderMenuItems(menuItems)}</SidebarMenu>
        </div>

        {isAdmin && (
          <div className="mt-4 border-t border-white/10 pt-4">
            <p className="px-6 py-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
              Admin үйлдэлүүд
            </p>
            <SidebarMenu>{renderMenuItems(adminItems)}</SidebarMenu>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
