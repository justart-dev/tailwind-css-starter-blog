import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import ListLayout from '@/layouts/ListLayoutWithTags'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({
  title: 'Blog',
  description: 'Read the latest articles on Web Development, React, and Next.js',
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

  return (
    <ListLayout
      posts={posts}
      totalPostCount={totalPostCount}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="Blog"
      eyebrow="Writing archive"
      description="개발 과정에서 마주친 고민과 작은 배움, 프로젝트의 흐름을 차분히 기록해 둔 글 목록입니다."
    />
  )
}
