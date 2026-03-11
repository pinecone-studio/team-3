import Link from "next/link"
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
  SidebarMenuBadge,
} from "@/libs";
import {
  Home,
  Package,
  CheckSquare,
  QrCode,
  AlertCircle,
  History,
  RotateCcw,
  ShieldCheck,
  Settings,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";

export function AppSidebar() {
  const router = useRouter();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 border-b">
        <div className="flex gap-2 flex-col justify-center">
          <div>
            <div className="   text-auto font-bold">AMS</div>
            <div className="text-gray-400 ">Ажилтны портал</div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Цэс</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>
                <Home />
                Нүүр
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => router.push("/my-assets")}>
                <Package /> Миний хөрөнгө
              </SidebarMenuButton>
              <SidebarMenuBadge className="bg-gray-200 text-gray-800">
                4
              </SidebarMenuBadge>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/confirmation">
               <SidebarMenuButton>
               <CheckSquare /> Баталгаажуулалт
                </SidebarMenuButton>
                </Link>
              <SidebarMenuBadge className="bg-red-500 text-white">
                1
              </SidebarMenuBadge>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <QrCode /> QR баталгаажуулалт
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <AlertCircle /> Асуудал мэдэгдэх
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <History /> Түүх
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="border-t ">
          <SidebarGroupLabel>Хэрэгсэл</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <User /> Админ портал
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Settings /> Тохиргоо
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="border-t">
          <SidebarGroupLabel>Чөлөөлөлт</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem className="bg-red-50/50 text-red-700 rounded-md">
              <SidebarMenuButton className="">
                <RotateCcw /> Буцаалт
              </SidebarMenuButton>
              <SidebarMenuBadge className="text-white border bg-red-500">
                3
              </SidebarMenuBadge>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t pb-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
            <User size={20} className="text-slate-400" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold">Т. Энхжаргал</div>
            <div className="text-xs text-slate-500">Инженер</div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
