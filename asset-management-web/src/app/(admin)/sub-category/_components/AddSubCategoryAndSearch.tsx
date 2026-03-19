'use client'
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Input, Textarea, Field, FieldLabel, FieldError, FieldGroup } from '@/libs'
import { Plus, Search } from 'lucide-react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useCreateCategoryMutation } from '@/gql/graphql'
import { toast } from 'sonner'
import { useState } from 'react'

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Нэр хамгийн багадаа 1 тэмдэгт байх ёстой.")
    .max(32, "Нэр хамгийн ихдээ 32 тэмдэгт байх ёстой."),
    description: z
    .string()
    .trim()
    .min(5, "Тайлбар хамгийн багадаа 5 тэмдэгт байх ёстой.")
    .max(100, "Тайлбар хамгийн ихдээ 100 тэмдэгт байх ёстой.")
    .optional()
    .or(z.literal("")), 
})

export const AddCategoryAndSearch = ({
  searchQuery,
  handleSearch,
  refetch
}: {
  searchQuery: string
  handleSearch: (value: string) => void
  refetch:()=>void
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })
  const [open, setOpen] = useState(false);
  const [createCategory, { loading }] = useCreateCategoryMutation({
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
    await createCategory({
        variables: {
          input: {
            name: data.name,
            ...(data.description?.trim()
              ? { description: data.description }
              : {}),
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
          <p>Ангилал нэмэх</p>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ангилал нэмэх</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Нэр</FieldLabel>
                <Input
                  id="name"
                  placeholder="Ангилалын нэр"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
                {errors.name && (
                  <FieldError>{errors.name.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="description">Тайлбар</FieldLabel>
                <Textarea
                  id="description"
                  placeholder="Ангилалын тайлбар (optional)"
                  className="resize-none"
                  aria-invalid={!!errors.description}
                  {...register("description")}
                />
                {errors.description && (
                  <FieldError>{errors.description.message}</FieldError>
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