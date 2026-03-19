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
 <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8 w-full">
      {stats.map((stat, i) => (
       <div key={i} className="bg-white border border-gray-200 rounded-2xl p-3 sm:p-6 shadow-sm min-w-0">
         <div className="flex items-start justify-between mb-4 min-w-0 gap-1 ">
       <p className="font-gip text-sm font-medium leading-[125%] text-black pr-2 break-words">
  {stat.label}
</p>
          <div
 className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
  style={{ backgroundColor: stat.iconBg }}
>
              <StatIcon type={stat.type} color={iconColors[stat.type]} />
            </div>
          </div>
          <p className="text-3xl sm:text-5xl font-semibold text-dark-900 mb-1">{stat.value}</p>
          <p className="text-sm text-[#888888]">{stat.sublabel}</p>
        </div>
      ))}
    </div>
  );
}
