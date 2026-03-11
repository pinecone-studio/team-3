
export default function QrVerificationHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          QR баталгаажуулалт
        </h2>
        <p className="mt-1 text-gray-600">
          Төхөөрөмжөөс өгөгдсөн QR-кодоор нэвтрэх хүсэлтийг баталгаажуулна уу
        </p>
      </div>

      <button className="rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white hover:bg-green-700">
        QR скан хийх
      </button>
    </div>
  );
}