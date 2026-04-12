import { slug } from 'github-slugger'
import Link from '@/components/Link'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Tags',
  description: 'Browse posts by tags - Justart-dev Blog',
})

const tagDescriptions: Record<string, string> = {
  project: '프로젝트를 진행하며 정리한 기록과 회고를 모아둔 카테고리입니다.',
  infra: '인프라, 배포, 운영 과정에서 정리한 내용을 다룹니다.',
  architecture: '구조 설계와 시스템 관점에서 고민한 내용을 담고 있습니다.',
  typescript: '타입 안정성과 개발 경험 개선에 대한 내용을 정리합니다.',
  react: 'React 컴포넌트, 렌더링, 상태 관리 관련 기록입니다.',
  think: '개발 과정에서의 생각과 배운 점을 짧게 남긴 글입니다.',
  'ai-agent': 'AI 에이전트와 자동화 실험에 대한 기록을 모아둔 공간입니다.',
  tdd: '테스트와 TDD 실천 과정에서 정리한 내용을 다룹니다.',
  'tailwind-css': 'Tailwind CSS로 UI를 구현하며 정리한 기록입니다.',
}

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  const totalTopics = sortedTags.length
  const totalPosts = sortedTags.reduce((sum, key) => sum + tagCounts[key], 0)

  return (
    <div className="footer-near space-y-6 pt-6 md:space-y-8 md:pt-10">
      <div className="surface-panel p-6 sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-xs font-semibold tracking-[0.24em] text-gray-500 uppercase dark:text-gray-400">
              Topics
            </div>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-gray-950 sm:text-4xl dark:text-white">
              Tags
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-300">
              주제별로 정리된 글들을 한눈에 보고, 관심 있는 카테고리로 바로 이동할 수 있습니다.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:min-w-[240px]">
            <div className="rounded-[1.5rem] border border-gray-200/80 bg-gray-50/80 p-4 dark:border-white/10 dark:bg-white/5">
              <div className="text-xs font-semibold tracking-[0.18em] text-gray-500 uppercase dark:text-gray-400">
                Topics
              </div>
              <div className="mt-2 text-2xl font-semibold text-gray-950 dark:text-white">
                {totalTopics}
              </div>
            </div>
            <div className="rounded-[1.5rem] border border-gray-200/80 bg-gray-50/80 p-4 dark:border-white/10 dark:bg-white/5">
              <div className="text-xs font-semibold tracking-[0.18em] text-gray-500 uppercase dark:text-gray-400">
                Tagged posts
              </div>
              <div className="mt-2 text-2xl font-semibold text-gray-950 dark:text-white">
                {totalPosts}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="surface-panel p-6 sm:p-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tagKeys.length === 0 && 'No tags found.'}
          {sortedTags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${slug(tag)}`}
              className="group rounded-[1.75rem] border border-gray-200/90 bg-white p-5 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.18)] transition-transform duration-200 hover:-translate-y-1 dark:border-white/10 dark:bg-slate-950/40"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold tracking-[0.18em] text-gray-500 uppercase dark:text-gray-400">
                    Topic
                  </div>
                  <h2 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 mt-2 text-xl font-semibold tracking-[-0.04em] text-gray-950 transition-colors dark:text-white">
                    {tag}
                  </h2>
                </div>
                <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
                  {tagCounts[tag]} posts
                </span>
              </div>
              <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300">
                {tagDescriptions[tag] || '이 주제와 관련된 글과 기록을 모아둔 카테고리입니다.'}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
