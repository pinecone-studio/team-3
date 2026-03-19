// export default function AdminLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <div className="flex flex-col flex-1 min-h-screen">
//       <main className="">{children}</main>
//     </div>
//   );

import { Toaster } from "@/libs";

// }
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <main>{children}</main>
      <Toaster />
    </div>
  );
}