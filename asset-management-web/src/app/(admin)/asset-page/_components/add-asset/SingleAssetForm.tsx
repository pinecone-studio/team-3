"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/libs"
import { useCreateAssetMutation, useGetCategoriesQuery, useGetSubCategoriesQuery } from "@/gql/graphql"
import { toast } from "sonner"
import { AssetFormValues, formSchema } from "../../_utils/type"
import { ImageUploadSection } from "./ImageUploadSection"
import { AssetInfoSection } from "./AssetInfoSection"
import { PurchaseInfoSection } from "./PurchaseInfoSection"


const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve((reader.result as string).split(",")[1])
        reader.onerror = reject
        reader.readAsDataURL(file)
    })

type Props = {
    onSuccess: () => void
    refetch:()=>void
}

export const SingleAssetForm = ({ onSuccess ,refetch}: Props) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const { data: categoriesData, refetch: categoryRefetch } = useGetCategoriesQuery()
    const { data: subCategoriesData, refetch: subCategoryRefetch } = useGetSubCategoriesQuery()
    const [createAsset, { loading }] = useCreateAssetMutation({
        onCompleted: () => {
            onSuccess()
            reset()
            setImagePreview(null)
            toast.success('Амжилттай бараа нэмлээ');
            refetch()
        }
    })

    const {
        register,
        handleSubmit,
        control,
        watch,
        resetField,
        setValue,
        reset,
        formState: { errors },
    } = useForm<AssetFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId: "",
            subCategoryId: "",
            serialNumber: "",
            assetTag: "",
            department:"",
        },
    })

    const selectedCategoryId = watch("categoryId")

    const categoryOptions = (categoriesData?.getCategories ?? []).map((cat) => ({
        value: cat.id,
        label: cat.name,
    }))

    const subCategoryOptions = (subCategoriesData?.getSubCategories ?? [])
        .filter((sub) => !selectedCategoryId || sub.categoryId === selectedCategoryId)
        .map((sub) => ({ value: sub.id, label: sub.name }))

    const handleImageChange = (file: File | null) => {
        if (!file) {
            setImagePreview(null)
            resetField("image")
            return
        }
        setValue("image", file, { shouldValidate: true })
        const reader = new FileReader()
        reader.onload = () => setImagePreview(reader.result as string)
        reader.readAsDataURL(file)
    }

    const onSubmit = async (values: AssetFormValues) => {
        const imageBase64 = await toBase64(values.image)

        await createAsset({
            variables: {
                input: {
                    assetTag: values.assetTag,
                    categoryId: values.categoryId,
                    subCategoryId:values.subCategoryId,
                    locationId:"asd",
                    serialNumber: values.serialNumber,
                    purchaseDate: values.purchaseDate.toISOString(),
                    purchaseCost: values.price,
                    imageBase64,
                    departmentId:values.department
                },
            },
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <AssetInfoSection
                control={control}
                errors={errors}
                register={register}
                setValue={setValue}
                selectedCategoryId={selectedCategoryId}
                categoryOptions={categoryOptions}
                subCategoryOptions={subCategoryOptions}
                categoryRefetch={categoryRefetch}
                subCategoryRefetch={subCategoryRefetch}
            />
            <ImageUploadSection
                control={control}
                errors={errors}
                imagePreview={imagePreview}
                onImageChange={handleImageChange}
            />
            <PurchaseInfoSection
                control={control}
                errors={errors}
                register={register}
            />
            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={loading}
                    className="bg-[#0251CB] hover:bg-[#0241a1] text-white px-8 disabled:opacity-60"
                >
                    {loading ? "Хадгалж байна..." : "Хадгалах"}
                </Button>
            </div>
        </form>
    )
}