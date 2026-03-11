import { ConfirmedAsset } from "./mockData"

type Props = {
  asset: ConfirmedAsset
}

export default function ConfirmedRow({ asset }: Props) {
  return (
    <div className="border rounded-lg p-4 flex justify-between items-center">

      <div className="flex gap-4 items-center">

        <div className="bg-green-100 text-green-600 p-2 rounded-full">
          ✔
        </div>

        <div>
          <p className="font-medium">{asset.name}</p>
          <p className="text-sm text-gray-500">{asset.code}</p>
        </div>

      </div>

      <p className="text-gray-400 text-sm">
        {asset.date}
      </p>

    </div>
  )
}