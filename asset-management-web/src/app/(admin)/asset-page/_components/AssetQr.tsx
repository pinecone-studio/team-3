import { Asset } from '@/gql/graphql';
import {Dialog, DialogContent, DialogHeader,DialogTitle, DialogTrigger} from '@/libs'
import { Printer, QrCode } from 'lucide-react';
import Image from 'next/image';
export const AssetQr = ({item}:{item:Asset}) => {
  return (
    <Dialog>
    <DialogTrigger>
      <div className="border p-2 rounded-md cursor-pointer">
        <QrCode size={15} />
      </div>
    </DialogTrigger>
    <DialogContent className="p-10">
      <DialogHeader>
      <DialogTitle><p className="text-[20px] text-center font-bold">{item.subCategory?.name}</p></DialogTitle>
        <div className="border p-4 rounded-md">
          
          <Image
            id={`qr-image-${item.id}`}
            src={item.qrUrl}
            width={300}
            height={300}
            alt="qr"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          {/* Print Button */}
          <button
            onClick={() => {
              const printWindow = window.open("", "_blank");
              if (printWindow) {
                printWindow.document.write(`
<html>
<head>
  <title>Print QR - ${item.subCategory?.name}</title>
  <style>
    body { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; font-family: sans-serif; }
    h2 { margin-bottom: 16px; }
    img { width: 300px; height: 300px; }
  </style>
</head>
<body>
  <h2>${item.subCategory?.name}</h2>
  <img src="${item.qrUrl}" alt="QR Code" />
</body>
</html>
`);
                printWindow.document.close();
                printWindow.focus();
                printWindow.print();
                printWindow.close();
              }
            }}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Printer size={16} />
            Print
          </button>
        </div>
      </DialogHeader>
    </DialogContent>
  </Dialog>
  )
}

