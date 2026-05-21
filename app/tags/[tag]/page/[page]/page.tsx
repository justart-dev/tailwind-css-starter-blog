import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/tag-data.json'
import { notFound, redirect } from 'next/navigation'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

const POSTS_PER_PAGE = 5

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  return Object.keys(tagCounts).flatMap((tag) => {
    const postCount = tagCounts[tag]
    const totalPages = Math.max(1, Math.ceil(postCount / POSTS_PER_PAGE))
    return Array.from({ length: Math.max(totalPages - 1, 0) }, (_, i) => ({
      tag: encodeURI(tag),
      page: (i + 2).toString(),
    }))
  })
}

export async function generateMetadata(props: {
  params: Promise<{ tag: string; page: string }>
}): Promise<Metadata> {
  const params = await props.params
  const tag = decodeURI(params.tag)
  const pageNumber = parseInt(params.page, 10)

  return genPageMetadata({
    title: pageNumber <= 1 ? `${tag} 관련 글` : `${tag} 관련 글 - Page ${pageNumber}`,
    description: `${tag}와 관련된 글 목록 ${pageNumber}페이지`,
    path:
      pageNumber <= 1
        ? `/tags/${encodeURIComponent(tag)}`
        : `/tags/${encodeURIComponent(tag)}/page/${pageNumber}`,
  })
}

export default async function TagPage(props: { params: Promise<{ tag: string; page: string }> }) {
  const params = await props.params
  const tag = decodeURI(params.tag)
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  const pageNumber = parseInt(params.page)
  const totalPostCount = allCoreContent(sortPosts(allBlogs)).length
  const filteredPosts = allCoreContent(
    sortPosts(allBlogs.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)))
  )
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  if (pageNumber === 1) {
    redirect(`/tags/${encodeURIComponent(tag)}`)
  }

  // Return 404 for invalid page numbers or empty pages
  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound()
  }
  const initialDisplayPosts = filteredPosts.slice(
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
            name: `${title} 관련 글 - Page ${pageNumber}`,
            url: `${siteMetadata.siteUrl}/tags/${encodeURIComponent(tag)}/page/${pageNumber}`,
            description: `${title} 관련 글 목록 ${pageNumber}페이지`,
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
        posts={filteredPosts}
        totalPostCount={totalPostCount}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title={`${title} 관련 글`}
        eyebrow="Tag archive"
        description={`${title} 관련 글과 기록을 한곳에 모아둔 태그 아카이브입니다.`}
      />
    </>
  )
}
