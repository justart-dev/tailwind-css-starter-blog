import { genPageMetadata } from 'app/seo'
import { categories } from './linkData'
import { SparklesIcon, BookOpenIcon, RocketLaunchIcon, CodeBracketIcon, StarIcon } from '@heroicons/react/24/solid'
import { JSX } from 'react'

export const metadata = genPageMetadata({ title: '추천 링크 모음' })

const categoryIcons: Record<string, JSX.Element> = {
  '디자인 리소스': <SparklesIcon className="w-6 h-6 text-black dark:text-white" />,
  '디자인 레퍼런스': <BookOpenIcon className="w-6 h-6 text-black dark:text-white" />,
  'React 라이브러리': <RocketLaunchIcon className="w-6 h-6 text-black dark:text-white" />,
  '유용한 도구들': <CodeBracketIcon className="w-6 h-6 text-black dark:text-white" />,
  '토이 프로젝트': <StarIcon className="w-6 h-6 text-black dark:text-white" />,
}

export default function LinkCollection() {
  return (
    <div className="min-h-screen py-8 bg-white dark:bg-black">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-black dark:text-white">
            추천 링크 모음
          </h1>
          <p className="mt-3 text-base md:text-lg text-gray-700 dark:text-gray-300">
            다양한 라이브러리와 도구들을 모아봤어요.
          </p>
        </div>

        <div className="space-y-14">
          {categories.map((category) => (
            <section
              key={category.title}
              className="mb-10"
            >
              <div className="flex items-center gap-2 mb-2">
                {categoryIcons[category.title]}
                <h2 className="text-xl md:text-2xl font-semibold text-black dark:text-white">
                  {category.title}
                </h2>
              </div>
              <p className="mb-4 text-sm md:text-base text-gray-700 dark:text-gray-300">
                {category.description}
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                {category.links.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    <div className="font-medium text-black dark:text-white mb-1">
                      {link.name}
                    </div>
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
