import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'
import Orb from '@/components/Orb'
import SplitText from '@/components/SplitText'
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
            <SplitText
              text="Hello, nice to meet you."
              className="my-2 text-center text-2xl font-semibold"
              delay={150}
              animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
              threshold={0.2}
              rootMargin="-50px"
            />
            <div className="h-[550px] w-full">
              <Spline scene="https://prod.spline.design/u-rSfD5D6NGWRUxK/scene.splinecode" />
            </div>

            <div className="mt-8 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <svg
                className="mx-4 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span>Sharing insights and experiences from my development journey.</span>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link
                href="/blog"
                className="group relative flex w-56 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-4 text-base font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
                  Read Blog
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              </Link>

              {/* <Link
                href="/playground"
                className="group relative flex w-56 items-center justify-center overflow-hidden rounded-lg border-2 border-indigo-500 bg-transparent px-8 py-4 text-base font-medium text-indigo-600 transition-all duration-300 hover:scale-105 hover:bg-indigo-50/50 hover:shadow-lg dark:border-indigo-400 dark:text-indigo-300 dark:hover:bg-gray-800/50"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
                  Browse Playground
                </span>
                <span className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-50 to-blue-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-gray-800/50 dark:to-gray-900/50"></span>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
