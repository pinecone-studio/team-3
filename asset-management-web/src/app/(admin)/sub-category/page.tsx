"use client"

import { useState } from "react"
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/libs"
import {
  useGetCategoriesQuery,
  useGetSubCategoriesWithCategoryQuery
} from "@/gql/graphql"

import { SubCategoryPagination } from "./_components/SubCategoryPagination"
import { AddSubCategoryAndSearch } from "./_components/AddSubCategoryAndSearch"
import { DeleteAndEditCategory } from "./_components/DeleteAndEditSubCategory"
import { SubCategoryHeader } from "./_components/SubCategoryHeader"

export default function CategoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState("10")
  const { data: categoryData } = useGetCategoriesQuery()
  const { data, refetch, loading } = useGetSubCategoriesWithCategoryQuery()
  const subCategories = data?.getSubCategoriesWithCategory ?? []
  const categories = categoryData?.getCategories

  const filteredCategories = subCategories.filter((category) =>
    category.sub_categories.name.toLowerCase().includes(searchQuery.toLowerCase())
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
      setSelectedCategories(paginatedCategories.map((c) => c.sub_categories.id))
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
    paginatedCategories.every((c) => selectedCategories.includes(c.sub_categories.id))

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-bold text-[22px]">Дэд ангилал</h1>
      <AddSubCategoryAndSearch
        refetch={refetch}
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        categories={categories}
      />
      <div className="border rounded-lg">
        <SubCategoryHeader
          filteredCategories={filteredCategories}
          selectedCategories={selectedCategories}
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-center">Use For</TableHead>
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
                  Дэд ангилал байхгүй байна
                </TableCell>
              </TableRow>
            ) : (
              paginatedCategories.map((category) => {
                const categoryName = category.categories?.name ?? "-"
                return (
                  <TableRow key={category.sub_categories.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedCategories.includes(category.sub_categories.id)}
                        onCheckedChange={(checked) =>
                          handleSelectCategory(category.sub_categories.id, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {category.sub_categories.name}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                        {categoryName}
                      </span>
                    </TableCell>
                    <DeleteAndEditCategory
                      refetch={refetch}
                      category={category.sub_categories ?? undefined}
                      categoryId={category.sub_categories.id}
                    />
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
        <SubCategoryPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          handleItemsPerPage={handleItemsPerPage}
        />
      </div>
    </div>
  )
}

