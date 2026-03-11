import ConfirmedRow from "./ConfirmedRow"
import { confirmedAssets } from "./mockData"

export default function ConfirmedSection() {
  return (
    <div className="bg-white rounded-xl border p-6">

      <div className="text-green-600 font-semibold mb-2">
        ✔ Баталгаажсан
      </div>

      <p className="text-gray-500 mb-6">
        Өмнө нь баталгаажуулсан төхөөрөмжүүд
      </p>

      <div className="space-y-3">
        {confirmedAssets.map((asset) => (
          <ConfirmedRow key={asset.id} asset={asset} />
        ))}
      </div>

    </div>
  )
}