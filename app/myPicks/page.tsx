import { genPageMetadata } from 'app/seo'
import { categories } from './linkData'

export const metadata = genPageMetadata({
  title: '추천 링크 모음',
  description: '디자인 리소스, 개발 도구, 모바일 앱 출시 등 유용한 링크 모음',
})

function getHostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export default function LinkCollection() {
  return (
    <div className="pt-6 pb-4 md:pt-8">
      <section className="border-b border-black/8 pt-2 pb-10 md:pt-6 md:pb-10 dark:border-white/10">
        <div className="max-w-4xl space-y-8">
          <div className="text-[11px] font-semibold tracking-[0.24em] text-gray-500 uppercase dark:text-gray-400">
            Collected references
          </div>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.07em] text-gray-950 sm:text-6xl dark:text-white">
            My Picks
          </h1>
          <p className="max-w-2xl text-base leading-8 text-gray-600 sm:text-lg dark:text-gray-300">
            작업하다가 자주 다시 찾게 되는 링크들만 조용히 모아둔 개인 컬렉션입니다.
          </p>
        </div>
      </section>

      <div className="space-y-0 border-t border-black/8 py-14 dark:border-white/10">
        {categories.map((category, index) => (
          <section
            key={category.title}
            id={encodeURIComponent(category.title)}
            className={`${index !== 0 ? 'border-t border-black/8 pt-10 dark:border-white/10' : ''} pb-10`}
          >
            <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
              <div className="space-y-3 lg:pr-4">
                <div className="text-[11px] font-semibold tracking-[0.24em] text-gray-500 uppercase dark:text-gray-400">
                  Collection
                </div>
                <h2 className="text-2xl font-semibold tracking-[-0.04em] text-gray-950 sm:text-3xl dark:text-white">
                  {category.title}
                </h2>
                <p className="text-sm leading-7 text-gray-600 dark:text-gray-300">
                  {category.description}
                </p>
              </div>

              <div className="min-w-0">
                <div className="divide-y divide-black/8 dark:divide-white/10">
                  {category.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block py-5 no-underline"
                    >
                      <div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_160px] md:items-start md:gap-6">
                        <div className="space-y-2">
                          <div className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-xl font-semibold tracking-[-0.03em] text-gray-950 transition-colors dark:text-white">
                            {link.name}
                          </div>
                          <p className="max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-300">
                            {link.description}
                          </p>
                        </div>
                        <div className="pt-1 text-sm text-gray-500 md:text-right dark:text-gray-400">
                          {getHostname(link.url)}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
