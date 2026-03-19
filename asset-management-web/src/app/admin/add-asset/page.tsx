import { ChevronRight } from "lucide-react"

const AddAssetPage = () => {
    return (
        <div className="flex items-center gap-[1.5px]">
            <h1 className="text-[24px] font-semibold leading-[125%] text-[#666666]">
                Хөрөнгө
            </h1>
            <ChevronRight width={22} height={22} />
            <h1 className="text-[24px] font-semibold leading-[125%] text-gray-900">
                Хөрөнгө нэмэх
            </h1> 
        </div>
    )
}

export default AddAssetPage