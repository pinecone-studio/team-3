import AssetReturnPageContent from "./_components/PageContent";

export default function Page() {
  //   const res = await fetch("https://api/", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // const data = await res.json();
  const data = {
    deadline: "2026.03.20",
    lastWorkingDay: "2026.03.20",
    daysLeft: 9,

    location: {
      room: "IT хэлтэс, 3-р давхар, 305 өрө",
      person: "Оюунбилэг Д.",
      phone: "9911-2233",
    },

    assets: [
      {
        id: 1,
        name: 'MacBook Pro 14"',
        code: "MAC-2026-005",
        status: "pending",
        instructions: [
          "Бүх хувийн файлуудаа нөөцөлнө үү",
          "iCloud-оос гарна уу",
          "Цэнэглэгчийг хамт авчирна уу",
        ],
      },
      {
        id: 2,
        name: "Dell 27 Monitor",
        code: "MON-2026-021",
        status: "returned",
        instructions: [
          "Бүрэн ажиллагаатай эсэхийг шалгана уу",
          "Анхааралтай савлаж өгнө үү",
        ],
      },
      {
        id: 3,
        name: "Magic Keyboard",
        code: "KEY-2026-011",
        status: "pending",
        instructions: [
          "Бүрэн ажиллагаатай эсэхийг шалгана уу",
          "Анхааралтай савлаж өгнө үү",
        ],
      },
    ],
    steps: [
      {
        id: 1,
        title: "Дата нөөцлөх",
        desc: "Бүх хувийн файлуудаа нөөцөлж, устгана уу",
        isCompleted: true,
      },
      {
        id: 2,
        title: "Аккаунтаас гарах",
        desc: "iCloud, Google, болон бусад аккаунтаас гарна уу",
        isCompleted: false,
      },
      {
        id: 3,
        title: "Төхөөрөмж бэлдэх",
        desc: "Бүх дагалдах хэрэгслийг цуглуулна уу",
        isCompleted: false,
      },
      {
        id: 4,
        title: "IT-д хүлээлгэж өгөх",
        desc: "Заасан байршилд хүлээлгэж өгнө үү",
        isCompleted: false,
      },
    ],
  };

  return <AssetReturnPageContent data={data} />;
}
