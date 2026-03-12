import type { Metadata } from "next";

import QrVerificationHeader from "@/app/qr/components/QrHeader";
import ProgressBar from "@/app/qr/components/ProgressBar";
import DeviceList from "@/app/qr/components/DeviceList";

export const metadata: Metadata = {
  title: "QR Баталгаажуулалт - AMS",
};

export default function BatalgaajuulaltPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="w-full px-8 py-8">
        <QrVerificationHeader />

        <div className="mt-6 rounded-2xl bg-white shadow-sm">
          <ProgressBar current={2} total={4} />

          <div className="p-8">
            <DeviceList />
          </div>
        </div>
      </main>
    </div>
  );
}