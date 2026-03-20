"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/libs"
import { useState } from "react"
import CategoryPage from "./_components/Category"
import SubCategoryPage from "./_components/SubCategory"


export default function CategoriesPage() {
  const [activeTab, setActiveTab] = useState("categories")

  return (
    <div className="p-6 space-y-6">
      <h1 className="font-bold text-2xl">Ангилал удирдлага</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="categories">Ангилал</TabsTrigger>
          <TabsTrigger value="subcategories">Дэд ангилал</TabsTrigger>
        </TabsList>
        
        <TabsContent value="categories" className="mt-6">
          <CategoryPage />
        </TabsContent>
        
        <TabsContent value="subcategories" className="mt-6">
          <SubCategoryPage />
        </TabsContent>
      </Tabs>
    </div>
  )
}
