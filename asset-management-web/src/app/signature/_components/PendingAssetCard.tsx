
import { PendingAsset } from "./mockData"

type Props = {
  asset: PendingAsset
}

export default function PendingAssetCard({ asset }: Props) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 flex justify-between items-center bg-white">

      <div className="flex gap-4">

        <div className="bg-gray-100 p-3 h-12 w-12 rounded-lg flex items-center justify-center text-xl">
          ⌨️
        </div>

        <div>

          <div className="flex gap-3 items-center mb-1">
            <h3 className="font-semibold text-base text-black">
              {asset.name}
            </h3>

            <span className=" text-[dark/700] text-xs px-2 py-0.5 rounded">
              Шаардлагатай
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-1">
            {asset.code} · {asset.serial}
          </p>

          <p className="text-sm text-gray-500 mb-4">
            {asset.description}
          </p>

          <div className="flex  gap-16 text-sm">

            <div>
              <p className="text-gray-500 mb-1">Нөхцөл</p>
              <p className="font-medium text-black">{asset.condition}</p>
            </div>

            <div>
              <p className="text-gray-500 mb-1">Олгосон огноо</p>
              <p className="font-medium text-black">{asset.assignedDate}</p>
            </div>

            <div>
              <p className="text-gray-500 mb-1">Олгосон</p>
              <p className="font-medium text-black">{asset.assignedBy}</p>
            </div>

          </div>

        </div>

      </div>

            <button className="bg-black text-white px-6 py-2.5 rounded-lg hover:bg-gray-800 flex items-center gap-2 whitespace-nowrap">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.151 3.48398L10.471 1.80398C10.3219 1.65433 10.1446 1.53569 9.9494 1.45491C9.75419 1.37412 9.54492 1.3328 9.33366 1.33332H4.00033C3.6467 1.33332 3.30756 1.47379 3.05752 1.72384C2.80747 1.97389 2.66699 2.31303 2.66699 2.66665V13.3333C2.66699 13.6869 2.80747 14.0261 3.05752 14.2761C3.30756 14.5262 3.6467 14.6667 4.00033 14.6667H12.0003C12.3539 14.6667 12.6931 14.5262 12.9431 14.2761C13.1932 14.0261 13.3337 13.6869 13.3337 13.3333V13.0993" stroke="#FCFCFC" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14.2517 8.41731C14.5172 8.15174 14.6664 7.79155 14.6664 7.41598C14.6664 7.0404 14.5172 6.68021 14.2517 6.41464C13.9861 6.14907 13.6259 5.99988 13.2503 5.99988C12.8748 5.99988 12.5146 6.14907 12.249 6.41464L9.57566 9.08931C9.41716 9.24772 9.30114 9.44353 9.23833 9.65864L8.68033 11.572C8.66359 11.6293 8.66259 11.6902 8.67742 11.748C8.69225 11.8059 8.72237 11.8588 8.76462 11.901C8.80688 11.9433 8.85971 11.9734 8.9176 11.9882C8.97548 12.003 9.03629 12.002 9.09366 11.9853L11.007 11.4273C11.2221 11.3645 11.4179 11.2485 11.5763 11.09L14.2517 8.41731Z" stroke="#FCFCFC" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M5.33301 12H5.99967" stroke="#FCFCFC" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Гарын үсэг зурах
            </button>

    </div>
  )
}