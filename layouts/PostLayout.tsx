import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import PageTitle from '@/components/PageTitle'
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

export default function PostLayout({ content, children }: LayoutProps) {
  const { path, slug, date, title, tags } = content
  const basePath = path.split('/')[0]

  return (
    <section className="mx-auto w-full max-w-7xl px-0 sm:px-6 lg:px-8">
      <ScrollTopAndComment />
      <article>
        <div className="space-y-8 pt-6 md:pt-10">
          <header className="surface-panel overflow-hidden px-5 py-8 sm:px-10 sm:py-10">
            <div className="space-y-4 text-center">
              <div className="text-xs font-semibold tracking-[0.24em] text-gray-500 uppercase dark:text-gray-400">
                {basePath}
              </div>
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle className="lg:text-5xl">{title}</PageTitle>
              </div>
              {tags && (
                <div className="flex flex-wrap justify-center gap-2 pt-2">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
              )}
            </div>
          </header>
          <div className="pb-8">
            <div className="surface-panel w-full min-w-0 px-4 py-6 sm:p-8">
              <div className="prose dark:prose-invert max-w-none pt-2 pb-6">{children}</div>
              {siteMetadata.comments && (
                <div
                  className="border-t border-gray-200/80 pt-6 pb-2 text-center text-gray-700 dark:border-white/10 dark:text-gray-300"
                  id="comment"
                >
                  <Comments slug={slug} />
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </section>
  )
}
