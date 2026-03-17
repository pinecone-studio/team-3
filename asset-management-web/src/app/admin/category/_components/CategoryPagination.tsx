import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/libs'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

type  CategoryPaginationProps = {
    currentPage:number
    setCurrentPage: Dispatch<SetStateAction<number>>
    totalPages:number
    itemsPerPage:string
    handleItemsPerPage: (value: string) => void
}
export const CategoryPagination = ({currentPage,setCurrentPage,totalPages,itemsPerPage,handleItemsPerPage}:CategoryPaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-4 p-4 border-t">
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="icon-sm"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(1)}
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon-sm"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((p) => p - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
    </div>

    <span className="text-sm">
      Page {currentPage} of {totalPages}
    </span>

    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="icon-sm"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((p) => p + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon-sm"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(totalPages)}
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>

    <Select value={itemsPerPage} onValueChange={handleItemsPerPage}>
      <SelectTrigger className="w-16">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="20">20</SelectItem>
        <SelectItem value="50">50</SelectItem>
      </SelectContent>
    </Select>

    <span className="text-sm text-muted-foreground">Categories per page</span>
  </div>
  )
}

