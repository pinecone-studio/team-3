interface Stat {
  label: string;
  value: number;
}

interface StatsCardsProps {
  stats: Stat[];
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
        >
          <p className="text-base text-gray-500 mb-2">
            {stat.label}
          </p>

          <p className="text-4xl font-bold text-gray-800">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}