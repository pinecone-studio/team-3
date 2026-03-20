'use client'
import { useGetCensusReportQuery, useGetCensusTasksByCensusIdQuery } from '@/gql/graphql'
import { Avatar, AvatarFallback, AvatarImage, Badge, Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/libs'
import { ChevronLeft, ChevronRight, MoreVertical, Plus, Search } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'


const CensusDetailPage = () => {
    const searchParams = useSearchParams();
    const censusId = searchParams.get('censusId');
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')
    const [employeeFilter, setEmployeeFilter] = useState<string>('all')
    const [categoryFilter, setCategoryFilter] = useState<string>('all')
    const itemsPerPage = 8

    const { data, loading } = useGetCensusReportQuery({
        variables: { censusId: censusId! },
        skip: !censusId,
    });
    const reports = data?.getCensusReport

    const { data: censusData } = useGetCensusTasksByCensusIdQuery({
        variables: { censusId: censusId! },
        skip: !censusId
    })

    const tasks = censusData?.getCensusTasksByCensusId || []
    const atask = tasks.filter((task) => task.verifiedAt === null)

    const filteredTasks = atask.filter((task: any) => {
        const matchesSearch = searchQuery === '' ||
            task.asset?.assetTag?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.employees?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.employees?.lastName?.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesEmployee = employeeFilter === 'all' || task.employees?.id === employeeFilter
        const matchesCategory = categoryFilter === 'all' || task.asset?.category?.id === categoryFilter

        return matchesSearch && matchesEmployee && matchesCategory
    })


    const totalPages = Math.ceil(filteredTasks.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedTasks = filteredTasks.slice(startIndex, startIndex + itemsPerPage)


    const uniqueEmployees = Array.from(new Map(tasks.map((t: any) => [t.employees?.id, t.employees])).values()).filter(Boolean)
    const uniqueCategories = Array.from(new Map(tasks.map((t: any) => [t.asset?.category?.id, t.asset?.category])).values()).filter(Boolean)

    const getInitials = (firstName?: string, lastName?: string) => {
        const first = firstName?.charAt(0)?.toUpperCase() || ''
        const last = lastName?.charAt(0)?.toUpperCase() || ''
        return first + last
    }

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Тооллого</h1>
                    <p className="text-sm text-muted-foreground">
                        Хөрөнгийн баталгаажуулалт, аудитын мөчлөгийг удирдах
                    </p>
                </div>

                {/* Census Card */}
                <div className="rounded-xl border border-border bg-card shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-5">
                        {/* Census Name and Status */}
                        <div className="flex items-center gap-3 md:min-w-[300px] w-[25%]">
                            <span className="font-medium text-foreground">
                                2026 1-р улирлын тооллого
                            </span>
                            <Badge
                                variant="outline"
                                className="bg-muted/50 text-muted-foreground border-border rounded-md px-3 py-1 text-xs font-medium"
                            >
                                Дууссан
                            </Badge>
                        </div>

                        <div className="flex flex-1 items-stretch gap-8 md:gap-16 ">
                            <div className='w-px bg-gray-300'></div>
                            <div className="flex items-center justify-center gap-3 w-[25%]">
                                <span className="text-3xl font-bold text-[#2F6FED]">
                                    {reports?.totalAssets}
                                </span>
                                <span className="text-sm text-muted-foreground">Нийт хөрөнгө</span>
                            </div>
                            <div className='w-px bg-gray-300'></div>
                            <div className="flex items-center justify-center gap-3 w-[25%]">
                                <span className="text-3xl font-bold text-[#2FBF9F]">
                                    {reports?.verifiedCount}
                                </span>
                                <span className="text-sm text-muted-foreground">Баталгаажсан</span>
                            </div>
                            <div className='w-px bg-gray-300'></div>
                            <div className="flex items-center justify-center gap-3 w-[25%]">
                                <span className="text-3xl font-bold text-[#E25568]">
                                {(reports?.totalAssets ?? 0) - (reports?.verifiedCount ?? 0)}
                                </span>
                                <span className="text-sm text-muted-foreground">Зөрүү</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4">
                    <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Ажилтан" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Бүх ажилтан</SelectItem>
                            {uniqueEmployees.map((emp: any) => (
                                <SelectItem key={emp?.id} value={emp?.id || ''}>
                                    {emp?.firstName} {emp?.lastName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Ангилал" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Бүх ангилал</SelectItem>
                            {uniqueCategories.map((cat: any) => (
                                <SelectItem key={cat?.id} value={cat?.id || ''}>
                                    {cat?.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Хөрөнгийн таг, ажилтнаар хайх..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-xl border border-border bg-card shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[150px]">Зураг</TableHead>
                                <TableHead>Ажилтан</TableHead>
                                <TableHead>Ангилал</TableHead>
                                <TableHead>Байршил</TableHead>
                                <TableHead>Хөрөнгө таг</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedTasks.map((task: any) => (
                                <TableRow key={task.id}>
                                    <TableCell>
                                        <div className="w-24 h-16 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                                            {task.asset?.imageUrl ? (
                                                <img
                                                    src={task.asset.imageUrl}
                                                    alt={task.asset.name || 'Asset'}
                                                    className="w-full h-full object-contain"
                                                />
                                            ) : (
                                                <div className="text-muted-foreground text-xs">No image</div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={task.employees?.imageUrl || ''} />
                                                <AvatarFallback className="text-xs bg-muted">
                                                    {getInitials(task.employees?.firstName, task.employees?.lastName)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium text-foreground">
                                                    {task.employees?.lastName?.charAt(0)}. {task.employees?.firstName}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    {task.employees?.department}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-foreground">
                                            {task.asset?.category?.name || '-'}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-muted-foreground">
                                            {task.asset?.locationId || '-'}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-medium text-foreground">
                                            {task.asset?.assetTag || '-'}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Дэлгэрэнгүй харах</DropdownMenuItem>
                                                <DropdownMenuItem>Засах</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    <div className="flex items-center justify-between px-4 py-4 border-t border-border">
                        <div className="text-sm text-muted-foreground">
                            {filteredTasks.length} зөрүүнээс {paginatedTasks.length}-г харуулж байна
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4 mr-1" />
                                Өмнөх
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages || totalPages === 0}
                            >
                                Дараах
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CensusDetailPage
