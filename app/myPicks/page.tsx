import { genPageMetadata } from 'app/seo'
import { categories } from './linkData'
import {
  SparklesIcon,
  RocketLaunchIcon,
  WrenchScrewdriverIcon,
  StarIcon,
  ChartBarIcon,
  DevicePhoneMobileIcon,
  LightBulbIcon,
} from '@heroicons/react/24/solid'
import { JSX } from 'react'

export const metadata = genPageMetadata({
  title: '추천 링크 모음',
  description: '디자인 리소스, 개발 도구, 모바일 앱 출시 등 유용한 링크 모음',
})

const categoryIcons: Record<string, JSX.Element> = {
  '디자인 에셋': <SparklesIcon className="h-6 w-6 text-black dark:text-white" />,
  레퍼런스: <LightBulbIcon className="h-6 w-6 text-black dark:text-white" />,
  '프론트엔드 라이브러리': <RocketLaunchIcon className="h-6 w-6 text-black dark:text-white" />,
  마케팅: <DevicePhoneMobileIcon className="h-6 w-6 text-black dark:text-white" />,
  '개발 유틸리티': <WrenchScrewdriverIcon className="h-6 w-6 text-black dark:text-white" />,
  '기술 인사이트': <ChartBarIcon className="h-6 w-6 text-black dark:text-white" />,
  '사이드 프로젝트': <StarIcon className="h-6 w-6 text-black dark:text-white" />,
}

export default function LinkCollection() {
  return (
    <div className="space-y-6 pt-6 md:space-y-8 md:pt-10">
      <div className="surface-panel p-6 sm:p-8">
        <div className="flex flex-col gap-3">
          <div className="text-xs font-semibold tracking-[0.24em] text-gray-500 uppercase dark:text-gray-400">
            Curated links
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-[-0.05em] text-gray-950 sm:text-4xl dark:text-white">
                My Picks
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-300">
                자주 참고하는 링크들을 주제별로 정리해둔 개인 컬렉션입니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {categories.map((category) => (
          <section
            key={category.title}
            id={encodeURIComponent(category.title)}
            className="surface-panel p-6 sm:p-8"
          >
            <div className="mb-2 flex items-center gap-2">
              {categoryIcons[category.title]}
              <h2 className="text-xl font-semibold text-black md:text-2xl dark:text-white">
                {category.title}
              </h2>
            </div>
            <p className="mb-5 text-sm text-gray-700 md:text-base dark:text-gray-300">
              {category.description}
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              {category.links.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[1.75rem] bg-white p-4 ring-1 ring-gray-200/80 transition-colors hover:bg-gray-50 dark:bg-slate-950/60 dark:ring-white/10 dark:hover:bg-gray-900"
                >
                  <div className="mb-1 font-medium text-black dark:text-white">{link.name}</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">{link.description}</div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
