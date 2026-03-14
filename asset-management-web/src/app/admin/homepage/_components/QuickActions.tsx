import {
  Plus,
  QrCode,
  ClipboardList,
  UserCheck,
  FileText,
  Download,
} from "lucide-react";

const actions = [
  {
    id: 1,
    title: "Хөрөнгө бүртгэх",
    subtitle: "Шинэ хөрөнгө нэмэх",
    icon: <Plus className="w-5 h-5 text-gray-800" />,
  },
  {
    id: 2,
    title: "QR Скан хийх",
    subtitle: "Хайх болон баталгаажуулах",
    icon: <QrCode className="w-5 h-5 text-gray-800" />,
  },
  {
    id: 3,
    title: "Тооллого эхлүүлэх",
    subtitle: "Шинэ тооллого үүсгэх",
    icon: <ClipboardList className="w-5 h-5 text-gray-800" />,
  },
  {
    id: 4,
    title: "Чөлөөлөлт",
    subtitle: "Ажилтны гаралт боловсруулах",
    icon: <UserCheck className="w-5 h-5 text-gray-800" />,
  },
  {
    id: 5,
    title: "Тайлан үүсгэх",
    subtitle: "Хөрөнгийн дата экспорт",
    icon: <FileText className="w-5 h-5 text-gray-800" />,
  },
  {
    id: 6,
    title: "QR шошго хэвлэх",
    subtitle: "Шошгоны хуудас татах",
    icon: <Download className="w-5 h-5 text-gray-800" />,
  },
];

const QuickActions = () => {
  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm w-[400px] shrink-0">
      <div className="mb-6">
        <h3 className="text-[16px] font-medium text-[#000000]">
          Түргэн үйлдлүүд
        </h3>
        <p className="text-[14px] text-[#555555] mt-1">
          Түгээмэл хийгддэг үйлдлүүд
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action.id}
            className="flex flex-col  items-start p-4 text-left transition-all duration-200 border border-gray-200 rounded-md bg-gray-50/50 hover:bg-gray-100 group h-[70px] justify-between"
          >
            <div className="  rounded-lg  group-hover:shadow-md transition-shadow">
              {action.icon}
            </div>
            <div>
              <h4 className="text-[12px] font-medium text-gray-900 leading-tight">
                {action.title}
              </h4>
              <p className="text-[10px] text-gray-400 mt-1 leading-tight">
                {action.subtitle}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
