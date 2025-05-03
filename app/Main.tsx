import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'
import Spline from '@splinetool/react-spline/next'

export const metadata = genPageMetadata({ title: 'Home', description: 'justart-dev blog' })

export default function Home({ posts }) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-6 pt-6 pb-8 md:space-y-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
              Justart-dev
            </h1>

            <div className="typing-container flex min-h-[4rem] items-center justify-center text-xl text-gray-600 md:text-2xl dark:text-gray-400">
              <span className="typing-text">hello, nice to meet you. </span>
            </div>
            <div className="h-[550px] w-full">
              <Spline scene="https://prod.spline.design/u-rSfD5D6NGWRUxK/scene.splinecode" />
            </div>

            <p className="max-w-2xl text-center text-lg leading-7 text-gray-500 dark:text-gray-400">
              {siteMetadata.description}
            </p>

            <div className="mt-8 flex gap-6">
              <Link
                href="/blog"
                className="bg-primary-500 hover:bg-primary-600 inline-flex items-center gap-2 rounded-lg px-8 py-4 text-base font-medium text-white transition-colors"
              >
                Read Blog
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-8 py-4 text-base font-medium text-gray-900 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
              >
                Projects
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* <div className="pt-8">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">Latest Posts</h2>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((post) => {
              const { slug, date, title, summary, tags } = post
              return (
                <li key={slug} className="py-12">
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        </dd>
                      </dl>
                      <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl leading-8 font-bold tracking-tight">
                              <Link
                                href={`/blog/${slug}`}
                                className="text-gray-900 dark:text-gray-100"
                              >
                                {title}
                              </Link>
                            </h2>
                            <div className="flex flex-wrap">
                              {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                        <div className="text-base leading-6 font-medium">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            aria-label={`Read more: "${title}"`}
                          >
                            Read more &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
        {posts.length > MAX_DISPLAY && (
          <div className="flex justify-end text-base leading-6 font-medium">
            <Link
              href="/blog"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="All posts"
            >
              All Posts &rarr;
            </Link>
          </div>
        )} */}
      </div>
    </>
  )
}
