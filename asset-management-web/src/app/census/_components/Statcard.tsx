import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { Stat } from './mockdata';

export default function StatCard({ stat }: { stat: Stat }) {
  const colorMap = {
    active: 'bg-blue-50 text-blue-600',
    success: 'bg-green-50 text-green-600',
    warning: 'bg-yellow-50 text-yellow-600',
    pending: 'bg-red-50 text-red-600'
  };

  const iconMap = {
    active: <div className="w-5 h-5 border-2 rounded-full" />,
    success: <CheckCircle size={18} />,
    warning: <AlertTriangle size={18} />,
    pending: <Clock size={18} />
  };

  return (
    <div className="bg-white border rounded-xl p-5">
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm text-gray-600">{stat.label}</p>

        <div className={`p-2 rounded-lg ${colorMap[stat.type]}`}>
          {iconMap[stat.type]}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900">
        {stat.value}
      </h2>

      <p className="text-xs text-gray-500 mt-1">
        {stat.subtext}
      </p>
    </div>
  );
}