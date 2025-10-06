import SectionSkeleton from '../components/skeleton/SectionSkeleton'

export default function loading() {
  return (
    <div className=" z-0 relative top-44 md:top-52 lg:top-64 w-full bg-transparent px-4 flex flex-col items-center justify-center">
      <SectionSkeleton />
      <div className="w-full h-60 lg:h-72"></div>
    </div>
  )
}
