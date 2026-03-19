import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Asset } from "@/gql/graphql";

export const exportAssetsToExcel = (assets: Asset[]) => {
  // Sheet-д хийх дата бэлтгэх
  const data = assets.map(asset => ({
    "Хөрөнгө": asset.name,
    "Ангилал": asset.category?.name || "—",
    "Төлөв": asset.status,
    "Хуваарилагдсан": asset.assignedTo ? "Тийм" : "Үгүй",
    "Хэлтэс": asset.department?.name || "—",
    "Үнэ": asset.purchaseCost,
    "Серийн дугаар": asset.serialNumber,
    "Код": asset.assetTag,
  }));

  // Workbook үүсгэх
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Assets");

  // Excel файл үүсгэх
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([wbout], { type: "application/octet-stream" });

  saveAs(blob, "assets.xlsx");
};