'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from './Image'
import SplitText from '@/components/reactbits/SplitText'
import BlurText from '@/components/reactbits/BlurText'

export default function Hero({ title, description }) {
  const rocketRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      rocketRef.current,
      { y: 0, scale: 0.6, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }
    )
    gsap.to(rocketRef.current, {
      y: -12,
      duration: 1.6,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 0.8,
    })
  }, [])

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden pt-12 pb-14 md:pt-20 md:pb-24">
      {/* 背景渐变光斑 */}
      <div
        aria-hidden
        className="from-primary-200/40 via-primary-100/20 dark:from-primary-900/40 dark:via-primary-950/20 pointer-events-none absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-b to-transparent blur-3xl"
      />
      <span ref={rocketRef} className="relative z-10 mb-6 inline-flex">
        <span className="ring-primary-500/30 dark:ring-primary-400/30 relative inline-flex rounded-full p-1 ring-4">
          <Image
            src="/static/images/avatar.png"
            alt="Logo"
            width={80}
            height={80}
            className="h-20 w-20 rounded-full"
            priority
          />
        </span>
      </span>
      <SplitText
        text={title}
        className="relative z-10 mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl dark:text-gray-100"
        splitType="chars"
        delay={60}
        duration={0.7}
      />
      <BlurText
        text={description}
        className="relative z-10 mx-auto max-w-xl text-center text-lg font-medium text-gray-600 dark:text-gray-300"
        animateBy="words"
        delay={60}
        direction="bottom"
      />
    </section>
  )
}
