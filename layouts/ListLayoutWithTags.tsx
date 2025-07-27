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
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const lastSegment = segments[segments.length - 1]
  const basePath = pathname
    .replace(/^\//, '') // Remove leading slash
    .replace(/\/page\/\d+$/, '') // Remove any trailing /page
  console.log(pathname)
  console.log(basePath)
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
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
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div>
        <div className="pt-6 pb-6">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            {title}
          </h1>
        </div>
        {/* Mobile tag collection */}
        <div className="mb-4 overflow-x-auto pb-2 sm:hidden">
          <div className="flex min-w-full gap-2">
            {/* All tag */}
            <Link
              href="/blog"
              className={`rounded border border-gray-200 px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors duration-150 dark:border-gray-700 ${!pathname.includes('/tags/') ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-white text-black hover:bg-gray-100 dark:bg-black dark:text-white dark:hover:bg-gray-900'}`}
              aria-label="View all posts"
            >
              ALL
            </Link>
            {sortedTags.map((t) => (
              <Link
                key={t}
                href={`/tags/${slug(t)}`}
                className={`rounded border border-gray-200 px-3 py-1 text-xs font-medium whitespace-nowrap transition-colors duration-150 dark:border-gray-700 ${decodeURI(pathname.split('/tags/')[1]) === slug(t) ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-white text-black hover:bg-gray-100 dark:bg-black dark:text-white dark:hover:bg-gray-900'}`}
                aria-label={`View posts tagged ${t}`}
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen max-w-[280px] min-w-[280px] flex-wrap overflow-auto rounded-sm bg-gray-50 pt-5 shadow-md sm:flex dark:bg-gray-900/70 dark:shadow-gray-800/40">
            <div className="px-6 py-4">
              {pathname.startsWith('/blog') ? (
                <h3 className="font-bold text-blue-600 uppercase">All Posts</h3>
              ) : (
                <Link
                  href={`/blog`}
                  className="font-bold text-gray-700 uppercase hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-600"
                >
                  All Posts
                </Link>
              )}
              <ul>
                {sortedTags.map((t) => {
                  return (
                    <li key={t} className="my-3">
                      {decodeURI(pathname.split('/tags/')[1]) === slug(t) ? (
                        <h3 className="inline px-3 py-2 text-sm font-bold text-blue-600 uppercase dark:text-blue-400">
                          {`${t} (${tagCounts[t]})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/tags/${slug(t)}`}
                          className="px-3 py-2 text-sm font-medium text-gray-500 uppercase transition-colors duration-200 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
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
          <div>
            <ul>
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags } = post
                return (
                  <li
                    key={path}
                    className="mb-4 transform rounded-lg border border-gray-200 p-3 shadow-md transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-100 hover:shadow-lg sm:p-5 xl:min-w-[650px] dark:hover:bg-gray-800"
                  >
                    <article className="flex flex-col space-y-2 xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-sm leading-6 font-medium text-gray-500 sm:text-base dark:text-gray-400">
                          <time dateTime={date} suppressHydrationWarning>
                            {formatDate(date, siteMetadata.locale)}
                          </time>
                        </dd>
                      </dl>
                      <div className="space-y-2 sm:space-y-3">
                        <div>
                          <h2 className="my-1 text-xl leading-7 font-bold tracking-tight sm:my-2 sm:text-2xl sm:leading-8">
                            <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                              {title}
                            </Link>
                          </h2>
                          <div className="my-1 flex flex-wrap sm:my-2">
                            {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                          </div>
                        </div>
                        <div className="prose max-w-none text-sm text-gray-500 sm:text-base dark:text-gray-400">
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
    </>
  )
}
