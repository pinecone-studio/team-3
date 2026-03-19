"use client"

import { useState } from "react";
import {   SubCategory,  useDeleteSubCategoryByIdMutation,  useEditSubCategoryByIdMutation } from '@/gql/graphql';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Input, TableCell } from '@/libs';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

type DeleteAndEditCategoryProps = {
    categoryId: string
    category: SubCategory | null | undefined
    refetch: () => void
  }

export const DeleteAndEditCategory = ({ categoryId, category, refetch }: DeleteAndEditCategoryProps) => {
  const [isOpen,setIsOpen] = useState(false)
  const [name, setName] = useState(category?.name ?? "");

  const [DeleteSubCategoryById, { loading: deleting }] = useDeleteSubCategoryByIdMutation({
    onCompleted: () => { 
      toast.success(`Амжилттай ${category?.name ?? ""} ангилалыг устгалаа`); 
      refetch(); 
    } 
  });

  const [EditSubCategoryById, { loading: editing }] = useEditSubCategoryByIdMutation({
    onCompleted: () => {
      toast.success(`Амжилттай ${category?.name ?? ""} ангилалыг заслаа`);
      refetch();
      setIsOpen(false)
    }
  });

  const deleteHandler = async () => {
    await DeleteSubCategoryById({ variables: { deleteSubCategoryByIdId: categoryId } });
  };

  const editHandler = async () => {
    if (!category) return
    await EditSubCategoryById({
      variables: {
        input: {
          id: category.id,
          name,
        }
      }
    });
  };

  return (
    <TableCell className="">
      <div className="flex items-center justify-center gap-1">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
            <Pencil className="h-4 w-4 cursor-pointer" />
          </DialogTrigger>
          <DialogContent className='flex flex-col gap-6'>
            <DialogHeader>
              <DialogTitle>Дэд ангилал засах</DialogTitle>
            </DialogHeader>

            <div className='flex flex-col gap-1'>
              <p>Нэр:</p>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <Button onClick={editHandler} disabled={editing || !category}>Хадгалах</Button>
          </DialogContent>
        </Dialog>

        <Button
          onClick={deleteHandler}
          variant="ghost"
          size="icon-sm"
          disabled={deleting || !category}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </TableCell>
  );
};