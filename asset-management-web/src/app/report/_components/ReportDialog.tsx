"use client";

import { Plus, Upload, AlertTriangle } from "lucide-react";
import {
  DialogTrigger,
  Dialog,
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Textarea,
  DialogFooter,
} from "@/libs";
import { useState } from "react";

const myAssets = [
  { id: "1", name: 'MacBook Pro 14"', assetTag: "MAC-2026-005" },
  { id: "2", name: 'Dell UltraSharp 27"', assetTag: "MON-2026-012" },
];

export default function ReportDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#0251CB] hover:bg-[#0241a1] h-[36px] px-4 text-[#FFFFFF] text-[14px] font-medium rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="h-4 w-4" />
          Шинэ мэдэгдэл
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] rounded-xl font-gilroy">
        <DialogHeader>
          <DialogTitle className="font-semibold text-[20px] leading-[125%]">
            Асуудал мэдэгдэх
          </DialogTitle>
          <DialogDescription className="text-[#666666] text-[14px] leading-[125%]">
            Төхөөрөмжтэй холбоотой асуудлаа дэлгэрэнгүй тайлбарлана уу
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          <div className="space-y-2">
            <Label className="text-[14px] font-medium">Төхөөрөмж сонгох</Label>
            <Select value={selectedAsset} onValueChange={setSelectedAsset}>
              <SelectTrigger className="h-10 border-[#E2E8F0]">
                <SelectValue placeholder="Төхөөрөмж сонгоно уу" />
              </SelectTrigger>
              <SelectContent>
                {myAssets.map((asset) => (
                  <SelectItem key={asset.id} value={asset.id}>
                    {asset.name} ({asset.assetTag})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-[14px] font-medium">Тайлбар</Label>
            <Textarea
              className="border-[#E2E8F0] resize-none focus-visible:ring-[#0251CB]"
              placeholder="Асуудлаа дэлгэрэнгүй тайлбарлана уу..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[14px] font-medium">Зураг хавсаргах</Label>
            <div className="border border-dashed border-[#E2E8F0] rounded-xl p-8 text-center bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-colors cursor-pointer">
              <Upload className="h-6 w-6 mx-auto text-[#94A3B8] mb-2" />
              <p className="text-[13px] text-[#64748B]">
                Зураг чирж оруулах эсвэл{" "}
                <span className="text-[#0251CB] font-medium">Файл сонгох</span>
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            className="h-10 px-6 border-[#E2E8F0] text-[#64748B]"
            onClick={() => setDialogOpen(false)}
          >
            Болих
          </Button>
          <Button
            className="bg-[#0251CB] h-10 px-6 text-white"
            disabled={!selectedAsset || !description}
          >
            Мэдэгдэл илгээх
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
