interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Tabs({ activeTab, setActiveTab }: TabsProps) {
  const tabs = [
    { id: 'general', label: 'Хөрөнгө', badge: null },
    { id: 'gar', label: 'Гарын үсэг баталгаажуулалт', badge: null},
    { id: 'qr', label: 'QR баталгаажуулалт', badge: null },
  ];

  return (
   <div className="flex border-b border-gray-200 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-3 sm:px-5 py-3 sm:py-3.5 text-xs sm:text-base relative whitespace-nowrap transition-colors ${
            activeTab === tab.id
              ? 'text-blue-600 font-medium'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          {tab.label}
          {tab.badge !== null && (
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-semibold">
              {tab.badge}
            </span>
          )}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600" />
          )}
        </button>
      ))}
    </div>
  );
}
