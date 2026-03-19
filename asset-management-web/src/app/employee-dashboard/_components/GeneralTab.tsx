import { Asset, Assignment, GetAssetByIdDocument } from "@/gql/graphql";
import { DeviceIcon } from "./icons";
export type AssetWithCategory = Asset & { category?: { name: string } };

export interface GeneralTabProps {
  assets: AssetWithCategory[];
  history: Assignment[];
}

export default function GeneralTab({
  assets,
  history,
}: {
  assets: AssetWithCategory[];
  history: Assignment[];
}) {
  return (
    <div className="space-y-8 ">
      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-5">
        <h3 className="text-lg  font-semibold text-[#000000] mb-1">
          Миний хөрөнгө
        </h3>
        <p className="text-sm text-[#666666] mb-4">
          Танд олгогдсон төхөөрөмжүүд
        </p>
        <div className=" bg-white/100 border border-[#E2E8F0] rounded-2xl p-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {assets.map((asset, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                   
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-gray-900 truncate">
                      {asset.category?.name || "Төхөөрмж"}
                    </p>
                    <p className="text-sm text-gray-400 truncate">
                      {asset.assetTag} · {asset.serialNumber}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-blue-600 font-medium">
                  {asset.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* History */}
      <div className="border border-[#E2E8F0] rounded-2xl">
        <div className=" rounded-t-2xl px-5 py-4 ">
        <h3 className="text-lg font-semibold text-[#000000] mb-1">Түүх</h3>
        <p className="text-sm text-[#666666] mb-4">
          Өмнө хэрэглэж байсан төхөөрөмжүүд
        </p>
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className=" border-b border-[#E2E8F0]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">
                  Төхөөрөмж
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">
                  Код
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">
                  Хугацаа
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">
                  Ашиглах
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500">
                  Буцаасан шалтгаан
                </th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, i) => (
                <tr
                  key={i}
                  className={
                    i !== history.length - 1 ? "border-b border-gray-100" : ""
                  }
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* <DeviceIcon type={item.type} size={18} /> */}
                      <span className="text-base text-gray-900 whitespace-nowrap">
                        {item.asset?.category?.name || "Төхөөрмөж"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-base text-gray-500 whitespace-nowrap">
                    {item.asset?.assetTag}
                  </td>
                  <td className="px-6 py-4 text-base text-gray-500 whitespace-nowrap">
                    2026.3.20 - {item.assignedAt}
                  </td>
                  <td className="px-6 py-4 text-base text-gray-500 whitespace-nowrap">
                    {item.asset?.serialNumber}
                  </td>
                  <td className="px-6 py-4 text-base text-gray-500 whitespace-nowrap">
                    {item.employeeId || "Төхөөрмж солигдсон"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
}
