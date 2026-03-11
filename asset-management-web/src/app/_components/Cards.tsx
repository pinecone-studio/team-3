import { Button } from "@/libs";
import {
  CheckListIcon,
  CubIcon,
  DocumentIconSmall,
  WarningBlueIcon,
} from "./icons/icons";

export function Cards() {
  const mockData = [
    {
      title: "Миний хөрөнгө",
      icon: CubIcon(),
      number: "4",
      requirement: "",
      subtitle: "Хуваарилагдсан төхөөрөмж",
    },
    {
      title: "Баталгаажуулалт",
      icon: DocumentIconSmall(),
      number: "1",
      requirement: "Шаардлагатай",

      subtitle: "Хүлээгдэж буй гарын үсэг",
    },
    {
      title: "QR баталгаажуулалт",
      icon: CheckListIcon(),
      requirement: "",
      number: "2",
      subtitle: "Баталгаажуулах шаардлагатай",
    },
    {
      title: "Асуудал",
      icon: WarningBlueIcon(),
      requirement: "",
      number: "0",
      subtitle: "Идэвхтэй мэдэгдэл",
    },
  ];
  return (
    <div className="flex gap-5 mt-10">
      {mockData.map((data, i) => {
        return (
          <div className="flex " key={i}>
            <div className="w-[290px] h-[166px] pl-5 pt-3 border-gray-200 border-2 rounded-2xl ">
              <div className="flex justify-between">
                <p className="">{data.title}</p>
                <p className="pr-6">{data.icon}</p>
              </div>
              <div className="flex mt-10 gap-3 items-center">
                <h1 className="text-[25px]">{data.number}</h1>
                {data.requirement ? (
                  <Button className="bg-red-500 text-white">
                    Шаардлагатай
                  </Button>
                ) : (
                  ""
                )}
              </div>
              <p>{data.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
