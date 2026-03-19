"use client"

import { Controller, Control, FieldErrors, UseFormRegister } from "react-hook-form"
import { Input, Field, FieldLabel, FieldError, FieldGroup } from "@/libs"
import { DatePicker } from "../../../asset-page/_components/DatePicker"
import { AssetFormValues } from "../../_utils/type"


type Props = {
    control: Control<AssetFormValues>
    errors: FieldErrors<AssetFormValues>
    register: UseFormRegister<AssetFormValues>
}

export const PurchaseInfoSection = ({ control, errors, register }: Props) => {
    return (
        <div className="border rounded-lg p-5">
            <h3 className="font-semibold text-base mb-1">Худалдан авалтын мэдээлэл</h3>
            <p className="text-sm text-muted-foreground mb-5">Хөрөнгийн үндсэн мэдээлэл оруулах</p>
            <FieldGroup>
                <div className="grid grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel>Худалдан авсан огноо <span className="text-red-500">*</span></FieldLabel>
                        <Controller
                            control={control}
                            name="purchaseDate"
                            render={({ field }) => (
                                <DatePicker value={field.value} onChange={field.onChange} placeholder="Огноо сонгох" />
                            )}
                        />
                        {errors.purchaseDate && <FieldError>{errors.purchaseDate.message}</FieldError>}
                    </Field>
                    <Field>
                        <FieldLabel>Үнэ <span className="text-red-500">*</span></FieldLabel>
                        <Input type="number" placeholder="0" {...register("price", { valueAsNumber: true })} />
                        {errors.price && <FieldError>{errors.price.message}</FieldError>}
                    </Field>
                </div>
                <Field>
                    <FieldLabel>Ашиглалтын хугацаа ( жил ) <span className="text-red-500">*</span></FieldLabel>
                    <Input type="number" placeholder="0" {...register("usageDuration", { valueAsNumber: true })} />
                    {errors.usageDuration && <FieldError>{errors.usageDuration.message}</FieldError>}
                </Field>
            </FieldGroup>
        </div>
    )
}