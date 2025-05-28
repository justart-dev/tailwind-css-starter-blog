import { genPageMetadata } from 'app/seo'
import SpotlightCard from '@/components/SpotlightCard'
import { projectsData } from 'app/projectsData'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            Playground
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            나만의 개발 놀이터. 자유롭게 시도하고, 실패하면서 배우는 공간.
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {projectsData.map((d) => (
              <SpotlightCard
                className="custom-spotlight-card"
                spotlightColor="rgba(0, 229, 255, 0.2)"
                key={d.title}
                title={d.title}
                description={d.description}
                href={d.href}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
