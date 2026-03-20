"use client";
import { SidebarTrigger } from "@/libs";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const pageTitles: Record<string, string> = {
    "/employee-dashboard": "Хянах самбар",
    "/report": "Асуудал мэдээлэх",
    "/asset-return": "Буцаалт",
    "/employee": "Ажилтан",
    "/asset-page": "Бүх хөрөнгүүд",
    "/category": "Ангилал",
    "/sub-category": "Дэд ангилал",
    "/issue-resolution": "Асуудал шийдвэрлэх",
  };
  const currentTitle = pageTitles[pathname] || "Ажилтны портал";

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-white px-4 sticky top-0 z-10">
      <SidebarTrigger className="-ml-1 " />
      <div className="flex items-center justify-between w-full">
        <span className="text-sm font-medium text-slate-600">
          {currentTitle}
        </span>
        <UserButton />
      </div>
    </header>
  );
}
