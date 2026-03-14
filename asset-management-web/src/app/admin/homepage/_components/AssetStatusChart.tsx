
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Хуваарилагдсан", value: 65, color: "#000000" },
  { name: "Сул", value: 15, color: "#666666" },
  { name: "Засварт", value: 10, color: "#999999" },
  { name: "Актлах", value: 5, color: "#CCCCCC" },
  { name: "Актлагдсан", value: 5, color: "#E5E5E5" },
];

export default function AssetStatusChart() {
  return (
    <div className="bg-white border  border-gray-200 rounded-2xl p-8 w-full w-full  shadow-xs flex flex-col">
      <div className="mb-8">
        <h3 className="text-[16px] font-medium text-[#000000]">
          Хөрөнгийн төлөв
        </h3>
        <p className="text-[14px] font-normal text-[#555555] mt-1">
          Бүх хөрөнгийн одоогийн төлөв
        </p>
      </div>

      <div className="flex flex-1 w-[455px] h-[255px]  items-center justify-between">
        <div className="w-[255px] h-[255px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={75}
                outerRadius={105}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-4 pr-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[12px] text-gray-600 font-medium">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
