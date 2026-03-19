"use client"

import { UseFormRegister, Controller, Control, FieldErrors, UseFormSetValue } from "react-hook-form"
import { Input, Field, FieldLabel, FieldError, FieldGroup } from "@/libs"
import { SearchableSelect } from "../../../asset-page/_components/SearchableSelect"
import { AssetFormValues } from "../../_utils/type"
import { useCreateCategoryMutation, useCreateSubCategoryMutation } from "@/gql/graphql"
import { toast } from "sonner"

type Option = { value: string; label: string }

type Props = {
  control: Control<AssetFormValues>
  errors: FieldErrors<AssetFormValues>
  register: UseFormRegister<AssetFormValues>
  setValue: UseFormSetValue<AssetFormValues>
  selectedCategoryId: string
  categoryOptions: Option[]
  subCategoryOptions: Option[]
  categoryRefetch: () => void
  subCategoryRefetch: () => void
}

export const AssetInfoSection = ({
  control,
  errors,
  register,
  setValue,
  selectedCategoryId,
  categoryOptions,
  subCategoryOptions,
  categoryRefetch,
  subCategoryRefetch,
}: Props) => {
  const [createCategory, { loading: categoryCreating }] = useCreateCategoryMutation()
  const [createSubCategory, { loading: subCategoryCreating }] = useCreateSubCategoryMutation()

  const handleCreateCategory = async (values: Record<string, string>) => {
    try {
      await createCategory({
        variables: {
          input: { name: values.name, description: values.description },
        },
      })
      toast.success("Ангилал амжилттай нэмэгдлээ")
      categoryRefetch()
    } catch (err) {
      toast.error("Ангилал нэмэхэд алдаа гарлаа")
      console.error(err)
    }
  }

  const handleCreateSubCategory = async (values: Record<string, string>) => {
    if (!selectedCategoryId) {
      toast.error("Эхлээд ангилал сонгоно уу")
      return
    }
    try {
      await createSubCategory({
        variables: {
          input: {
            name: values.name,
            categoryId: selectedCategoryId,
          },
        },
      })
      toast.success("Дэд ангилал амжилттай нэмэгдлээ")
      subCategoryRefetch()
    } catch (err) {
      toast.error("Дэд ангилал нэмэхэд алдаа гарлаа")
      console.error(err)
    }
  }

  return (
    <div className="border rounded-lg p-5">
      <h3 className="font-semibold text-base mb-1">Хөрөнгийн мэдээлэл</h3>
      <p className="text-sm text-muted-foreground mb-5">Хөрөнгийн үндсэн мэдээлэл оруулах</p>
      <FieldGroup>
        <div className="grid grid-cols-2 gap-4">
          {/* Ангилал */}
          <Field>
            <FieldLabel>
              Ангилал <span className="text-red-500">*</span>
            </FieldLabel>
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
                  createLabel="Шинэ ангилал нэмэх"
                  createFields={[
                    { key: "name", label: "Нэр", placeholder: "Ангилалын нэр", required: true },
                    { key: "description", label: "Тайлбар (Заавал биш)", placeholder: "Ангилалын тайлбар" },
                  ]}
                  onCreateNew={handleCreateCategory}
                  createLoading={categoryCreating}
                />
              )}
            />
            {errors.categoryId && <FieldError>{errors.categoryId.message}</FieldError>}
          </Field>

          {/* Дэд ангилал */}
          <Field>
            <FieldLabel>
              Дэд ангилал <span className="text-red-500">*</span>
            </FieldLabel>
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
                  createLabel="Шинэ дэд ангилал нэмэх"
                  createFields={[
                    { key: "name", label: "Нэр", placeholder: "Дэд ангилалын нэр", required: true },
                  ]}
                  onCreateNew={handleCreateSubCategory}
                  createLoading={subCategoryCreating}
                />
              )}
            />
            {errors.subCategoryId && <FieldError>{errors.subCategoryId.message}</FieldError>}
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel>
              Серийн дугаар <span className="text-red-500">*</span>
            </FieldLabel>
            <Input placeholder="Жишээ нь : MON-2026-012" {...register("serialNumber")} />
            {errors.serialNumber && <FieldError>{errors.serialNumber.message}</FieldError>}
          </Field>
          <Field>
            <FieldLabel>
              Хөрөнгийн таг <span className="text-red-500">*</span>
            </FieldLabel>
            <Input placeholder="Эхлээд ангилилаа сонгоно уу" {...register("assetTag")} />
            {errors.assetTag && <FieldError>{errors.assetTag.message}</FieldError>}
          </Field>
        </div>
      </FieldGroup>
    </div>
  )
}