'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SplitText as GSAPSplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(GSAPSplitText, ScrollTrigger)

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  ease?: string
  splitType?: 'chars' | 'words' | 'lines'
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  threshold?: number
  textAlign?: React.CSSProperties['textAlign']
  onLetterAnimationComplete?: () => void
}

export default function SplitText({
  text,
  className = '',
  delay = 50,
  duration = 0.8,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  textAlign = 'center',
  onLetterAnimationComplete,
}: SplitTextProps) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const splitter = new GSAPSplitText(el, {
      type: splitType,
      linesClass: 'split-line',
    })
    const targets =
      splitType === 'chars'
        ? splitter.chars
        : splitType === 'words'
          ? splitter.words
          : splitter.lines

    const tween = gsap.fromTo(targets, from, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      scrollTrigger: {
        trigger: el,
        start: `top ${(1 - threshold) * 100}%`,
        once: true,
      },
      onComplete: () => onLetterAnimationComplete?.(),
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      splitter.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay, duration, ease, splitType, threshold])

  return (
    <p
      ref={ref}
      className={className}
      style={{ textAlign, wordBreak: 'break-word', overflow: 'hidden' }}
    >
      {text}
    </p>
  )
}
