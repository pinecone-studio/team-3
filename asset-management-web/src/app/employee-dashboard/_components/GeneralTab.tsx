import { DeviceIcon } from './icons';

interface Device {
  name: string;
  model: string;
  code: string;
  status: string;
  type: string;
}

interface Progress {
  label: string;
  sublabel: string;
  value: number;
  text: string;
}

interface HistoryItem {
  device: string;
  code: string;
  period: string;
  usage: string;
  status: string;
  type: string;
}

interface GeneralTabProps {
  devices: Device[];
  progress: Progress;
  history: HistoryItem[];
}

export default function GeneralTab({ devices, history }: GeneralTabProps) {
  return (
    <div className="space-y-8">

    
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Миний хөрөнгө</h3>
        <p className="text-sm text-gray-400 mb-4">Танд олгогдсон төхөөрөмжүүд</p>
        <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {devices.map((device, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <DeviceIcon type={device.type} size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-gray-900 truncate">{device.name}</p>
                    <p className="text-sm text-gray-400 truncate">{device.model} · {device.code}</p>
                  </div>
                </div>
                <p className="text-sm text-blue-600 font-medium">{device.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* History */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Түүх</h3>
        <p className="text-sm text-gray-400 mb-4">Өмнө хэрэглэж байсан төхөөрөмжүүд</p>
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">Төхөөрмж</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">Код</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">Хугацаа</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">Ашиглах</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">Буцаасан шалтгаан</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, i) => (
                <tr key={i} className={i !== history.length - 1 ? 'border-b border-gray-100' : ''}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <DeviceIcon type={item.type} size={18} />
                      <span className="text-base text-gray-900 whitespace-nowrap">{item.device}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-base text-gray-500 whitespace-nowrap">{item.code}</td>
                  <td className="px-6 py-4 text-base text-gray-500 whitespace-nowrap">{item.period}</td>
                  <td className="px-6 py-4 text-base text-gray-500 whitespace-nowrap">{item.usage}</td>
                  <td className="px-6 py-4 text-base text-gray-500 whitespace-nowrap">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
