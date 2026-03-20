import React from 'react'
import { StatDisplay } from './StatDisplay'

const CensusStatus = ({censusView}:{censusView:any}) => {
    return (
        <div className="flex border border-gray-200 rounded- flex-wrap md:flex-nowrap divide-x rounded-2xl divide-gray-50 border-b">
            <div className="flex-1 p-6 min-w-62.5 flex items-center justify-center">
                <div className="flex items-center gap-3">
                    <span className="font-semibold text-sm">
                        {censusView.event.name}
                    </span>
                    <span className="bg-[#E6FCF5] text-[#20C997] text-[10px] px-2 py-0.5 rounded-md font-bold">
                        Идэвхтэй
                    </span>
                </div>
            </div>

            <StatDisplay
                value={censusView.stats.total}
                label="Нийт хөрөнгө"
                color="text-[#4C6EF5]"
            />
            <StatDisplay
                value={censusView.stats.confirmed}
                label="Баталгаажсан"
                color="text-[#20C997]"
            />
            <StatDisplay
                value={censusView.stats.pending}
                label="Хүлээгдэж буй"
                color="text-[#FAB005]"
            />
        </div>
    )
}

export default CensusStatus