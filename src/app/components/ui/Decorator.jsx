import { cn } from '@/lib/utils'

export function Decorator({ solid = false, className = '' }) {
  return (
    <div
      className={cn(
        ` relative w-full h-8 flex items-center justify-center rounded-full`,
        className
      )}
    >
      <div
        className={`z-10 absolute translate-x-0 w-full h-full rounded-[inherit] ${
          solid ? 'bg-Tertiary' : 'border-2 border-Tertiary'
        } `}
      />
      <div
        className={`z-20 absolute translate-x-[8%] w-full h-full rounded-[inherit] ${
          solid
            ? 'bg-gradient-to-r from-purple-400/80 via-purple-700 to-purple-400'
            : 'border-2 border-Secondary'
        } `}
      />
      <div
        className={`z-30 absolute translate-x-[24%] w-full h-full rounded-[inherit] ${
          solid ? 'bg-Primary' : 'border-2 border-Primary'
        } `}
      />
    </div>
  )
}
