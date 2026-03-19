"use client"

import { Upload } from "lucide-react"
import { Button } from "@/libs"

export const CsvUploadTab = () => {
    return (
        <div className="border rounded-lg p-8 flex flex-col items-center justify-center min-h-[300px] text-center border-dashed">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">CSV файл оруулах</h3>
            <p className="text-sm text-muted-foreground mb-4">CSV файлаа энд чирж оруулах эсвэл сонгох</p>
            <Button variant="outline">Файл сонгох</Button>
        </div>
    )
}