import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'
import { BeakerIcon } from '@heroicons/react/24/outline'

export const metadata = genPageMetadata({ title: '实验项目' })

export default function experimentPage() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="flex flex-col items-center space-y-2 pt-6 pb-8 md:space-y-5">
          <span className="from-primary-400 via-primary-500 to-primary-600 mb-4 inline-flex items-center justify-center rounded-full bg-gradient-to-tr p-4 shadow">
            <BeakerIcon className="h-10 w-10 text-white" />
          </span>
          <h1 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl md:text-4xl dark:text-gray-100">
            实验项目 & 学习案例
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            这里收录了我的实验性项目和学习案例，欢迎交流与参考。
          </p>
        </div>
        <div className="container py-12">
          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
            {projectsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
                className="transition-all duration-300 hover:scale-105 hover:shadow-xl"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
