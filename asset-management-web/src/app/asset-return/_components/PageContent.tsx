import AlertDeadline from "./AlertDeadline";
import AssetItem from "./Assetitem";
import ReturnInfoSection from "./ReturnInfo";

export default function AssetReturnPageContent({ data }: any) {
  return (
    <div className="flex flex-col gap-6 p-10 w-full min-h-screen  text-[#111827] font-gilroy">
      <div>
        <h1 className="text-[28px] font-bold tracking-tight">
          Хөрөнгө буцаалт
        </h1>
        <p className="text-[#666666] text-[14px] font-medium mt-1">
          Ажлаас гарах үеийн хөрөнгө буцаалтын мэдээлэл
        </p>
      </div>

      <AlertDeadline deadline={data.deadline} daysLeft={data.daysLeft} />

      <div className="grid grid-cols-12 gap-6 ">
        <div className="col-span-5">
          <ReturnInfoSection
            lastWorkingDay={data.lastWorkingDay}
            deadline={data.deadline}
            progress={{ done: 0, total: data.assets.length }}
            location={data.location}
          />
        </div>

        <div className="col-span-7 bg-[#F8FAFC] border border-[#E2E8F0] p-8 rounded-xl shadow-sm space-y-6">
          <div>
            <h3 className="font-medium text-[16px] leading-[20px] text-[#0F172A]">
              Буцаах хөрөнгүүд
            </h3>
            <p className="text-[#666666] text-[14px] font-regular leading-[125%] mt-1">
              Эдгээр төхөөрөмжүүдийг бүгдийг нь буцааж өгөх шаардлагатай
            </p>
          </div>

          <div className="space-y-4">
            {data.assets?.map((asset: any) => (
              <AssetItem key={asset.id} asset={asset} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
