import { ConfirmedAsset } from "./mockData"

type Props = {
  asset: ConfirmedAsset
}

export default function ConfirmedRow({ asset }: Props) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center bg-white">

      <div className="flex gap-3 items-center">

        <div className="bg-green-100 text-[#006944] p-1.5 rounded-full w-8 h-8 flex items-center justify-center">
          ✓
        </div>

        <div>
          <p className="font-medium text-black text-sm">{asset.name}</p>
          <p className="text-xs text-gray-500">{asset.code}</p>
        </div>

      </div>

      <p className="text-gray-500 text-sm">
        {asset.date}
      </p>

    </div>
  )
}