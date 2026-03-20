import {  GetSubCategoriesWithCategoryQuery, useDeleteCategoryByIdsMutation } from '@/gql/graphql'
import { Button, Popover, PopoverContent, PopoverTrigger } from '@/libs'
import { Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
type CategoryHeaderProps = {
    filteredCategories: GetSubCategoriesWithCategoryQuery["getSubCategoriesWithCategory"]
    selectedCategories: string[]
  }


  export const SubCategoryHeader = ({
    filteredCategories,
    selectedCategories
  }: CategoryHeaderProps) => {
    const [deleteAllCategory, { loading }] = useDeleteCategoryByIdsMutation({
      onCompleted: () => {
        toast.success("Амжилттай бүх ангилалийг устгалаа")
      }
    })
  
    const deleteHandler = async () => {
      await deleteAllCategory({ variables: { ids: selectedCategories } })
    }
  
    return (
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h2 className="font-semibold">Дэд ангилал</h2>
          <p className="text-sm text-muted-foreground">{filteredCategories.length} дэд ангилал</p>
        </div>
        <Popover>
          <PopoverTrigger asChild disabled={selectedCategories.length === 0}>
            <Button variant="outline" disabled={selectedCategories.length === 0}>
              Actions
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[150px] pr-4 py-2 mt-1">
            <button
              disabled={loading}
              onClick={deleteHandler}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Trash size={18} />
              <p>{loading ? "Deleting" : "Delete"}</p>
            </button>
          </PopoverContent>
        </Popover>
      </div>
    )
  }