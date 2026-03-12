export default function ProgressBar({ current, total }: { current: number; total: number }) {
  const percentage = (current / total) * 100;

  return (
    <div className="border-b border-gray-200 px-6 py-6">
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="text-gray-700">
          2026 оны 1-р улирлын тоолого
        </span>
        <span className="text-gray-500">
          {current} / {total} хэрэгсэл
        </span>
      </div>

      <div className="mb-2 text-xs text-gray-600">
        Баталгаажуулалтын явц
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full bg-black transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}