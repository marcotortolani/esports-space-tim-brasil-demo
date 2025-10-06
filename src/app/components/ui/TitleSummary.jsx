import { cn } from '@/lib/utils'
export function TitleSummary({
  title,
  icon = null,
  className = '',
}) {
  const Icon = icon
  return (
    <h2
      className={cn(
        `w-fit px-5 py-1 mb-0 flex items-center gap-2 rounded-full
        uppercase text-white font-poppins font-semibold tracking-wide text-base md:text-lg lg:text-2xl `,
        className
      )}
    >
      {Icon && (
        <div className=" w-4 h-4 md:w-6 md:h-6 ">
          <Icon width={'100%'} height={'100%'} />
        </div>
      )}
      {title}
    </h2>
  )
}
