"use client"

import { useState } from "react"
import { Checkbox, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/libs"
import {  useGetCategoriesWithAssetsQuery } from "@/gql/graphql"
import { CategoryHeader } from "./_components/CategoryHeader"
import { CategoryPagination } from "./_components/CategoryPagination"
import { AddCategoryAndSearch } from "./_components/AddCategoryAndSearch"
import { DeleteAndEditCategory } from "./_components/DeleteAndEditCategory"

export default function CategoryPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState("10")

    const { data, loading, refetch } = useGetCategoriesWithAssetsQuery()
    const categories = data?.getCategories ?? []

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
    )


    const perPage = parseInt(itemsPerPage)
    const totalPages = Math.max(1, Math.ceil(filteredCategories.length / perPage))
    const paginatedCategories = filteredCategories.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    )

    const handleSearch = (value: string) => {
        setSearchQuery(value)
        setCurrentPage(1)
    }

    const handleItemsPerPage = (value: string) => {
        setItemsPerPage(value)
        setCurrentPage(1)
    }

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedCategories(paginatedCategories.map((c) => c.id))
        } else {
            setSelectedCategories([])
        }
    }

    const handleSelectCategory = (id: string, checked: boolean) => {
        if (checked) {
            setSelectedCategories((prev) => [...prev, id])
        } else {
            setSelectedCategories((prev) => prev.filter((cId) => cId !== id))
        }
    }

    const isAllSelected =
        paginatedCategories.length > 0 &&
        paginatedCategories.every((c) => selectedCategories.includes(c.id))

    return (
        <div className="p-6 space-y-6">
            <h1 className="font-bold text-[22px]">Categories</h1>
            <AddCategoryAndSearch refetch={refetch} searchQuery={searchQuery} handleSearch={handleSearch} />
            <div className="border rounded-lg">
                <CategoryHeader  filteredCategories={filteredCategories} selectedCategories={selectedCategories} />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">
                                <Checkbox
                                    checked={isAllSelected}
                                    onCheckedChange={handleSelectAll}
                                />
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead >Description</TableHead>
                            <TableHead className="text-center">Assets</TableHead>
                            <TableHead className="text-center">Actions</TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : paginatedCategories.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                                    No categories found
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedCategories.map((category) => {
                                const assetCount = category.assets?.length ?? 0
                                return (
                                    <TableRow key={category.id}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedCategories.includes(category.id)}
                                                onCheckedChange={(checked) =>
                                                    handleSelectCategory(category.id, checked as boolean)
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                {category.name}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                {category.description}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {assetCount > 0 ? (
                                                <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                                                    {assetCount}
                                                </span>
                                            ) : (
                                                <span className="text-muted-foreground">0</span>
                                            )}
                                        </TableCell>
                                        <DeleteAndEditCategory refetch={refetch} category={category} categoryId={category.id} />
                                    </TableRow>
                                )
                            })
                        )}
                    </TableBody>
                </Table>
                <CategoryPagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} itemsPerPage={itemsPerPage} handleItemsPerPage={handleItemsPerPage} />
            </div>
        </div>
    )
}