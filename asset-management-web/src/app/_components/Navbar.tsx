import { SidebarTrigger } from "@/libs";

export default function Navbar() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-white px-4 sticky top-0 z-10">
      <SidebarTrigger className="-ml-1 " />
      <div className="flex items-center border-l pl-2  gap-2">
        <span className="text-sm font-medium text-[#020617] text-foreground">
          Ажилтан
        </span>
      </div>
    </header>
  );
}
