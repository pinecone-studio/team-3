import { useDeleteCategoryMutation } from '@/gql/graphql'
import { Button, TableCell } from '@/libs'
import { Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

export const DeleteAndEditCategory = ({ categoryId,categoryName,refetch }: { categoryId: string,categoryName:string ,refetch:()=>void}) => {
    const [deleteCategoryById, { loading }] = useDeleteCategoryMutation({onCompleted:()=>{toast.success(`Амжилттай ${categoryName} ангилалыг устгалаа`);refetch()}})

    const deleteHandler = async () => {
        await deleteCategoryById({
            variables: { deleteCategoryId: categoryId }
        })
    }

    return (
        <TableCell>
            <div className="flex items-center justify-center gap-1">
                <Button variant="ghost" size="icon-sm">
                    <Pencil className="h-4 w-4" />
                </Button>
                <Button
                    onClick={deleteHandler}
                    variant="ghost"
                    size="icon-sm"
                    disabled={loading}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </TableCell>
    )
}