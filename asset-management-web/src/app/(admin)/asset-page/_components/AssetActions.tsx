"use client"

import { BookCopy, Pencil } from "lucide-react"
import { AssetQr } from "./AssetQr"
import { Asset, AssetStatusEnum, useDuplicateAssetMutation } from "@/gql/graphql"
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  Input,
} from "@/libs"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"

const getStatusStyle = (status: string) => {
  switch (status) {
    case "ASSIGNED":
      return "text-[#0251CB] bg-[#EEF4FF] border-[#D1E0FF]"
    case "REPAIR":
      return "text-[#F79009] bg-[#FFFAEB] border-[#FEDF89]"
    case "DECOMMISSION":
      return "text-[#F04438] bg-[#FEF3F2] border-[#FEE4E2]"
    case "AVAILABLE":
      return "text-[#12B76A] bg-[#ECFDF3] border-[#ABEFC6]"
    default:
      return "text-gray-600 bg-gray-50 border-gray-200"
  }
}

export const AssetActions = ({ item ,refetch}: { item: Asset,refetch:()=>void }) => {
    const [isOpen,setIsOpen] = useState(false)
  const [num, setNum] = useState<number>(1)
const [DuplicateAssetDocument,{loading}]= useDuplicateAssetMutation({onCompleted:()=>{toast.success("Амжилттай хувиллаа");setIsOpen(false);refetch()}})
  const createHandler =async() => {
    if (!num || num <= 0) {
      alert("Тоо оруулна уу")
      return
    }
await DuplicateAssetDocument({variables:{input:{count:num,assetId:item.id}}})

  }

  return (
    <div className="flex items-center gap-2">
      <AssetQr item={item} />
      <div className="border p-2 rounded-md cursor-pointer hover:bg-gray-100">
        <Pencil size={14} />
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className="border p-2 rounded-md cursor-pointer hover:bg-gray-100">
            <BookCopy size={14} />
          </div>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Бараа хувьлах</DialogTitle>
            <p className="text-sm text-gray-500">
              Та хэдэн ширхэг хувьлах тоогоо оруулна уу
            </p>
          </DialogHeader>

          <div className="flex flex-col gap-3 mt-2">
            <div className="border rounded-md flex gap-3 items-center p-3">
              <div className="border rounded-md p-2">
                <img
                  src={item.imageUrl || "/placeholder.png"}
                  width={50}
                  height={50}
                  alt="asset"
                />
              </div>

              <div>
                <p className="font-bold">
                  {item?.subCategory?.name || "No name"}
                </p>

                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.status === AssetStatusEnum.Available
                        ? "bg-emerald-500"
                        : item.status === AssetStatusEnum.Assigned
                        ? "bg-blue-500"
                        : item.status === AssetStatusEnum.InRepair
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                  />

                  <span
                    className={`text-xs px-2 py-0.5 rounded border ${getStatusStyle(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="border rounded-md p-3 flex flex-col gap-2">
              <p className="text-sm">Хувьлах тоо</p>
              <Input
                value={num}
                type="number"
                min={1}
                onChange={(e) => setNum(Number(e.target.value))}
              />
            </div>


            <div className="w-full flex items-center gap-2 justify-between">
              <DialogClose asChild>
                <Button className="bg-white text-black border-gray-300 w-1/2">
                  Болих
                </Button>
              </DialogClose>

              <Button
                onClick={createHandler}
                disabled={loading}
                className="bg-blue-500 text-white w-1/2"
              >
                {loading ? "Үүсгэж байна" :"Үүсгэх"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}