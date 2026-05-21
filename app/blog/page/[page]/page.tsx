import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { notFound, redirect } from 'next/navigation'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

const POSTS_PER_PAGE = 5

export const generateStaticParams = async () => {
  const publishedPosts = allBlogs.filter((post) => !post.draft)
  const totalPages = Math.ceil(publishedPosts.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: Math.max(totalPages - 1, 0) }, (_, i) => ({
    page: (i + 2).toString(),
  }))

  return paths
}

export async function generateMetadata(props: {
  params: Promise<{ page: string }>
}): Promise<Metadata> {
  const params = await props.params
  const pageNumber = parseInt(params.page, 10)

  return genPageMetadata({
    title: pageNumber <= 1 ? 'Blog' : `Blog - Page ${pageNumber}`,
    description: `Justart-dev 블로그 글 목록 ${pageNumber}페이지`,
    path: pageNumber <= 1 ? '/blog' : `/blog/page/${pageNumber}`,
  })
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  const posts = allCoreContent(sortPosts(allBlogs))
  const totalPostCount = posts.length
  const pageNumber = parseInt(params.page as string)
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  if (pageNumber === 1) {
    redirect('/blog')
  }

  // Return 404 for invalid page numbers or empty pages
  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound()
  }
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `Blog - Page ${pageNumber}`,
            url: `${siteMetadata.siteUrl}/blog/page/${pageNumber}`,
            description: `Justart-dev 블로그 글 목록 ${pageNumber}페이지`,
            isPartOf: {
              '@type': 'WebSite',
              name: siteMetadata.title,
              url: siteMetadata.siteUrl,
            },
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: initialDisplayPosts.map((post, index) => ({
                '@type': 'ListItem',
                position: POSTS_PER_PAGE * (pageNumber - 1) + index + 1,
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
        description="개발 과정에서 마주친 고민과 작은 배움, 프로젝트의 흐름을 차분히 기록해 둔 글 목록입니다."
      />
    </>
  )
}
