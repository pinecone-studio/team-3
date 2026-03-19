"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import {
    Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
    Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/libs"
import { SingleAssetForm } from "./SingleAssetForm"
import { CsvUploadTab } from "./CsvUploadTab"


export const AddAsset = () => {
    const [open, setOpen] = useState(false)

    const handleOpenChange = (val: boolean) => {
        setOpen(val)
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button className="bg-[#0251CB] hover:bg-[#0241a1] h-[40px] px-5 text-white cursor-pointer text-[14px] font-semibold rounded-lg flex items-center gap-2 transition-colors">
                    <Plus size={18} />
                    Хөрөнгө нэмэх
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[600px] p-0 gap-0">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="text-xl font-semibold">Хөрөнгө нэмэх</DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="single" className="w-full">
                    <TabsList className="w-full bg-transparent h-auto p-0 px-6 mt-4 gap-0 border-b rounded-none">
                        <TabsTrigger value="single" className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-[#0251CB] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 pb-3 text-sm font-medium data-[state=active]:text-foreground">
                            Нэг хөрөнгө
                        </TabsTrigger>
                        <TabsTrigger value="csv" className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-[#0251CB] data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 pb-3 text-sm font-medium data-[state=active]:text-foreground">
                            CSV файлаар олон хөрөнгө
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="single" className="p-6 pt-4 mt-0 max-h-[80vh] overflow-y-auto">
                        <SingleAssetForm onSuccess={() => setOpen(false)} />
                    </TabsContent>

                    <TabsContent value="csv" className="p-6 pt-4 mt-0">
                        <CsvUploadTab />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}

