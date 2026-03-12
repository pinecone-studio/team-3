// import PendingSection from "./PendingSection"
// import ConfirmedSection from "./ConfirmedSection"

// export default function ConfirmationSection() {
//   return (
//     <div className="p-2 bg-white min-h-screen">

//       <h1 className="h-[30px] text-2xl ont-[GIP] text-[24px] font-semibold leading-[125%] tracking-normal align-middle mb-1">
//         Гарын үсгэн баталгаажуулалт
//       </h1>

//       <p className="text-[#555555] h-[18px] font-[GIP] text-[14px] font-normal leading-[125%] tracking-normal align-middle mb-6">
//         Шинэ төхөөрөмж авах үед дижитал гарын үсэг зурах
//       </p>

//       <PendingSection />

//       <ConfirmedSection />

//     </div>
//   )
// }
// components/ConfirmationSection.tsx
import PendingSection from "./PendingSection";
import ConfirmedSection from "./ConfirmedSection";

export default function ConfirmationSection() {
  return (
    <div className="space-y-8 bg-white p-6 rounded-xl shadow-sm">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Гарын үсгэн баталгаажуулалт
        </h1>
        <p className="mt-1.5 text-sm text-gray-600">
          Шинэ төхөөрөмж авах үед дижитал гарын үсэг зурах
        </p>
      </div>

      <PendingSection />
      <ConfirmedSection />
    </div>
  );
}