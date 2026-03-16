import { SidebarTrigger } from "@/libs";
import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-white px-4 sticky top-0 z-10">
      <SidebarTrigger className="-ml-1 " />
      <div className="flex items-center justify-between w-full">
        <span className="text-sm font-medium text-slate-600">
          Ажилтны портал
        </span>
        <UserButton/>
      </div>
    
    </header>
  );
}
