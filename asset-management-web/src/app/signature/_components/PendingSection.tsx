import PendingAssetCard from "./PendingAssetCard"
import { pendingAssets } from "./mockData"

export default function PendingSection() {
  return (
    <div className="border border-red-300 rounded-xl bg-white p-6 mb-8">
        <div>    
      <div className="text-black font-semibold mb-2"> 
         Хүлээгдэж буй баталгаажуулалт
      </div>
      </div>
      <p className="text-gray-500 mb-6">
        Эдгээр төхөөрөмжүүдийг авснаа баталгаажуулна уу
      </p>

      <div className="space-y-4">
        {pendingAssets.map((asset) => (
          <PendingAssetCard key={asset.id} asset={asset} />
        ))}
      </div>

    </div>
  )
}