import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import { genPageMetadata } from './seo'

export const metadata = genPageMetadata({
  title: 'Home',
  description:
    '개발 과정에서 마주친 고민과 프로젝트 기록을 차분히 쌓아두는 Justart-dev 개인 아카이브 블로그.',
  path: '/',
})

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
