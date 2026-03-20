import { StatIcon } from './icons';

interface StatItem {
  label: string;
  value: number;
  sublabel: string;
  iconBg: string;
  type: string;
}
type infData = {
  label: string;
  value: number | null | undefined;
  sublabel: string;
  iconBg: string;
  type: string;
}[]
interface StatsCardsProps {
  stats: infData;
}

const iconColors: Record<string, string> = {
  cube: '#185FA5',
  doc: '#3B6D11',
  qr: '#BA7517',
  warning: '#A32D2D',
};

export default function StatsCards({ stats }: StatsCardsProps) {
  console.log(stats,'asdhoiu')
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 w-full">

      {stats.map((stat, i) => (
        <div
          key={i}
          className={`
            bg-white border border-gray-200 rounded-xl sm:rounded-2xl 
            p-3 sm:p-4 lg:p-6 
            shadow-sm hover:shadow transition-shadow duration-200
            flex flex-col justify-between min-h-[120px] sm:min-h-[140px]
          `}
        >
          {/* Header row: label + icon */}
          <div className="flex items-start justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
            <p
              className="
                font-gip text-xs sm:text-sm font-medium 
                leading-tight text-gray-900 
                line-clamp-2 flex-1
              "
            >
              {stat.label}
            </p>

            <div
              className="
                shrink-0 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 
                rounded-lg flex items-center justify-center
              "
              style={{ backgroundColor: stat.iconBg }}
            >
              <StatIcon
                type={stat.type}
                color={iconColors[stat.type]}
                // Assuming StatIcon accepts size prop; otherwise adjust inside component
                // className="w-5 h-5 sm:w-6 sm:h-6"
              />
            </div>
          </div>

          {/* Value - responsive sizing */}
          <p
            className="
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
              font-semibold text-gray-900 tracking-tight
              mb-1 sm:mb-2
            "
          >
            {stat?.value?.toLocaleString()} {/* nicer number formatting */}
          </p>

          {/* Sublabel */}
          <p className="text-xs sm:text-sm text-gray-500">
            {stat.sublabel}
          </p>
        </div>
      ))}
    </div>
  );
}