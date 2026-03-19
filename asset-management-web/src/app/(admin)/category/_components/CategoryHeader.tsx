import { AssetStatusEnum, useDeleteCategoryByIdsMutation } from '@/gql/graphql'
import { Button, Popover, PopoverContent, PopoverTrigger } from '@/libs'
import { Trash } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

export type filteredCategories =  {
    __typename?: "Category";
    id: string;
    name: string;
    description?: string | null;
    assets?: Array<{
        __typename?: "Asset";
        id: string;
        assetTag: string;
        serialNumber?: string | null;
        status: AssetStatusEnum;
        purchaseDate?: string | null;
        purchaseCost?: number | null;
        currentBookValue?: number | null;
        locationId?: string | null;
        assignedTo?: string | null;
        deletedAt?: string | null;
        imageUrl: string;
        category?: {
            __typename?: "Category";
            id: string;
            name: string;
            description?: string | null;
        } | null;
    }> | null;
}[]

type CategoryHeaderProps = {
    filteredCategories: filteredCategories
    selectedCategories: string[]
    refetch:()=> void
}
export const CategoryHeader = ({ filteredCategories, selectedCategories ,refetch}: CategoryHeaderProps) => {
    const [isOpen,setIsOpen] = useState(false)
    const [deleteAllCategory, { loading }] = useDeleteCategoryByIdsMutation({onCompleted:()=>{toast.success("Амжилттай бүх ангилалийг устгалаа");refetch();setIsOpen(false)}})
    const deleteHandler = async () => {
        await deleteAllCategory({ variables: { ids: selectedCategories } })
    }
    return (
        <div className="flex items-center justify-between p-4 border-b">
            <div>
                <h2 className="font-semibold">Categories</h2>
                <p className="text-sm text-muted-foreground">
                    {filteredCategories.length} categories
                </p>
            </div>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild disabled={selectedCategories.length === 0}>
                    <Button variant="outline" disabled={selectedCategories.length === 0}>
                        Actions
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-[15x0px] pr-20 py-2 mt-1 mr-15 '>
                    <button disabled={loading} onClick={deleteHandler}  className='flex items-center gap-2 cursor-pointer'><Trash size={18} /><p>{loading ? "Deleting":"Delete"}</p></button>
                </PopoverContent>
            </Popover>

        </div>
    )
}
