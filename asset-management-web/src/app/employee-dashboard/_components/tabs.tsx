

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Tabs({ activeTab, setActiveTab }: TabsProps) {
  const tabs = [
    { id: 'general', label: 'Хэрэглэгч' },
    { id: 'gar', label: 'Гарын үсэг баталгаажуулалт' },
    { id: 'qr', label: 'QR баталгаажуулалт' },
  ];

  return (
    <div className="flex gap-1 mb-6 border-b border-gray-300">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-6 py-3 text-sm font-medium transition-colors relative ${
            activeTab === tab.id
              ? 'text-blue-600'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
          )}
        </button>
      ))}
    </div>
  );
}