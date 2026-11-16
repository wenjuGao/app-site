'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface FadeContentProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  blur?: boolean
  threshold?: number
  initialOpacity?: number
}

export default function FadeContent({
  children,
  className = '',
  delay = 0,
  duration = 600,
  blur = false,
  threshold = 0.1,
  initialOpacity = 0,
}: FadeContentProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <div
      ref={ref}
      className={cn('transition-all ease-out will-change-transform', className)}
      style={{
        opacity: visible ? 1 : initialOpacity,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        filter: blur ? (visible ? 'blur(0)' : 'blur(8px)') : undefined,
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
