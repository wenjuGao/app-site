'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface BlurTextProps {
  text: string
  className?: string
  delay?: number
  animateBy?: 'words' | 'letters'
  direction?: 'top' | 'bottom'
  duration?: number
}

export default function BlurText({
  text,
  className = '',
  delay = 80,
  animateBy = 'words',
  direction = 'top',
  duration = 0.8,
}: BlurTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const segments = animateBy === 'words' ? text.split(' ') : text.split('')
    el.innerHTML = segments
      .map(
        (s) =>
          `<span class="blur-text-segment" style="display:inline-block;will-change:transform,filter,opacity">${
            s === ' ' ? '&nbsp;' : s
          }</span>`
      )
      .join(animateBy === 'words' ? ' ' : '')

    const spans = el.querySelectorAll('.blur-text-segment')
    const tween = gsap.fromTo(
      spans,
      {
        opacity: 0,
        filter: 'blur(10px)',
        y: direction === 'top' ? -30 : 30,
      },
      {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration,
        ease: 'power2.out',
        stagger: delay / 1000,
      }
    )

    return () => {
      tween.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay, animateBy, direction, duration])

  return <p ref={ref} className={className} />
}
