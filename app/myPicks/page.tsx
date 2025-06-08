import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: '추천 링크 모음' })

import { categories } from './linkData'

export default function LinkCollection() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          추천 링크 모음
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          다양한 라이브러리와 도구들을 모아봤어요.
        </p>
      </div>

      <div className="container py-12">
        <div className="space-y-12">
          {categories.map((category) => (
            <section key={category.title} className="mb-16">
              <h2 className="text-2xl leading-9 font-bold tracking-tight text-gray-900 sm:text-3xl sm:leading-10 dark:text-gray-100">
                {category.title}
              </h2>
              <p className="mt-2 text-lg leading-7 text-gray-500 dark:text-gray-400">
                {category.description}
              </p>

              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {category.links.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-lg border border-gray-200 bg-white p-6 transition-shadow duration-200 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="mb-3 flex items-center">
                      <h3 className="text-xl font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                        {link.name}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{link.description}</p>
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
