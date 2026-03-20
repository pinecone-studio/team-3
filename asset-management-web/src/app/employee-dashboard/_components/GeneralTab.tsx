import { Asset, Assignment} from "@/gql/graphql";
import MyAssets from "./MyAssets";
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

         <MyAssets assets={assets}/>


      {/* History */}
      <div className="border border-[#E2E8F0] rounded-2xl">
        <div className="rounded-t-2xl px-3 sm:px-5 py-4">
        <h3 className="text-lg font-semibold text-[#000000] mb-1">Түүх</h3>
        <p className="text-sm text-[#666666] mb-4">
          Өмнө хэрэглэж байсан төхөөрөмжүүд
        </p>
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
           <div className="overflow-x-auto -mx-3 sm:mx-0">
           <table className="w-full min-w-[500px] sm:min-w-[600px]">
            <thead className=" border-b border-[#E2E8F0]">
              <tr>
                <th className="px-6 py-4 text-left text-xs sm:text-sm font-semibold text-[#000000]">
                  Төхөөрөмж
                </th>
                <th className="px-6 py-4 text-left text-xs sm:text-sm font-semibold text-[#000000]">
                  Код
                </th>
                <th className="px-6 py-4 text-left text-xs sm:text-sm font-semibold text-[#000000]">
                  Хугацаа
                </th>
                <th className="px-6 py-4 text-left text-xs sm:text-sm font-semibold text-[#000000]">
                  Ашиглах
                </th>
                <th className="px-6 py-4 text-left text-xs sm:text-sm font-semibold text-[#000000]">
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
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                    {item.asset?.assetTag}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                    2026.3.20 - {item.assignedAt}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                    {item.asset?.serialNumber}
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500 whitespace-nowrap">
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
    </div>
  );
}
