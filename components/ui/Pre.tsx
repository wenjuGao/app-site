'use client'

import { useRef, useState, type ReactNode } from 'react'

export default function Pre({ children }: { children: ReactNode }) {
  const textInput = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  const onEnter = () => setHovered(true)
  const onExit = () => {
    setHovered(false)
    setCopied(false)
  }
  const onCopy = () => {
    setCopied(true)
    navigator.clipboard.writeText(textInput.current?.textContent ?? '')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div ref={textInput} onMouseEnter={onEnter} onMouseLeave={onExit} className="group relative">
      {(hovered || copied) && (
        <button
          aria-label="Copy code"
          className={`absolute top-2 right-2 z-10 h-8 w-8 cursor-pointer rounded-lg border p-1.5 backdrop-blur transition-colors ${
            copied
              ? 'border-green-400/60 bg-green-500/20 text-green-400'
              : 'border-gray-600 bg-gray-800/80 text-gray-300 hover:border-gray-400 hover:text-white'
          }`}
          onClick={onCopy}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            className="h-full w-full"
          >
            {copied ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            )}
          </svg>
        </button>
      )}
      <pre>{children}</pre>
    </div>
  )
}
