'use client'

import { RocketLaunchIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'

export default function Hero({ title, description }) {
  const heroRef = useRef(null)
  const rocketRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 0 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    )
    gsap.fromTo(
      rocketRef.current,
      { y: 0, rotate: 0 },
      { y: -20, rotate: 0, duration: 1.2, repeat: -1, yoyo: true, ease: 'power1.inOut' }
    )
  }, [])

  return (
    <div
      className="relative flex flex-col items-center justify-center pt-10 pb-12 md:pt-16 md:pb-20"
      ref={heroRef}
    >
      <span
        className="mb-4 inline-flex items-center justify-center rounded-full bg-gradient-to-tr shadow-lg"
        ref={rocketRef}
      >
        <Image
          src="/static/images/avatar.png"
          alt="Logo"
          width={50}
          height={50}
          className="h-20 w-20 text-white"
        />
      </span>
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl dark:text-gray-100">
        {title}
      </h1>
      <p className="animate-fade-in mx-auto max-w-xl text-lg font-medium text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  )
}
