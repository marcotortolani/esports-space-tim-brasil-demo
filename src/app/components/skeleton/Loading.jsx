import HorizontalLine from '@/app/components/ui/HorizontalLine'
import SectionSkeleton from "./SectionSkeleton"

export default function Loading() {
  return (
    <div className=" z-0 relative top-44 md:top-52 lg:top-64 w-full bg-transparent px-4 flex flex-col items-center justify-center">
      <SectionSkeleton />
      <div className=" w-full h-20 md:h-20 md:w-5/6 lg:max-w-4xl lg:w-4/6 flex justify-center items-center ">
        <HorizontalLine color={'default'} />
      </div>
      <SectionSkeleton />
      <div className="w-full h-60 lg:h-72"></div>
    </div>
  )
}
