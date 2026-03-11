import { Badge, Button } from "@/libs";
import {
  ArrowIcon,
  CheckListIcon,
  CheckListMini,
  CubIcon,
  DesctopIcon,
  DocumentIcon,
  DocumentIconSmall,
  IphoneIcon,
  MacBook,
  ProgressDemo,
  WarningBlueIcon,
} from "./icons/icons";
import { Cards } from "./Cards";

export function HomePage() {
  const inventoryMock = [
    {
      icon: MacBook(),
      name: "MacBook Pro 14",
      desc: "MAC-2026-005 · Зөөврийн компьютер",
      status: "Хуваарилагдсан",
    },
    {
      icon: DesctopIcon(),
      name: "Dell UltraSharp 27",
      desc: "MON-2026-012 · Монитор",
      status: "Хуваарилагдсан",
    },
    {
      icon: IphoneIcon(),
      name: "iPhone 15 Pro",
      desc: "PHN-2026-003 · Гар утас",
      status: "Хуваарилагдсан",
    },
  ];
  return (
    <div>
      <div>
        <h1 className="text-4xl">Сайн байна уу, Энхжаргал</h1>
        <p className="text-gray-400">Таны хөрөнгийн порталын тойм</p>
      </div>

      <div className="bg-red-200 rounded-2xl  border-2 border-red-300 flex gap-3 items-center w-[1208px] h-[126px] justify-center gap-130">
        <div className="flex items-center gap-5">
          <DocumentIcon />

          <div className="flex flex-col">
            <h3>Баталгаажуулалт шаардлагатай</h3>
            <p>Magic Keyboard (PER-2026-008) - гарын үсэг зурах шаардлагатай</p>
          </div>
        </div>
        <Button>Баталгаажуулах</Button>
      </div>

      <Cards />
      <div className="border-2 rounded-2xl mt-5 pt-5 border-gray-400 w-[1208px] h-[340px]">
        {/* navbar */}
        <div className="flex items-center justify-between px-3">
          <div>
            <h1>Миний хөрөнгө</h1>
            <p className="text-gray-400">Танд олгогдсон төхөөрөмжүүд</p>
          </div>
          <Button className="flex items-center gap-2 border-1 border-gray-300 rounded-2xl bor text-black bg-white">
            Бүгдийг харах <ArrowIcon />
          </Button>
        </div>
        {/* ends */}
        {/* mockdata */}
        {inventoryMock.map((data, i) => {
          return (
            <div className="flex flex-col mt-3" key={i}>
              <div className="w-[1158px] h-[66px] flex items-center justify-between">
                <div className="flex gap-5 pl-5">
                  {data.icon}
                  <div className="flex flex-col">
                    <h1>{data.name}</h1>
                    {data.desc}
                  </div>
                </div>
                <Badge className="bg-gray-200 text-black border-2 border-gray-200">
                  {data.status}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
      {/* ends */}
      {/* bottom */}
      <div className="w-[1208px] h-[222px] rounded-2xl px-5  mt-10 border-gray-200 border-2">
        <h1 className="mt-5">Тооллогын баталгаажуулалт</h1>
        <div className="py-3 flex gap-4 flex-col text-gray-400">
          <p>2026 оны 1-р улирлын тооллого</p>
          <p>Баталгаажуулсан</p>
        </div>
        <div className="flex justify-between items-center  ">
          <ProgressDemo />
          <p>2 / 4 хөрөнгө</p>
        </div>
        <Button className="w-full bg-white border-gray-300 flex items-center justify-center text-black">
          <CheckListMini />
          Баталгаажуулалт үргэлжлүүлэх
        </Button>
      </div>
      {/* ends */}
    </div>
  );
}
