import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import { genPageMetadata } from './seo'

export const metadata = genPageMetadata({
  title: 'Justart-dev 개발 아카이브',
  description:
    'React, Next.js, TypeScript, 인프라, 아키텍처, 프로젝트 회고를 기록하는 개인 개발 블로그입니다.',
  path: '/',
})

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
