
export default function ProgressBar({ current, total }: { current: number; total: number }) {
  const percentage = (current / total) * 100;

  return (
    <div className="border-b border-gray-200 px-6 py-4">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">
          2025 оны 1-р улирлын тоологдож буй төхөөрөмжүүд
        </span>
        <span className="text-gray-500">
          {current}/{total} хэрэгсэл
        </span>
      </div>

      <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full bg-green-500 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}