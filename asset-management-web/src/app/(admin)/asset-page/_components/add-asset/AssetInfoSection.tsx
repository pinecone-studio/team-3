"use client"

import {UseFormRegister, Controller, Control, FieldErrors, UseFormSetValue } from "react-hook-form"
import { Input, Field, FieldLabel, FieldError, FieldGroup } from "@/libs"
import { SearchableSelect } from "../../../asset-page/_components/SearchableSelect"
import { AssetFormValues } from "../../_utils/type"


type Option = { value: string; label: string }


  
  type Props = {
    control: Control<AssetFormValues>
    errors: FieldErrors<AssetFormValues>
    register: UseFormRegister<AssetFormValues>
    setValue: UseFormSetValue<AssetFormValues>
    selectedCategoryId: string
    categoryOptions: Option[]
    subCategoryOptions: Option[]
  }

export const AssetInfoSection = ({
    control,
    errors,
    register,
    setValue,
    selectedCategoryId,
    categoryOptions,
    subCategoryOptions,
}: Props) => {
    return (
        <div className="border rounded-lg p-5">
            <h3 className="font-semibold text-base mb-1">Хөрөнгийн мэдээлэл</h3>
            <p className="text-sm text-muted-foreground mb-5">Хөрөнгийн үндсэн мэдээлэл оруулах</p>
            <FieldGroup>
                <div className="grid grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel>Ангилал <span className="text-red-500">*</span></FieldLabel>
                        <Controller
                            control={control}
                            name="categoryId"
                            render={({ field }) => (
                                <SearchableSelect
                                    options={categoryOptions}
                                    value={field.value}
                                    onValueChange={(val) => {
                                        field.onChange(val)
                                        setValue("subCategoryId", "")
                                    }}
                                    placeholder="Ангилал сонгох"
                                    searchPlaceholder="Ангилал хайх"
                                />
                            )}
                        />
                        {errors.categoryId && <FieldError>{errors.categoryId.message}</FieldError>}
                    </Field>
                    <Field>
                        <FieldLabel>Дэд ангилал <span className="text-red-500">*</span></FieldLabel>
                        <Controller
                            control={control}
                            name="subCategoryId"
                            render={({ field }) => (
                                <SearchableSelect
                                    options={subCategoryOptions}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    placeholder={selectedCategoryId ? "Дэд ангилал сонгох" : "Эхлээд ангилал сонгоно уу"}
                                    searchPlaceholder="Дэд ангилал хайх"
                                />
                            )}
                        />
                        {errors.subCategoryId && <FieldError>{errors.subCategoryId.message}</FieldError>}
                    </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel>Серийн дугаар <span className="text-red-500">*</span></FieldLabel>
                        <Input placeholder="Жишээ нь : MON-2026-012" {...register("serialNumber")} />
                        {errors.serialNumber && <FieldError>{errors.serialNumber.message}</FieldError>}
                    </Field>
                    <Field>
                        <FieldLabel>Хөрөнгийн таг <span className="text-red-500">*</span></FieldLabel>
                        <Input placeholder="Эхлээд ангилилаа сонгоно уу" {...register("assetTag")} />
                        {errors.assetTag && <FieldError>{errors.assetTag.message}</FieldError>}
                    </Field>
                </div>
            </FieldGroup>
        </div>
    )
}