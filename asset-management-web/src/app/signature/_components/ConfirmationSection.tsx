import PendingSection from "./PendingSection"
import ConfirmedSection from "./ConfirmedSection"

export default function ConfirmationSection() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-semibold text-black mb-1">
        Гарын үсгэн баталгаажуулалт
      </h1>

      <p className="text-gray-600 text-sm mb-8">
        Шинэ төхөөрөмж авах үед дижитал гарын үсэг зурах
      </p>

      <PendingSection />

      <ConfirmedSection />

    </div>
  )
}