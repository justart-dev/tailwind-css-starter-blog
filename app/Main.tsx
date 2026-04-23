import { slug } from 'github-slugger'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'
import type { Blog } from 'contentlayer/generated'

export const metadata = genPageMetadata({ title: 'Home', description: 'justart-dev blog' })

type MainProps = {
  posts: CoreContent<Blog>[]
}

export default function Home({ posts }: MainProps) {
  const recentPosts = posts.slice(0, 3)
  const tagCounts = tagData as Record<string, number>
  const topTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <div className="pt-6 pb-4 md:pt-8">
      <section className="border-b border-black/8 pt-2 pb-10 md:pt-6 md:pb-10 dark:border-white/10">
        <div className="max-w-4xl space-y-10">
          <div className="text-[11px] font-semibold tracking-[0.24em] text-gray-500 uppercase dark:text-gray-400">
            Justart-dev archive
          </div>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.07em] text-gray-950 sm:text-6xl lg:text-7xl dark:text-white">
            오래 남길 만한 개발 기록을 천천히 쌓아두는 블로그 .
          </h1>
          <p className="max-w-2xl py-5 text-base leading-8 text-gray-600 sm:text-lg dark:text-gray-300">
            지금의 고민과 과정이 언젠가 다시 꺼내볼 기록이 되길 바라며 남기는 개인 아카이브입니다.
          </p>
        </div>
      </section>

      <section className="grid gap-12 border-t border-black/8 py-14 lg:grid-cols-[minmax(0,1fr)_320px] dark:border-white/10">
        <div>
          <div className="mb-8 flex items-end justify-between gap-6 border-b border-black/8 pb-4 dark:border-white/10">
            <div>
              <div className="text-[11px] font-semibold tracking-[0.24em] text-gray-500 uppercase dark:text-gray-400">
                Recent writing
              </div>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-gray-950 dark:text-white">
                최근 글
              </h3>
            </div>
            <Link
              href="/blog"
              className="text-sm text-gray-500 underline-offset-4 transition-colors hover:text-gray-950 hover:underline dark:text-gray-400 dark:hover:text-white"
            >
              전체보기
            </Link>
          </div>
          <ul className="divide-y divide-black/8 dark:divide-white/10">
            {recentPosts.map((post) => (
              <li key={post.path} className="py-6">
                <article className="grid gap-3 md:grid-cols-[120px_minmax(0,1fr)] md:gap-6">
                  <time
                    className="pt-1 text-sm text-gray-500 dark:text-gray-400"
                    dateTime={post.date}
                    suppressHydrationWarning
                  >
                    {formatDate(post.date, siteMetadata.locale)}
                  </time>
                  <div className="space-y-3">
                    <h4 className="text-2xl font-semibold tracking-[-0.04em] text-gray-950 dark:text-white">
                      <Link
                        href={`/${post.path}`}
                        className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h4>
                    <p className="max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-300">
                      {post.summary}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>

        <aside className="space-y-8 lg:pl-6">
          <div>
            <div className="text-[11px] font-semibold tracking-[0.24em] text-gray-500 uppercase dark:text-gray-400">
              Short note
            </div>
            <div className="mt-4 space-y-4 text-sm leading-7 text-gray-600 dark:text-gray-300">
              <p>안녕하세요. 함께 하면 즐거운 개발자가 되고 싶은 Justart입니다.</p>
              <p>클로드는 사랑이지만, 요즘은 코덱스가 더 끌리네요.</p>
            </div>
          </div>

          <div className="border-t border-black/8 pt-6 dark:border-white/10">
            <div className="text-[11px] font-semibold tracking-[0.24em] text-gray-500 uppercase dark:text-gray-400">
              Tags
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {topTags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${slug(tag)}`}
                  className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:border-gray-950 hover:text-gray-950 dark:border-white/10 dark:text-gray-300 dark:hover:border-white dark:hover:text-white"
                >
                  #{tag}
                  <span className="ml-1 text-gray-400 dark:text-gray-500">{tagCounts[tag]}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}
