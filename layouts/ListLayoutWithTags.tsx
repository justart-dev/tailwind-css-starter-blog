'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  eyebrow?: string
  description?: string
  totalPostCount?: number
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.replace(/^\//, '').replace(/\/page\/\d+$/, '')
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="pt-10 pb-4">
      <nav className="border-t border-black/8 pt-5 dark:border-white/10">
        <div className="flex items-center justify-between gap-6">
          <div className="min-w-0 flex-1">
            {prevPage ? (
              <Link
                href={
                  currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`
                }
                rel="prev"
                className="group inline-flex flex-col gap-1 text-left"
              >
                <span className="text-[11px] font-semibold tracking-[0.18em] text-gray-400 uppercase transition-colors group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400">
                  Previous page
                </span>
                <span className="text-sm font-medium text-gray-700 transition-colors group-hover:text-gray-950 dark:text-gray-300 dark:group-hover:text-white">
                  ← {currentPage - 1}
                </span>
              </Link>
            ) : (
              <div className="inline-flex flex-col gap-1 text-left opacity-35">
                <span className="text-[11px] font-semibold tracking-[0.18em] text-gray-400 uppercase dark:text-gray-500">
                  Previous page
                </span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">—</span>
              </div>
            )}
          </div>

          <div className="shrink-0 text-center">
            <div className="text-[11px] font-semibold tracking-[0.18em] text-gray-400 uppercase dark:text-gray-500">
              Page
            </div>
            <div className="mt-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              {currentPage} / {totalPages}
            </div>
          </div>

          <div className="min-w-0 flex-1 text-right">
            {nextPage ? (
              <Link
                href={`/${basePath}/page/${currentPage + 1}`}
                rel="next"
                className="group inline-flex flex-col gap-1 text-right"
              >
                <span className="text-[11px] font-semibold tracking-[0.18em] text-gray-400 uppercase transition-colors group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400">
                  Next page
                </span>
                <span className="text-sm font-medium text-gray-700 transition-colors group-hover:text-gray-950 dark:text-gray-300 dark:group-hover:text-white">
                  {currentPage + 1} →
                </span>
              </Link>
            ) : (
              <div className="inline-flex flex-col gap-1 text-right opacity-35">
                <span className="text-[11px] font-semibold tracking-[0.18em] text-gray-400 uppercase dark:text-gray-500">
                  Next page
                </span>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">—</span>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  eyebrow = 'Justart-dev archive',
  description = '개발 과정에서 마주친 고민과 작은 배움, 프로젝트의 흐름을 차분히 기록합니다.',
  totalPostCount,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const allPostCount = totalPostCount ?? posts.length
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <div className="pt-6 pb-4 md:pt-8">
      <section className="pt-2 pb-10 md:pt-6 md:pb-10 lg:border-b lg:border-black/8 dark:lg:border-white/10">
        <div className="max-w-4xl space-y-8">
          <div className="text-[11px] font-semibold tracking-[0.24em] text-gray-500 uppercase dark:text-gray-400">
            {eyebrow}
          </div>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.07em] text-gray-950 sm:text-6xl dark:text-white">
            {title}
          </h1>
          <p className="max-w-2xl text-base leading-8 text-gray-600 sm:text-lg dark:text-gray-300">
            {description}
          </p>
        </div>
      </section>

      <div className="overflow-x-auto pb-2 sm:hidden">
        <div className="flex min-w-full gap-2">
          <Link
            href="/blog"
            className={`rounded-full border px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors duration-150 ${!pathname.includes('/tags/') ? 'border-gray-950 bg-gray-950 text-white dark:border-white dark:bg-white dark:text-gray-950' : 'border-gray-200 bg-white/80 text-gray-700 hover:border-gray-950 hover:text-gray-950 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:border-white dark:hover:text-white'}`}
            aria-label="View all posts"
          >
            ALL
          </Link>
          {sortedTags.map((t) => (
            <Link
              key={t}
              href={`/tags/${slug(t)}`}
              className={`rounded-full border px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors duration-150 ${decodeURI(pathname.split('/tags/')[1]) === slug(t) ? 'border-gray-950 bg-gray-950 text-white dark:border-white dark:bg-white dark:text-gray-950' : 'border-gray-200 bg-white/80 text-gray-700 hover:border-gray-950 hover:text-gray-950 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:border-white dark:hover:text-white'}`}
              aria-label={`View posts tagged ${t}`}
            >
              {t}
            </Link>
          ))}
        </div>
      </div>

      <section className="grid items-start gap-12 py-14 lg:grid-cols-[280px_minmax(0,1fr)] lg:border-t lg:border-black/8 dark:lg:border-white/10">
        <aside className="hidden lg:block">
          <div className="sticky top-28 overflow-hidden lg:pr-6">
            <div>
              <div className="mb-4 text-[11px] font-semibold tracking-[0.24em] text-gray-500 uppercase dark:text-gray-400">
                Browse by topic
              </div>
              {pathname.startsWith('/blog') ? (
                <h3 className="border-b border-black/8 px-0 py-3 text-sm font-semibold text-gray-950 dark:border-white/10 dark:text-white">
                  {`All Posts (${allPostCount})`}
                </h3>
              ) : (
                <Link
                  href={`/blog`}
                  className="block border-b border-black/8 px-0 py-3 text-sm font-semibold text-gray-700 transition-colors hover:text-gray-950 dark:border-white/10 dark:text-gray-300 dark:hover:text-white"
                >
                  {`All Posts (${allPostCount})`}
                </Link>
              )}
              <ul className="mt-2 divide-y divide-black/8 dark:divide-white/10">
                {sortedTags.map((t) => {
                  return (
                    <li key={t}>
                      {decodeURI(pathname.split('/tags/')[1]) === slug(t) ? (
                        <h3 className="block px-0 py-3 text-sm font-semibold text-gray-950 dark:text-white">
                          {`${t} (${tagCounts[t]})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/tags/${slug(t)}`}
                          className="block px-0 py-3 text-sm font-medium text-gray-500 transition-colors duration-200 hover:text-gray-950 dark:text-gray-300 dark:hover:text-white"
                          aria-label={`View posts tagged ${t}`}
                        >
                          {`${t} (${tagCounts[t]})`}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </aside>

        <div className="w-full min-w-0">
          <ul className="w-full divide-y divide-black/8 dark:divide-white/10">
            {displayPosts.map((post) => {
              const { path, date, title, summary, tags } = post
              return (
                <li key={path} className="py-6 first:pt-0 last:pb-0">
                  <article className="grid gap-4 md:grid-cols-[140px_minmax(0,1fr)] md:gap-8">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="pt-1 text-sm text-gray-500 dark:text-gray-400">
                        <time dateTime={date} suppressHydrationWarning>
                          {formatDate(date, siteMetadata.locale)}
                        </time>
                      </dd>
                    </dl>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {tags?.map((tag) => (
                          <Tag key={tag} text={tag} interactive={false} />
                        ))}
                      </div>
                      <h2 className="text-2xl font-semibold tracking-[-0.04em] text-gray-950 sm:text-3xl dark:text-white">
                        <Link
                          href={`/${path}`}
                          className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          {title}
                        </Link>
                      </h2>
                      <div className="max-w-2xl text-sm leading-7 text-gray-600 sm:text-base dark:text-gray-300">
                        {summary}
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
          {pagination && pagination.totalPages > 1 && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          )}
        </div>
      </section>
    </div>
  )
}
