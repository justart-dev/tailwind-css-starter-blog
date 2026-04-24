import { slug } from 'github-slugger'
import Link from '@/components/Link'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'

export const metadata = genPageMetadata({
  title: 'Tags',
  description: '블로그에서 다루는 주제를 태그별로 모아볼 수 있는 Justart-dev 태그 인덱스.',
  path: '/tags',
})

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  const totalTopics = sortedTags.length
  const collectionDescription =
    '블로그에서 다루는 주제를 태그 기준으로 모아볼 수 있는 인덱스입니다.'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Tags',
            url: `${siteMetadata.siteUrl}/tags`,
            description: collectionDescription,
            isPartOf: {
              '@type': 'WebSite',
              name: siteMetadata.title,
              url: siteMetadata.siteUrl,
            },
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: sortedTags.slice(0, 20).map((tag, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `${siteMetadata.siteUrl}/tags/${encodeURIComponent(tag)}`,
                name: tag,
              })),
            },
          }),
        }}
      />
      <div className="pt-6 pb-4 md:pt-8">
        <section className="border-b border-black/8 pt-2 pb-10 md:pt-6 md:pb-10 dark:border-white/10">
          <div className="max-w-4xl space-y-6">
            <div className="text-[11px] font-semibold tracking-[0.24em] text-gray-500 uppercase dark:text-gray-400">
              Topics
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.07em] text-gray-950 sm:text-6xl dark:text-white">
              Tags
            </h1>
            <div className="text-sm text-gray-500 dark:text-gray-400">{totalTopics} topics</div>
          </div>
        </section>

        <section className="border-t border-black/8 py-14 dark:border-white/10">
          {tagKeys.length === 0 ? (
            <div className="text-sm text-gray-500 dark:text-gray-400">No tags found.</div>
          ) : (
            <div className="max-w-5xl">
              <div className="flex flex-wrap gap-3 md:gap-4">
                {sortedTags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${slug(tag)}`}
                    className="inline-flex items-center px-1 py-1 text-sm font-medium tracking-[-0.02em] text-gray-700 no-underline dark:text-gray-300"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  )
}
