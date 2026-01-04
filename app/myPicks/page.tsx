import { genPageMetadata } from 'app/seo'
import { categories } from './linkData'
import {
  SparklesIcon,
  BookOpenIcon,
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
  '영감 & 레퍼런스': <LightBulbIcon className="h-6 w-6 text-black dark:text-white" />,
  '프론트엔드 라이브러리': <RocketLaunchIcon className="h-6 w-6 text-black dark:text-white" />,
  '앱 개발 & 마켓팅': <DevicePhoneMobileIcon className="h-6 w-6 text-black dark:text-white" />,
  '개발 유틸리티': <WrenchScrewdriverIcon className="h-6 w-6 text-black dark:text-white" />,
  '기술 인사이트': <ChartBarIcon className="h-6 w-6 text-black dark:text-white" />,
  '사이드 프로젝트': <StarIcon className="h-6 w-6 text-black dark:text-white" />,
}

export default function LinkCollection() {
  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-black md:text-5xl dark:text-white">
            추천 링크 모음
          </h1>
          <p className="mt-3 text-base text-gray-700 md:text-lg dark:text-gray-300">
            다양한 라이브러리와 도구들을 모아봤어요.
          </p>
        </div>

        <div className="space-y-14">
          {categories.map((category) => (
            <section key={category.title} className="mb-10">
              <div className="mb-2 flex items-center gap-2">
                {categoryIcons[category.title]}
                <h2 className="text-xl font-semibold text-black md:text-2xl dark:text-white">
                  {category.title}
                </h2>
              </div>
              <p className="mb-4 text-sm text-gray-700 md:text-base dark:text-gray-300">
                {category.description}
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                {category.links.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg border border-gray-200 px-4 py-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
                  >
                    <div className="mb-1 font-medium text-black dark:text-white">{link.name}</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      {link.description}
                    </div>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
