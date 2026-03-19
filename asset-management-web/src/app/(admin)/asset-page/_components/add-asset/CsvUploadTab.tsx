"use client"

import { useCallback, useRef, useState } from "react"
import { Upload, FileText, X, AlertCircle, CheckCircle2, Download } from "lucide-react"
import { Button } from "@/libs"
import { AssetStatusEnum, useCreateAssetMutation } from "@/gql/graphql"
import { toast } from "sonner"

const REQUIRED_HEADERS = [
  "assetTag",
  "serialNumber",
  "categoryId",
  "subCategoryId",
  "departmentId",
  "locationId",
  "purchaseDate",
  "purchaseCost",
  "imgUrl",
]

const TEMPLATE_CSV = [
  REQUIRED_HEADERS.join(","),
  "TAG-001,SN-12345,cat-uuid,subcat-uuid,dept-uuid,loc-uuid,2024-01-15,1500000,https://example.com/img1.png",
  "TAG-002,SN-67890,cat-uuid,subcat-uuid,dept-uuid,loc-uuid,2024-03-20,2300000,https://example.com/img2.png",
].join("\n")

type RowStatus = "pending" | "success" | "error"

type ParsedRow = {
  index: number
  assetTag: string
  serialNumber: string
  categoryId: string
  subCategoryId: string
  departmentId: string
  locationId: string
  purchaseDate: string
  purchaseCost: string
  imgUrl?: string
  status: AssetStatusEnum      
  importStatus: RowStatus      
  errorMessage?: string
}

function parseCSV(text: string): ParsedRow[] {
  const lines = text.trim().split("\n").map(l => l.trim()).filter(Boolean)
  if (lines.length < 2) return []

  const headers = lines[0].split(",").map(h => h.trim())
  const missingHeaders = REQUIRED_HEADERS.filter(h => !headers.includes(h))
  if (missingHeaders.length > 0) {
    throw new Error(`CSV-д дараах баганууд байхгүй байна: ${missingHeaders.join(", ")}`)
  }

  const getCol = (row: string[], key: string) => row[headers.indexOf(key)]?.trim() ?? ""

  return lines.slice(1).map((line, i) => {
    const cols = line.split(",")
    return {
      index: i,
      assetTag: getCol(cols, "assetTag"),
      serialNumber: getCol(cols, "serialNumber"),
      categoryId: getCol(cols, "categoryId"),
      subCategoryId: getCol(cols, "subCategoryId"),
      departmentId: getCol(cols, "departmentId"),
      locationId: getCol(cols, "locationId"),
      purchaseDate: getCol(cols, "purchaseDate"),
      purchaseCost: getCol(cols, "purchaseCost"),
      imgUrl: getCol(cols, "imgUrl"),
      status: AssetStatusEnum.Available, 
      importStatus: "pending",
    }
  })
}

function validateRow(row: ParsedRow): string | null {
  if (!row.assetTag) return "assetTag хоосон байна"
  if (!row.serialNumber) return "serialNumber хоосон байна"
  if (!row.categoryId) return "categoryId хоосон байна"
  if (!row.subCategoryId) return "subCategoryId хоосон байна"
  if (!row.departmentId) return "departmentId хоосон байна"
  if (!row.locationId) return "locationId хоосон байна"
  if (!row.purchaseDate || isNaN(Date.parse(row.purchaseDate))) return "purchaseDate буруу формат (YYYY-MM-DD)"
  if (!row.purchaseCost || isNaN(Number(row.purchaseCost))) return "purchaseCost тоо биш байна"
  return null
}

type Props = {
  onSuccess: () => void
  refetch: () => void
}

export const CsvUploadTab = ({ onSuccess, refetch }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [rows, setRows] = useState<ParsedRow[]>([])
  const [parseError, setParseError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState({ done: 0, total: 0 })

  const [createAsset] = useCreateAssetMutation()

  const handleFile = useCallback((file: File) => {
    if (!file.name.endsWith(".csv")) {
      setParseError("Зөвхөн .csv файл дэмжигдэнэ")
      return
    }
    setFileName(file.name)
    setParseError(null)
    setRows([])
    setProgress({ done: 0, total: 0 })

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string
        const parsed = parseCSV(text)

        const validated: ParsedRow[] = parsed.map(row => {
          const err = validateRow(row)
          return {
            ...row,
            importStatus: err ? "error" : "pending",
            errorMessage: err ?? undefined,
          }
        })
        setRows(validated)
      } catch (err: unknown) {
        setParseError(err instanceof Error ? err.message : "Файл уншихад алдаа гарлаа")
      }
    }
    reader.readAsText(file)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleReset = () => {
    setFileName(null)
    setRows([])
    setParseError(null)
    setProgress({ done: 0, total: 0 })
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const validRows = rows.filter(r => r.importStatus === "pending")

  const handleImport = async () => {
    if (validRows.length === 0) return
    setIsUploading(true)
    setProgress({ done: 0, total: validRows.length })

    let successCount = 0
    const updatedRows = [...rows]

    for (const row of validRows) {
      try {
        await createAsset({
          variables: {
            input: {
              assetTag: row.assetTag,
              categoryId: row.categoryId,
              subCategoryId: row.subCategoryId,
              locationId: row.locationId,
              serialNumber: row.serialNumber,
              purchaseDate: new Date(row.purchaseDate).toISOString(),
              purchaseCost: Number(row.purchaseCost),
              imageBase64: row.imgUrl || "",
              departmentId: row.departmentId,
            },
          },
        })
        updatedRows[row.index] = { ...row, importStatus: "success" }
        successCount++
      } catch {
        updatedRows[row.index] = {
          ...row,
          importStatus: "error",
          errorMessage: "Серверт хадгалахад алдаа гарлаа",
        }
      }
      setProgress(p => ({ ...p, done: p.done + 1 }))
      setRows([...updatedRows])
    }

    setIsUploading(false)
    if (successCount > 0) {
      toast.success(`${successCount} хөрөнгө амжилттай бүртгэгдлээ`)
      refetch()
      if (successCount === validRows.length) onSuccess()
    }
  }

  const downloadTemplate = () => {
    const blob = new Blob([TEMPLATE_CSV], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "asset_template.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  const errorCount = rows.filter(r => r.importStatus === "error").length
  const successCount = rows.filter(r => r.importStatus === "success").length

  if (!fileName) {
    return (
      <div className="space-y-3">
        <div className="flex justify-end">
          <Button type="button" variant="ghost" size="sm" onClick={downloadTemplate} className="text-muted-foreground gap-1.5 text-sm">
            <Download className="w-4 h-4" /> Загвар татах
          </Button>
        </div>
        <div
          className={`border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center text-center transition-colors ${
            isDragging ? "border-[#0251CB] bg-blue-50/50" : "border-muted-foreground/25 hover:border-muted-foreground/50"
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
        >
          <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mb-4">
            <Upload className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="font-medium mb-1">CSV файл энд чирж оруулах</p>
          <p className="text-sm text-muted-foreground mb-4">эсвэл дарж сонгоно уу</p>
          <Button type="button" variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click() }}>Файл сонгох</Button>
          <input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={handleFileInput} />
        </div>
        {parseError && <p className="text-sm text-destructive flex items-center gap-1.5"><AlertCircle className="w-4 h-4 shrink-0" /> {parseError}</p>}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* File header bar */}
      <div className="flex items-center justify-between bg-muted/50 rounded-lg px-4 py-2.5">
        <div className="flex items-center gap-2.5 text-sm">
          <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
          <span className="font-medium truncate max-w-[240px]">{fileName}</span>
          <span className="text-muted-foreground">{rows.length} мөр</span>
          {errorCount > 0 && <span className="text-destructive text-xs bg-destructive/10 px-2 py-0.5 rounded-full">{errorCount} алдаа</span>}
          {successCount > 0 && <span className="text-green-600 text-xs bg-green-50 px-2 py-0.5 rounded-full">{successCount} амжилттай</span>}
        </div>
        <button type="button" onClick={handleReset} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Цэвэрлэх">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress bar */}
      {isUploading && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Хадгалж байна...</span>
            <span>{progress.done}/{progress.total}</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-[#0251CB] rounded-full transition-all duration-300" style={{ width: `${progress.total ? (progress.done / progress.total) * 100 : 0}%` }} />
          </div>
        </div>
      )}

      {/* Preview table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto max-h-[360px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 sticky top-0 z-10">
              <tr>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground whitespace-nowrap">#</th>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground whitespace-nowrap">Asset Tag</th>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground whitespace-nowrap">Serial №</th>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground whitespace-nowrap">Category</th>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground whitespace-nowrap">Огноо</th>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground whitespace-nowrap">Үнэ</th>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground whitespace-nowrap">Төлөв</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((row, i) => (
                <tr key={i} className={row.importStatus === "error" ? "bg-destructive/5" : row.importStatus === "success" ? "bg-green-50/60" : ""}>
                  <td className="px-3 py-2 text-muted-foreground">{i + 1}</td>
                  <td className="px-3 py-2 font-mono">{row.assetTag || <span className="text-destructive">—</span>}</td>
                  <td className="px-3 py-2 font-mono">{row.serialNumber || <span className="text-destructive">—</span>}</td>
                  <td className="px-3 py-2 text-muted-foreground truncate max-w-[120px]">{row.categoryId}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{row.purchaseDate}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{Number(row.purchaseCost).toLocaleString()}₮</td>
                  <td className="px-3 py-2">
                    {row.importStatus === "success" && <span className="flex items-center gap-1 text-green-600 text-xs"><CheckCircle2 className="w-3.5 h-3.5" /> Амжилттай</span>}
                    {row.importStatus === "error" && <span className="flex items-center gap-1 text-destructive text-xs" title={row.errorMessage}><AlertCircle className="w-3.5 h-3.5 shrink-0" /><span className="truncate max-w-[160px]">{row.errorMessage}</span></span>}
                    {row.importStatus === "pending" && <span className="text-muted-foreground text-xs">Хүлээгдэж байна</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary + action */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {validRows.length} / {rows.length} мөр бүртгэхэд бэлэн
          {errorCount > 0 && ` · ${errorCount} мөр алдаатай (алгасагдана)`}
        </p>
        <Button
          type="button"
          onClick={handleImport}
          disabled={isUploading || validRows.length === 0}
          className="bg-[#0251CB] hover:bg-[#0241a1] text-white px-6 disabled:opacity-60"
        >
          {isUploading ? "Хадгалж байна..." : `${validRows.length} хөрөнгө бүртгэх`}
        </Button>
      </div>
    </div>
  )
}