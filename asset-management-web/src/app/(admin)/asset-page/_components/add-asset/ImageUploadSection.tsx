"use client"

import { ImageIcon, X } from "lucide-react"
import { Controller, Control, FieldErrors } from "react-hook-form"
import { FieldError } from "@/libs"
import { AssetFormValues } from "../../_utils/type"


type Props = {
    control: Control<AssetFormValues>
    errors: FieldErrors<AssetFormValues>
    imagePreview: string | null
    onImageChange: (file: File | null) => void
}

export const ImageUploadSection = ({ control, errors, imagePreview, onImageChange }: Props) => {
    return (
        <div className="border rounded-lg p-5">
            <h3 className="font-semibold text-base mb-1">Зураг</h3>
            <p className="text-sm text-muted-foreground mb-4">JPG, PNG, WEBP — 5MB хүртэл</p>

            <Controller
                control={control}
                name="image"
                render={() => (
                    <div>
                        {imagePreview ? (
                            <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                                <img
                                    src={imagePreview}
                                    alt="preview"
                                    className="w-full h-full object-contain bg-muted"
                                />
                                <button
                                    type="button"
                                    onClick={() => onImageChange(null)}
                                    className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ) : (
                            <label
                                className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault()
                                    const file = e.dataTransfer.files?.[0]
                                    if (file) onImageChange(file)
                                }}
                            >
                                <ImageIcon className="w-8 h-8 text-muted-foreground mb-2" />
                                <span className="text-sm text-muted-foreground">
                                    Зураг чирэх эсвэл <span className="text-[#0251CB] font-medium">сонгох</span>
                                </span>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    className="hidden"
                                    onChange={(e) => onImageChange(e.target.files?.[0] ?? null)}
                                />
                            </label>
                        )}
                    </div>
                )}
            />
            {errors.image && <FieldError className="mt-2">{errors.image.message}</FieldError>}
        </div>
    )
}