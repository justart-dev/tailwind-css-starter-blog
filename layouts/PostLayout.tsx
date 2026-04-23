import { ReactNode } from 'react'
import Link from '@/components/Link'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export default function PostLayout({ content, children, next, prev }: LayoutProps) {
  const { path, slug, date, title, summary, tags } = content
  const categoryLabel = decodeURI(path.split('/')[1] || tags?.[0] || 'blog')

  return (
    <section className="mx-auto w-full max-w-6xl px-0 sm:px-6 lg:px-8">
      <ScrollTopAndComment />
      <article className="pt-6 pb-4 md:pt-8">
        <header className="border-b border-black/8 pt-2 pb-10 md:pt-6 md:pb-10 dark:border-white/10">
          <div className="space-y-8">
            <div className="text-[11px] font-semibold tracking-[0.24em] text-gray-500 uppercase dark:text-gray-400">
              {categoryLabel}
            </div>
            <div className="space-y-3">
              <dl>
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-sm leading-6 font-medium text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <h1 className="w-full text-4xl font-semibold tracking-[-0.07em] text-gray-950 sm:text-6xl dark:text-white">
                {title}
              </h1>
            </div>
          </div>
        </header>

        <div className="grid gap-12 border-t border-black/8 py-14 lg:grid-cols-[180px_minmax(0,1fr)] dark:border-white/10">
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6 pr-6">
              <div>
                <div className="text-[11px] font-semibold tracking-[0.24em] text-gray-500 uppercase dark:text-gray-400">
                  Posted
                </div>
                <div className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
                  {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                </div>
              </div>
              <div className="border-t border-black/8 pt-6 dark:border-white/10">
                <Link
                  href="/blog"
                  className="text-sm text-gray-500 no-underline transition-colors hover:text-gray-950 dark:text-gray-400 dark:hover:text-white"
                >
                  ← Writing archive
                </Link>
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
              {children}
            </div>

            <footer className="mt-14 space-y-10 border-t border-black/8 pt-6 dark:border-white/10">
              {siteMetadata.comments && (
                <div
                  className="border-b border-black/8 pb-8 text-gray-700 dark:border-white/10 dark:text-gray-300"
                  id="comment"
                >
                  <Comments slug={slug} />
                </div>
              )}

              <div className="flex items-start justify-between gap-8">
                <div className="min-w-0 flex-1">
                  {prev ? (
                    <Link
                      href={`/${prev.path}`}
                      className="group inline-flex flex-col gap-1 no-underline"
                      aria-label={`Previous post: ${prev.title}`}
                    >
                      <span className="text-[11px] font-semibold tracking-[0.18em] text-gray-400 uppercase transition-colors group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400">
                        Previous writing
                      </span>
                      <span className="text-sm font-medium text-gray-700 transition-colors group-hover:text-gray-950 dark:text-gray-300 dark:group-hover:text-white">
                        ← {prev.title}
                      </span>
                    </Link>
                  ) : (
                    <div className="opacity-35">
                      <div className="text-[11px] font-semibold tracking-[0.18em] text-gray-400 uppercase dark:text-gray-500">
                        Previous writing
                      </div>
                      <div className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                        —
                      </div>
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1 text-right">
                  {next ? (
                    <Link
                      href={`/${next.path}`}
                      className="group inline-flex flex-col gap-1 text-right no-underline"
                      aria-label={`Next post: ${next.title}`}
                    >
                      <span className="text-[11px] font-semibold tracking-[0.18em] text-gray-400 uppercase transition-colors group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400">
                        Next writing
                      </span>
                      <span className="text-sm font-medium text-gray-700 transition-colors group-hover:text-gray-950 dark:text-gray-300 dark:group-hover:text-white">
                        {next.title} →
                      </span>
                    </Link>
                  ) : (
                    <div className="opacity-35">
                      <div className="text-[11px] font-semibold tracking-[0.18em] text-gray-400 uppercase dark:text-gray-500">
                        Next writing
                      </div>
                      <div className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                        —
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </section>
  )
}
