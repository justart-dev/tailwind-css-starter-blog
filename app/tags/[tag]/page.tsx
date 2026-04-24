import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/tag-data.json'
import { genPageMetadata, buildCanonicalUrl } from 'app/seo'
import { Metadata } from 'next'

const POSTS_PER_PAGE = 5

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const params = await props.params
  const tag = decodeURI(params.tag)
  return genPageMetadata({
    title: tag,
    description: `${tag}와 관련된 글과 기록을 모아둔 Justart-dev 태그 아카이브.`,
    path: `/tags/${encodeURIComponent(tag)}`,
    alternates: {
      canonical: buildCanonicalUrl(`/tags/${encodeURIComponent(tag)}`),
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${encodeURIComponent(tag)}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  return tagKeys.map((tag) => ({
    tag: encodeURI(tag),
  }))
}

export default async function TagPage(props: { params: Promise<{ tag: string }> }) {
  const params = await props.params
  const tag = decodeURI(params.tag)
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const totalPostCount = allCoreContent(sortPosts(allBlogs)).length
  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)))
  )
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = filteredPosts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: totalPages,
  }
  const collectionDescription = `${title}와 관련된 글과 기록을 한곳에 모아둔 태그 아카이브입니다.`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `${title} tag archive`,
            url: `${siteMetadata.siteUrl}/tags/${encodeURIComponent(tag)}`,
            description: collectionDescription,
            isPartOf: {
              '@type': 'WebSite',
              name: siteMetadata.title,
              url: siteMetadata.siteUrl,
            },
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: initialDisplayPosts.slice(0, 10).map((post, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `${siteMetadata.siteUrl}/${post.path}`,
                name: post.title,
                description: post.summary,
              })),
            },
          }),
        }}
      />
      <ListLayout
        posts={filteredPosts}
        totalPostCount={totalPostCount}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title={title}
        eyebrow="Tag archive"
        description={collectionDescription}
      />
    </>
  )
}
