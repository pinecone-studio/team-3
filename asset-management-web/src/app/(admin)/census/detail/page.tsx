'use client'
import { useGetCensusReportQuery } from '@/gql/graphql'
import { Badge, Button } from '@/libs'
import { Plus } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

const CensusDetailPage = () => {

    const searchParams = useSearchParams();
    const censusId = searchParams.get('censusId');
    const { data, loading } = useGetCensusReportQuery({
        variables: { censusId: censusId! },
        skip: !censusId,
    });
    const reports = data?.getCensusReport
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
                            <div className="flex  items-center justify-center  gap-3 w-[25%]">
                                <span className="text-3xl font-bold text-[#2F6FED]">
                                    {reports?.totalAssets}
                                </span>
                                <span className="text-sm text-muted-foreground">Нийт хөрөнгө</span>
                            </div>
                            <div className='w-px bg-gray-300'></div>
                            <div className="flex  items-center justify-center  gap-3 w-[25%]">
                                <span className="text-3xl font-bold text-[#2FBF9F]">
                                    {reports?.verifiedCount}
                                </span>
                                <span className="text-sm text-muted-foreground">Баталгаажсан</span>
                            </div>
                            <div className='w-px bg-gray-300'></div>
                            <div className="flex  items-center justify-center  gap-3 w-[25%]">
                                <span className="text-3xl font-bold text-[#E25568]">
                                    {reports?.actionItems}
                                </span>
                                <span className="text-sm text-muted-foreground">Зөрүү</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CensusDetailPage
