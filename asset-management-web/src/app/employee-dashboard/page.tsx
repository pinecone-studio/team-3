
'use client';

import { useState } from 'react';
import StatsCards from './_components/StatsCards';
import Tabs from './_components/tabs';
import GeneralTab from './_components/GeneralTab';
import GarTab from './_components/Signature';
import QrTab from './_components/QrTab';
import { mockStats, mockDevices, mockProgress, mockHistory } from './_components/mockData';

export default function AssetsPage() {
  const [activeTab, setActiveTab] = useState('gar');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-6 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Сайн байна уу, Булгантуяа</h1>
          <p className="text-sm text-gray-500">Таны хариулах хүртгэлийн төхөөм</p>
        </div>
        
        <StatsCards stats={mockStats} />
        
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mt-6">
          {activeTab === 'general' && (
            <GeneralTab 
              devices={mockDevices} 
              progress={mockProgress} 
              history={mockHistory} 
            />
          )}

          {activeTab === 'gar' && (
            <GarTab />
          )}

          {activeTab === 'qr' && (
            <QrTab />
          )}
        </div>
      </div>
    </div>
  );
}