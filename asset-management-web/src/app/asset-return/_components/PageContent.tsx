import AlertDeadline from "./AlertDeadline";
import ReturnInfoSection from "./ReturnInfo";
import StepsSection from "./Stepsection";
import AssetItem from "./Assetitem";

export default function AssetReturnPageContent({ data }: any) {
  return (
    <div className="flex flex-col gap-6 p-8 min-h-screen text-[#111827]">
      <div>
        <h1 className="font-bold text-[24px] text-gray-900 tracking-tight">
          Хөрөнгө буцаалт
        </h1>
        <p className="text-[14px] font-normal text-gray-500 mt-1">
          Ажлаас гарах үеийн хөрөнгө буцаалтын мэдээлэл
        </p>
      </div>

      <AlertDeadline deadline={data.deadline} daysLeft={data.daysLeft} />
      <ReturnInfoSection
        lastWorkingDay={data.lastWorkingDay}
        deadline={data.deadline}
        progress={{ done: 0, total: data.assets.length }}
        location={data.location}
      />

      <div className="mt-2 space-y-4 border p-5 rounded-2xl">
        <h3 className="font-medium text-[16px] text-gray-900">
          Буцаах хөрөнгүүд
        </h3>
        <p className="text-[14px] font-medium text-[#555555] -mt-3">
          Эдгээр төхөөрөмжүүдийг бүгдийг буцааж өгөх шаардлагатай
        </p>

        {data.assets?.map((asset: any) => (
          <AssetItem key={asset.id} asset={asset} />
        ))}
      </div>

      <StepsSection steps={data.steps} />
    </div>
  );
}
