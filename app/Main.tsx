import { slug } from 'github-slugger'
import Link from '@/components/Link'
import DecryptedText from '@/components/DecryptedText'
import Eyebrow from '@/components/Eyebrow'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'
import type { Blog } from 'contentlayer/generated'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

type MainProps = {
  posts: CoreContent<Blog>[]
}

export default function Home({ posts }: MainProps) {
  const recentPosts = posts.slice(0, 3)
  const tagCounts = tagData as Record<string, number>
  const topTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <div className="pt-6 pb-4 md:pt-8">
      {/* Hero */}
      <section className="hero-section dark:border-line-dark/8 relative flex items-center justify-center border-b border-black/8">
        <div className="mt-[-20rem] max-w-4xl text-center">
          <div className="text-muted text-[11px] font-semibold tracking-[0.24em] uppercase">
            Justart-dev archive
          </div>
          <div className="mt-24">
            <DecryptedText
              text="#Justart-dev #DevLog #LearnInPublic #CodeNotes #QuestionEverything #Life"
              animateOn="view"
              sequential={true}
              revealDirection="center"
              speed={40}
              maxIterations={10}
              className="text-ink dark:text-paper"
              encryptedClassName="text-muted/50"
              parentClassName="decrypted-text__block"
            />
          </div>
        </div>
        <div className="absolute bottom-48 left-1/2 -translate-x-1/2">
          <ChevronDownIcon className="text-muted/60 h-5 w-5 animate-bounce" />
        </div>
      </section>

      {/* POINT OF VIEW */}
      <section className="dark:border-line-dark/8 border-t border-black/8 py-16 md:py-20">
        <div className="max-w-4xl">
          <Eyebrow>Point of view</Eyebrow>
          <p className="text-muted mt-6 max-w-2xl text-base leading-8">
            숨겨놓았는데, 잘 찾으셨네요.
            <br />
            여기는 개발하며 마주한 고민과 생각, 그리고 그 과정에서 남은 흔적을 모아둔 작은
            아카이브입니다.
            <br />
            코드부터 삽질, 웹 개발과 인프라, 아키텍처와 프로젝트 회고까지 기록합니다.
          </p>
        </div>
      </section>

      {/* Recent writing + Tags */}
      <section className="dark:border-line-dark/8 grid gap-12 border-t border-black/8 py-14 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <div className="mb-8 flex items-end gap-6 pb-4">
            <div>
              <Eyebrow>Recent writing</Eyebrow>
            </div>
          </div>
          <ul className="divide-y divide-black/8 dark:divide-white/10">
            {recentPosts.map((post) => (
              <li key={post.path} className="py-6">
                <article className="grid gap-3 md:grid-cols-[120px_minmax(0,1fr)] md:gap-6">
                  <time
                    className="text-muted pt-1 text-sm"
                    dateTime={post.date}
                    suppressHydrationWarning
                  >
                    {formatDate(post.date, siteMetadata.locale)}
                  </time>
                  <div className="space-y-3">
                    <h4 className="text-ink dark:text-paper text-2xl font-semibold tracking-[-0.04em]">
                      <Link
                        href={`/${post.path}`}
                        className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h4>
                    <p className="text-muted max-w-2xl text-sm leading-7">{post.summary}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>

        <aside className="dark:border-line-dark/8 space-y-8 border-t border-black/8 pt-8 lg:border-t-0 lg:pt-0 lg:pl-6">
          <div>
            <Eyebrow>Short note</Eyebrow>
            <div className="text-muted mt-4 space-y-4 text-sm leading-7">
              <p>안녕하세요. 함께 하면 즐거운 개발자가 되고 싶은 Justart입니다.</p>
              <p>클로드는 사랑이지만, 요즘은 코덱스가 더 끌리네요.</p>
            </div>
          </div>

          <div className="dark:border-line-dark/8 border-t border-black/8 pt-6">
            <Eyebrow>Tags</Eyebrow>
            <div className="mt-4 flex flex-wrap gap-2">
              {topTags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${slug(tag)}`}
                  className="border-line/8 text-muted hover:border-line hover:text-ink dark:border-line-dark/8 dark:text-muted dark:hover:text-paper rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
                >
                  #{tag}
                  <span className="text-muted ml-1">{tagCounts[tag]}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}
