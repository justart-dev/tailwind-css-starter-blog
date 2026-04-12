import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
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
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { path, slug, date, title, tags } = content
  const basePath = path.split('/')[0]

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="space-y-8 pt-6 md:pt-10">
          <header className="surface-panel overflow-hidden px-6 py-10 sm:px-10">
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
            <div className="grid items-start gap-6 xl:grid-cols-[220px_minmax(0,1fr)]">
              <dl className="surface-panel self-start p-6">
                <dt className="sr-only">Authors</dt>
                <dd>
                  <div className="mb-5 text-xs font-semibold tracking-[0.24em] text-gray-500 uppercase dark:text-gray-400">
                    Written by
                  </div>
                  <ul className="flex flex-wrap justify-center gap-4 xl:block xl:space-y-6">
                    {authorDetails.map((author) => (
                      <li className="flex items-center space-x-2" key={author.name}>
                        {author.avatar && (
                          <Image
                            src={author.avatar}
                            width={38}
                            height={38}
                            alt="avatar"
                            className="h-10 w-10 rounded-full"
                          />
                        )}
                        <dl className="text-sm leading-5 font-medium whitespace-nowrap">
                          <dt className="sr-only">Name</dt>
                          <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                          <dt className="sr-only">Twitter</dt>
                          <dd>
                            {author.twitter && (
                              <Link
                                href={author.twitter}
                                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                              >
                                {author.twitter
                                  .replace('https://twitter.com/', '@')
                                  .replace('https://x.com/', '@')}
                              </Link>
                            )}
                          </dd>
                        </dl>
                      </li>
                    ))}
                  </ul>
                </dd>
                <div className="mt-8 space-y-6 border-t border-gray-200/80 pt-6 dark:border-white/10">
                  {(next || prev) && (
                    <div className="space-y-5">
                      {prev && prev.path && (
                        <div>
                          <h2 className="text-xs tracking-[0.24em] text-gray-500 uppercase dark:text-gray-400">
                            Previous
                          </h2>
                          <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mt-2 text-sm font-medium">
                            <Link href={`/${prev.path}`}>{prev.title}</Link>
                          </div>
                        </div>
                      )}
                      {next && next.path && (
                        <div>
                          <h2 className="text-xs tracking-[0.24em] text-gray-500 uppercase dark:text-gray-400">
                            Next
                          </h2>
                          <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mt-2 text-sm font-medium">
                            <Link href={`/${next.path}`}>{next.title}</Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div>
                    <Link
                      href={`/${basePath}`}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-semibold"
                      aria-label="Back to the blog"
                    >
                      &larr; Back to the blog
                    </Link>
                  </div>
                </div>
              </dl>
              <div className="surface-panel w-full min-w-0 p-6 sm:p-8">
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
        </div>
      </article>
    </SectionContainer>
  )
}
