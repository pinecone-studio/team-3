import { PendingAsset } from "./mockData"

type Props = {
  asset: PendingAsset
}

export default function PendingAssetCard({ asset }: Props) {
  return (
    <div className="border  rounded-xl p-5 flex justify-between items-center">

      <div className="flex gap-4">

        <div className="bg-gray-200  p-3 h-12 rounded-lg">
          ⌨️
        </div>

        <div>

          <div className="flex gap-3 items-center">
            <h3 className="font-semibold text-lg">
              {asset.name}
            </h3>

            <span className="bg-red-700 text-white text-xs px-2 py-1 rounded">
              Шаардлагатай
            </span>
          </div>

          <p className="text-sm text-gray-500">
            {asset.code} · {asset.serial}
          </p>

          <p className="text-sm text-gray-400">
            {asset.description}
          </p>

          <div className="flex  gap-4 mt-5 text-sm">

            <div>
              <p className="text-gray-400">Нөхцөл</p>
              <p className="font-medium">{asset.condition}</p>
            </div>

            <div>
              <p className="text-gray-400">Олгосон огноо</p>
              <p className="font-medium">{asset.assignedDate}</p>
            </div>

            <div>
              <p className="text-gray-400">Олгосон</p>
              <p className="font-medium">{asset.assignedBy}</p>
            </div>

          </div>

        </div>

      </div>

      <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700">
        ✍ Гарын үсэг зурах
      </button>

    </div>
  )
}