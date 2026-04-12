import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'
import SplitText from '@/components/SplitText'
import Spline from '@splinetool/react-spline/next'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'

export const metadata = genPageMetadata({ title: 'Home', description: 'justart-dev blog' })

type MainProps = {
  posts: CoreContent<Blog>[]
}

export default function Home({ posts }: MainProps) {
  const featuredPosts = posts.slice(0, 3)

  return (
    <div className="space-y-12 pt-6 md:space-y-16 md:pt-10">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
        <div className="surface-panel relative overflow-hidden p-8 sm:p-10">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-r from-amber-100/80 via-transparent to-orange-100/80 dark:from-sky-500/15 dark:to-cyan-400/10" />
          <div className="relative flex h-full flex-col justify-between gap-10">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-semibold tracking-[0.24em] text-amber-900 uppercase dark:border-cyan-400/20 dark:bg-cyan-400/10 dark:text-cyan-100">
                Justart-dev notes
              </div>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-3xl font-semibold tracking-[-0.06em] text-gray-950 sm:text-5xl lg:text-5xl dark:text-white">
                  Building, writing, and slowly finding a better way forward.
                </h1>
                <SplitText
                  text="Notes on development, projects, tools, and the ideas that come with building things."
                  className="max-w-2xl text-lg leading-8 font-medium text-gray-600 dark:text-gray-300"
                  delay={35}
                  animationFrom={{ opacity: 0, transform: 'translate3d(0,24px,0)' }}
                  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                  threshold={0.15}
                  rootMargin="-40px"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full bg-gray-950 px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 dark:bg-white dark:text-gray-950"
              >
                Browse articles
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href={siteMetadata.github}
                className="inline-flex items-center rounded-full border border-gray-200 bg-white/80 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors duration-200 hover:border-gray-950 hover:text-gray-950 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:border-white dark:hover:text-white"
              >
                View GitHub
              </Link>
            </div>
          </div>
        </div>

        <div className="surface-panel overflow-hidden p-3">
          <div className="flex h-full min-h-[420px] flex-col rounded-[2rem] bg-transparent">
            <div className="border-b border-gray-200/60 px-5 py-4 dark:border-white/10">
              <div className="text-xs font-semibold tracking-[0.24em] text-gray-500 uppercase dark:text-gray-400">
                Interactive scene
              </div>
            </div>
            <div className="h-[420px] w-full">
              <Spline scene="https://prod.spline.design/u-rSfD5D6NGWRUxK/scene.splinecode" />
            </div>
          </div>
        </div>
      </section>

      <section className="surface-panel-soft relative overflow-hidden p-6 sm:p-8">
        <div className="surface-glow" />
        <div className="relative space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-xs font-semibold tracking-[0.24em] text-gray-500 uppercase dark:text-gray-400">
                Latest posts
              </div>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-gray-950 dark:text-white">
                Recently published
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-transparent px-1 py-1 text-sm font-semibold text-gray-700 transition-colors hover:text-gray-950 dark:text-gray-300 dark:hover:text-white"
            >
              View all posts
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <Link
                key={post.path}
                href={`/${post.path}`}
                className="surface-panel group p-6 transition-transform duration-200 hover:-translate-y-1 dark:bg-slate-950/60"
              >
                <div className="flex h-full flex-col gap-5">
                  <div className="text-xs font-semibold tracking-[0.24em] text-gray-500 uppercase dark:text-gray-400">
                    {new Date(post.date).toLocaleDateString(siteMetadata.locale, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="space-y-3">
                    <h3 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-2xl font-semibold tracking-[-0.04em] text-gray-950 transition-colors dark:text-white">
                      {post.title}
                    </h3>
                    <p className="text-sm leading-7 text-gray-600 dark:text-gray-300">
                      {post.summary ?? ''}
                    </p>
                  </div>
                  <div className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Read article
                    <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
