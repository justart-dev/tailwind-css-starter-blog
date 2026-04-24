import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/ListLayoutWithTags'
import siteMetadata from '@/data/siteMetadata'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({
  title: 'Blog',
  description: 'React, Next.js, 아키텍처, 인프라, 프로젝트 경험을 기록한 Justart-dev 글 아카이브.',
  path: '/blog',
})

export default async function BlogPage(props: { searchParams: Promise<{ page: string }> }) {
  const posts = allCoreContent(sortPosts(allBlogs))
  const totalPostCount = posts.length
  const pageNumber = 1
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE * pageNumber)
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }
  const collectionDescription =
    '개발 과정에서 마주친 고민과 작은 배움, 프로젝트의 흐름을 차분히 기록해 둔 글 목록입니다.'
  const topPosts = initialDisplayPosts.slice(0, 10)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Blog',
            url: `${siteMetadata.siteUrl}/blog`,
            description: collectionDescription,
            isPartOf: {
              '@type': 'WebSite',
              name: siteMetadata.title,
              url: siteMetadata.siteUrl,
            },
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: topPosts.map((post, index) => ({
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
        posts={posts}
        totalPostCount={totalPostCount}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="Blog"
        eyebrow="Writing archive"
        description={collectionDescription}
      />
    </>
  )
}
