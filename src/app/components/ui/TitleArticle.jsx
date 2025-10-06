import { cn } from '@/lib/utils'

export function TitleArticle({ title, icon = null, className = '' }) {
  const Icon = icon
  return (
    <h3
      className={cn(
        ` w-fit px-5 py-1 mb-0 flex items-center gap-2 rounded-full 
        uppercase text-white font-poppins font-semibold tracking-wide text-base md:text-lg lg:text-2xl`,
        className
      )}
    >
      {icon && (
        <div className=" w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10">
          <Icon width={'100%'} height={'100%'} />
        </div>
      )}
      {title}
    </h3>
  )
}
