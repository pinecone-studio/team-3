// app/batalgaajuulalt/page.tsx
import type { Metadata } from "next";

import QrVerificationHeader from "@/app/qr/components/QrHeader";
import ProgressBar from "@/app/qr/components/ProgressBar";
import DeviceList from "@/app/qr/components/DeviceList";

export const metadata: Metadata = {
  title: "QR Баталгаажуулалт - AMS",
};

export default function BatalgaajuulaltPage() {
  return (
    <div className="flex h-screen bg-gray-50">
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-5xl">
          <QrVerificationHeader />

          <div className="mt-6 rounded-xl bg-white shadow-sm">
            <ProgressBar current={2} total={4} />

            <div className="p-6">
              <DeviceList />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}