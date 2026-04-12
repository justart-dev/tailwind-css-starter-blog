import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Tags',
  description: 'Browse posts by tags - Justart-dev Blog',
})

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  return (
    <div className="surface-panel mt-6 p-6 sm:mt-10 sm:p-8 dark:bg-slate-950/55">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="text-xs font-semibold tracking-[0.24em] text-gray-500 uppercase dark:text-gray-400">
            Topics
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-gray-950 sm:text-4xl dark:text-white">
            Tags
          </h1>
        </div>
        <div className="flex max-w-3xl flex-wrap gap-2">
          {tagKeys.length === 0 && 'No tags found.'}
          {sortedTags.map((t) => (
            <div key={t}>
              <Tag text={t} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
