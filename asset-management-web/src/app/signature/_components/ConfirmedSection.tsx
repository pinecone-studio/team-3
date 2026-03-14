import ConfirmedRow from "./ConfirmedRow";
import { confirmedAssets } from "./mockData";

export default function ConfirmedSection() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-2">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_118_1435)">
            <path
              d="M18.1673 8.33332C18.5479 10.2011 18.2767 12.1428 17.3989 13.8348C16.5211 15.5268 15.0897 16.8667 13.3436 17.6311C11.5975 18.3955 9.64203 18.5381 7.80342 18.0353C5.96482 17.5325 4.35417 16.4145 3.24007 14.8678C2.12597 13.3212 1.57577 11.4394 1.68123 9.53615C1.78668 7.63294 2.5414 5.8234 3.81955 4.4093C5.09769 2.9952 6.82199 2.06202 8.70489 1.76537C10.5878 1.46872 12.5155 1.82654 14.1665 2.77916"
              stroke="#006944"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.5 9.16668L10 11.6667L18.3333 3.33334"
              stroke="#006944"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_118_1435">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <h2 className="text-black font-semibold text-base">Баталгаажсан</h2>
      </div>

      <p className="text-gray-600 text-sm mb-6">
        Өмнө нь баталгаажуулсан төхөөрөмжүүд
      </p>

      <div className="space-y-3">
        {confirmedAssets.map((asset) => (
          <ConfirmedRow key={asset.id} asset={asset} />
        ))}
      </div>
    </div>
  );
}
