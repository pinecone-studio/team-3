import { StatIcon } from './icons';

interface StatItem {
  label: string;
  value: number;
  sublabel: string;
  iconBg: string;
  type: string;
}

interface StatsCardsProps {
  stats: StatItem[];
}

const iconColors: Record<string, string> = {
  cube: '#185FA5',
  doc: '#3B6D11',
  qr: '#BA7517',
  warning: '#A32D2D',
};

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
       <p className="font-gip text-base font-medium leading-[125%] text-black pr-2">
  {stat.label}
</p>
            <div
              className="flex-shrink-0 w-[40px] h-[40px] rounded-xl flex items-center justify-center"
              style={{ backgroundColor: stat.iconBg }}
            >
              <StatIcon type={stat.type} color={iconColors[stat.type]} />
            </div>
          </div>
          <p className="text-5xl font-semibold text-dark-900 mb-1">{stat.value}</p>
          <p className="text-sm text-[#888888]">{stat.sublabel}</p>
        </div>
      ))}
    </div>
  );
}
