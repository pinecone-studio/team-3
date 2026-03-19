export const StatCard = ({ title, value, change, label, iconType }: any) => {
  const colors: any = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    yellow: "bg-amber-50 text-amber-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <h4 className="text-gray-600 text-sm font-medium">{title}</h4>
        <div className={`p-2 rounded-lg ${colors[iconType]}`}>
          {/* Icon placeholder */}
        </div>
      </div>
      <div className="mt-4">
        <span className="text-3xl font-bold text-gray-800">{value}</span>
        <div className="flex items-center mt-1">
          <span
            className={`text-xs font-semibold mr-1 ${iconType === "red" ? "text-red-500" : "text-emerald-500"}`}
          >
            {change}
          </span>
          <span className="text-xs text-gray-400">{label}</span>
        </div>
      </div>
    </div>
  );
};
