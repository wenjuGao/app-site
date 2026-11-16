import { cn } from '@/lib/utils'

interface ShinyTextProps {
  text: string
  className?: string
  speed?: number
}

export default function ShinyText({ text, className = '', speed = 5 }: ShinyTextProps) {
  return (
    <span
      className={cn('shiny-text inline-block', className)}
      style={{ animationDuration: `${speed}s` }}
    >
      {text}
    </span>
  )
}
