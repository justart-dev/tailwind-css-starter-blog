import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const tagCounts = tagData as Record<string, number>
  const postsPerPage = 5

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  const siteLastModified = (() => {
    const dates = allBlogs
      .filter((post) => !post.draft)
      .map((post) => new Date(post.lastmod || post.date).getTime())
    return new Date(Math.max(...dates)).toISOString().split('T')[0]
  })()

  const routes = ['', 'blog', 'myPicks', 'tags'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: siteLastModified,
  }))

  const totalBlogPages = Math.ceil(allBlogs.filter((post) => !post.draft).length / postsPerPage)
  const blogPageRoutes = Array.from({ length: Math.max(totalBlogPages - 1, 0) }, (_, index) => ({
    url: `${siteUrl}/blog/page/${index + 2}`,
    lastModified: siteLastModified,
  }))

  const tagRoutes = Object.keys(tagCounts).map((tag) => ({
    url: `${siteUrl}/tags/${encodeURIComponent(tag)}`,
    lastModified: siteLastModified,
  }))

  const tagPageRoutes = Object.entries(tagCounts).flatMap(([tag, postCount]) => {
    const totalPages = Math.ceil(postCount / postsPerPage)
    return Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => ({
      url: `${siteUrl}/tags/${encodeURIComponent(tag)}/page/${index + 2}`,
      lastModified: siteLastModified,
    }))
  })

  return [...routes, ...blogPageRoutes, ...tagRoutes, ...tagPageRoutes, ...blogRoutes]
}
