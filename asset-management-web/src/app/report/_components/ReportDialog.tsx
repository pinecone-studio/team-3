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
  { id: "3", name: "iPhone 15 Pro", assetTag: "PHN-2026-003" },
  { id: "4", name: "Magic Keyboard", assetTag: "PER-2026-008" },
];

const issueTypes = [
  { value: "hardware", label: "Техник хангамж" },
  { value: "software", label: "Програм хангамж" },
  { value: "damage", label: "Гэмтэл" },
  { value: "lost", label: "Алдагдсан" },
  { value: "other", label: "Бусад" },
];

export default function ReportDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState("");
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    setDialogOpen(false);
    setSelectedAsset("");
    setIssueType("");
    setDescription("");
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#0251CB] w-[149px] h-[36px] transition-colors py-2.5 px-4 cursor-pointer text-[#FFFFFF] text-[14px] font-medium rounded-md flex items-center gap-2">
          <Plus className=" h-4 w-4 " />
          Шинэ мэдэгдэл
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] rounded-md">
        <DialogHeader>
          <DialogTitle className="font-bold  text-[20px]">
            Асуудал мэдэгдэх
          </DialogTitle>
          <DialogDescription className="text-[16px]">
            Төхөөрөмжтэй холбоотой асуудлаа дэлгэрэнгүй тайлбарлана уу
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Төхөөрөмж сонгох</Label>
            <Select value={selectedAsset} onValueChange={setSelectedAsset}>
              <SelectTrigger>
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
            <Label>Асуудлын төрөл</Label>
            <Select value={issueType} onValueChange={setIssueType}>
              <SelectTrigger>
                <SelectValue placeholder="Төрөл сонгоно уу" />
              </SelectTrigger>
              <SelectContent>
                {issueTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Тайлбар</Label>
            <Textarea
              placeholder="Асуудлаа дэлгэрэнгүй тайлбарлана уу..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Зураг хавсаргах (заавал биш)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Зураг чирж оруулах эсвэл
              </p>
              <Button variant="link" className="text-primary">
                Файл сонгох
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>
            Болих
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={!selectedAsset || !issueType || !description}
          >
            <AlertTriangle className="mr-2 h-4 w-4" />
            Мэдэгдэл илгээх
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
