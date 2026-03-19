import * as z from "zod"

export const formSchema = z.object({
    categoryId: z.string().min(1, "Ангилал заавал сонгоно уу"),
    subCategoryId: z.string().min(1, "Дэд ангилал заавал сонгоно уу"),
    serialNumber: z.string().min(1, "Серийн дугаар заавал оруулна уу"),
    assetTag: z.string().min(1, "Хөрөнгийн таг заавал оруулна уу"),
    purchaseDate: z.date({ error: "Худалдан авсан огноо заавал сонгоно уу" }),
    price: z.number({ error: "Үнэ заавал оруулна уу" }).positive("Үнэ 0-ээс их байна уу"),
    usageDuration: z.number({ error: "Ашиглалтын хугацаа заавал оруулна уу" }).positive("Ашиглалтын хугацаа 0-ээс их байна уу"),
    image: z
        .instanceof(File, { message: "Зураг заавал оруулна уу" })
        .refine((f) => f.size <= 5 * 1024 * 1024, "Зургийн хэмжээ 5MB-аас ихгүй байна уу")
        .refine((f) => ["image/jpeg", "image/png", "image/webp"].includes(f.type), "Зөвхөн JPG, PNG, WEBP зураг оруулна уу"),
})

export type AssetFormValues = z.infer<typeof formSchema>