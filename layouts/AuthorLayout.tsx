'use client'

import { ReactNode, useEffect, useRef } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { CodeBracketIcon, SparklesIcon } from '@heroicons/react/24/outline'
import siteMetadata from '@/data/siteMetadata'
import { animate } from 'animejs'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github } = content
  const introRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (introRef.current) {
      animate(introRef.current, {
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 900,
        easing: 'easeOutExpo',
      })
    }
  }, [])

  return (
    <>
      <div className="divide-y divide-gray-200 pt-4 dark:divide-gray-700">
        <div className="min-h-96 items-start space-y-2 xl:grid xl:grid-cols-3 xl:space-y-0 xl:gap-x-8">
          <div className="flex flex-col items-center space-x-2 pt-8">
            {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
              />
            )}
            <h3 className="pt-4 pb-2 text-2xl leading-8 font-bold tracking-tight">{name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="text-gray-500 dark:text-gray-400">{company}</div>
            <div className="flex space-x-3 pt-6">
              {siteMetadata.email ? (
                <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
              ) : null}
              {siteMetadata.github ? (
                <SocialIcon kind="github" href={siteMetadata.github} size={6} />
              ) : null}
              {siteMetadata.linkedin ? (
                <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
              ) : null}
              {siteMetadata.x ? <SocialIcon kind="x" href={siteMetadata.x} size={6} /> : null}
              {siteMetadata.telegram ? (
                <SocialIcon kind="telegram" href={siteMetadata.telegram} size={6} />
              ) : null}
            </div>
          </div>
          <div
            className="prose dark:prose-invert max-w-none pt-8 pb-8 xl:col-span-2"
            ref={introRef}
          >
            <div className="mb-4 flex items-center gap-2">
              <CodeBracketIcon className="text-primary-500 h-6 w-6" />
              <span className="text-lg font-semibold">前端开发工程师</span>
            </div>
            <p>
              你好，我是{name}，专注于 <strong>React</strong>、<strong>Next.js</strong>、
              <strong>TypeScript</strong> 等现代前端技术，热爱 CSS 动画与交互设计。
              拥有丰富的项目开发和团队协作经验，喜欢探索新技术、参与开源和技术分享。
              希望通过博客与更多开发者交流成长。
            </p>
            <ul>
              <li>擅长：React / Next.js / TypeScript / CSS / 动画</li>
              <li>经验：多行业项目开发与团队协作</li>
              <li>兴趣：前端新技术、开源、分享</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
