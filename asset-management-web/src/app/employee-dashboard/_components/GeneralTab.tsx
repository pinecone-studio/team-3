

interface Device {
  name: string;
  model: string;
  code: string;
  status: string;
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
}

interface GeneralTabProps {
  devices: Device[];
  progress: Progress;
  history: HistoryItem[];
}

export default function GeneralTab({ devices, progress, history }: GeneralTabProps) {
  return (
    <div className="max-w-7xl">
      <div className="space-y-8">
      
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Миний хэрэглээ</h3>
          <p className="text-sm text-gray-500 mb-4">Таны сонгосон төхөөрөмжүүд</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {devices.map((device, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl">💻</div>
                  <div>
                    <p className="text-base font-semibold text-gray-900">{device.name}</p>
                    <p className="text-sm text-gray-500">{device.model} - {device.code}</p>
                  </div>
                </div>
                <span className="text-base text-gray-600">{device.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-3xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{progress.label}</h3>
          <p className="text-sm text-gray-500 mb-4">{progress.sublabel}</p>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all"
              style={{ width: `${progress.value}%` }}
            ></div>
          </div>
          <p className="text-base text-gray-600 text-right">{progress.text}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Түүх</h3>
          <p className="text-sm text-gray-500 mb-4">Өнөө хүртэл бүртгэгдсэн төхөөрөмжүүд</p>
          
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-base">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">Төхөөрөмж</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">Код</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">Хугацаа</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">Ашиглах</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 whitespace-nowrap">Бүртгэсэн ашиглалт</th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {history.map((item, index) => (
                    <tr
                      key={index}
                      className={`${index !== history.length - 1 ? 'border-b border-gray-200' : ''}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">💻</span>
                          <span className="text-base text-gray-900 whitespace-nowrap">{item.device}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-base text-gray-600 whitespace-nowrap">{item.code}</td>
                      <td className="px-6 py-4 text-base text-gray-600 whitespace-nowrap">{item.period}</td>
                      <td className="px-6 py-4 text-base text-gray-600 whitespace-nowrap">{item.usage}</td>
                      <td className="px-6 py-4 text-base text-gray-600 whitespace-nowrap">{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}