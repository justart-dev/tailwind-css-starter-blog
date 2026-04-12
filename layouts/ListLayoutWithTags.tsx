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
    <div className="pt-8 pb-4">
      <nav className="surface-panel flex w-full items-center justify-between px-5 py-4 text-sm font-medium">
        {!prevPage && (
          <button
            className="cursor-auto text-gray-400 disabled:opacity-50 dark:text-gray-600"
            disabled={!prevPage}
          >
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="rounded-full px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-950 dark:text-gray-200 dark:hover:bg-white/5 dark:hover:text-white"
          >
            Previous
          </Link>
        )}
        <span className="text-gray-500 dark:text-gray-400">
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button
            className="cursor-auto text-gray-400 disabled:opacity-50 dark:text-gray-600"
            disabled={!nextPage}
          >
            Next
          </button>
        )}
        {nextPage && (
          <Link
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
            className="rounded-full px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-950 dark:text-gray-200 dark:hover:bg-white/5 dark:hover:text-white"
          >
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
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
    <div className="space-y-6 pt-6 md:space-y-8 md:pt-10">
      <div className="surface-panel p-6 sm:p-8 dark:bg-slate-950/55">
        <div className="flex flex-col gap-3">
          <div className="text-xs font-semibold tracking-[0.24em] text-gray-500 uppercase dark:text-gray-400">
            Article archive
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-[-0.05em] text-gray-950 sm:text-4xl dark:text-white">
                {title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-300">
                Notes on frontend engineering, testing workflows, and infrastructure basics.
              </p>
            </div>
          </div>
        </div>
      </div>

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

      <div className="grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="surface-panel sticky top-28 overflow-hidden p-5">
            <div className="px-2">
              <div className="mb-4 text-xs font-semibold tracking-[0.24em] text-gray-500 uppercase dark:text-gray-400">
                Browse by topic
              </div>
              {pathname.startsWith('/blog') ? (
                <h3 className="rounded-2xl bg-gray-950 px-4 py-3 text-sm font-semibold text-white dark:bg-white dark:text-gray-950">
                  {`All Posts (${allPostCount})`}
                </h3>
              ) : (
                <Link
                  href={`/blog`}
                  className="block rounded-2xl border border-gray-200/80 px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-950 hover:text-gray-950 dark:border-white/10 dark:text-gray-300 dark:hover:border-white dark:hover:text-white"
                >
                  {`All Posts (${allPostCount})`}
                </Link>
              )}
              <ul className="mt-4 space-y-2">
                {sortedTags.map((t) => {
                  return (
                    <li key={t}>
                      {decodeURI(pathname.split('/tags/')[1]) === slug(t) ? (
                        <h3 className="block rounded-2xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900 dark:bg-cyan-400/10 dark:text-cyan-100">
                          {`${t} (${tagCounts[t]})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/tags/${slug(t)}`}
                          className="block rounded-2xl px-4 py-3 text-sm font-medium text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-950 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
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
          <ul className="w-full space-y-4">
            {displayPosts.map((post) => {
              const { path, date, title, summary, tags } = post
              return (
                <li
                  key={path}
                  className="surface-panel group w-full overflow-hidden p-5 transition-transform duration-200 hover:-translate-y-1 sm:p-6"
                >
                  <article className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="rounded-full border border-gray-200/80 bg-white/80 px-3 py-1 text-sm font-medium text-gray-500 dark:border-white/10 dark:bg-white/5 dark:text-gray-400">
                          <time dateTime={date} suppressHydrationWarning>
                            {formatDate(date, siteMetadata.locale)}
                          </time>
                        </dd>
                      </dl>
                      <div className="flex flex-wrap gap-2">
                        {tags?.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h2 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                        <Link
                          href={`/${path}`}
                          className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-gray-950 transition-colors dark:text-white"
                        >
                          {title}
                        </Link>
                      </h2>
                      <div className="prose max-w-none text-sm leading-7 text-gray-600 sm:text-base dark:text-gray-300">
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
      </div>
    </div>
  )
}
