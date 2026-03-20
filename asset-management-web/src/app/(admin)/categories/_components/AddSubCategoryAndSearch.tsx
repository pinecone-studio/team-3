'use client'
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Input, Textarea, Field, FieldLabel, FieldError, FieldGroup } from '@/libs'
import { Plus, Search } from 'lucide-react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Category, useCreateCategoryMutation, useCreateSubCategoryMutation } from '@/gql/graphql'
import { toast } from 'sonner'
import { useState } from 'react'

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Нэр хамгийн багадаа 1 тэмдэгт байх ёстой.")
    .max(32, "Нэр хамгийн ихдээ 32 тэмдэгт байх ёстой."),
  categoryId: z
    .string()
    .min(1, "Ангилал сонгоно уу."),
})

export const AddSubCategoryAndSearch = ({
  searchQuery,
  handleSearch,
  refetch,
  categories
}: {
  searchQuery: string
  handleSearch: (value: string) => void
  refetch: () => void
  categories: Category[] | undefined
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })
  const [open, setOpen] = useState(false);
  const [createSubCategory, { loading }] = useCreateSubCategoryMutation({
    onCompleted: () => {
      toast.success("Амжилттай нэмлээ");
      refetch();
      setOpen(false);
    },
    onError: () => {
      toast.error("Нэмэхэд алдаа гарлаа");
    },
  });
  async function onSubmit(data: z.infer<typeof formSchema>) {
    await createSubCategory({
      variables: {
        input: {
          name: data.name,
          categoryId: data.categoryId,
        },
      },
    });
  }
  return (
    <div className="flex justify-between">
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Дэд ангилалаар хайх"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="bg-blue-500 text-white py-2 px-3 rounded-xl text-[14px] flex items-center gap-2">
          <Plus size={15} />
          <p>Дэд Ангилал нэмэх</p>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Дэд Ангилал нэмэх</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="categoryId">Ангилал</FieldLabel>
                <select
                  id="categoryId"
                  aria-invalid={!!errors.categoryId}
                  {...register("categoryId")}
                  className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                >
                  <option value="">-- Ангилал сонгох --</option>
                  {categories?.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <FieldError>{errors.categoryId.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="name">Нэр</FieldLabel>
                <Input
                  id="name"
                  placeholder="Дэд ангилалын нэр"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
                {errors.name && (
                  <FieldError>{errors.name.message}</FieldError>
                )}
              </Field>
            </FieldGroup>

            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-600">
                {loading ? "Уншиж байна" : "Нэмэх"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}