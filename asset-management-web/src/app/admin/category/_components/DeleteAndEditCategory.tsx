import { useState } from "react";
import { Category, useDeleteCategoryMutation, useEditCategoryByIdMutation } from '@/gql/graphql';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Input, TableCell } from '@/libs';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export const DeleteAndEditCategory = ({ categoryId, category, refetch }: { categoryId: string, category: Category, refetch: () => void }) => {
    const [isOpen,setIsOpen] = useState(false)
    const [name, setName] = useState(category.name || "");
    const [description, setDescription] = useState(category.description || "");

    const [deleteCategoryById, { loading: deleting }] = useDeleteCategoryMutation({
        onCompleted: () => { 
            toast.success(`Амжилттай ${category.name} ангилалыг устгалаа`); 
            refetch(); 
        } 
    });

    const [editCategoryById, { loading: editing }] = useEditCategoryByIdMutation({
        onCompleted: () => {
            toast.success(`Амжилттай ${category.name} ангилалыг заслаа`);
            refetch();
            setIsOpen(false)
        }
    });

    const deleteHandler = async () => {
        await deleteCategoryById({
            variables: { deleteCategoryId: categoryId }
        });
    };

    const editHandler = async () => {
        await editCategoryById({
            variables: {
                input: {
                    id:category.id,
                    name,
                    description
                }
            }
        });
    };

    return (
        <TableCell >
            <div className="flex items-center justify-center gap-1">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger>
                        <Pencil className="h-4 w-4" />
                    </DialogTrigger>
                    <DialogContent className='flex flex-col gap-6'>
                        <DialogHeader>
                            <DialogTitle>Ангилал засах</DialogTitle>
                        </DialogHeader>

                        <div className='flex flex-col gap-1'>
                            <p>Нэр:</p>
                            <Input value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <p>Тайлбар:</p>
                            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>

                        <Button onClick={editHandler} disabled={editing}>Хадгалах</Button>
                    </DialogContent>
                </Dialog>

                <Button
                    onClick={deleteHandler}
                    variant="ghost"
                    size="icon-sm"
                    disabled={deleting}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </TableCell>
    );
};