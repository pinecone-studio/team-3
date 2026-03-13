import PendingAssetCard from "./PendingAssetCard"
import { pendingAssets } from "./mockData"

export default function PendingSection() {
  return (
    <div className="border border-[#CC272E80] rounded-xl  p-6 mb-6">
      <div className="flex items-center gap-2 mb-2">
        <span  className="text-red-600">⚠ </span>
        <h2 className="text-black font-semibold text-base"> 
          Хүлээгдэж буй баталгаажуулалт
        </h2>
      </div>
      
      <p className="text-gray-600 text-sm mb-6">
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