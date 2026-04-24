import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  path?: string
  type?: 'website' | 'article'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export function buildCanonicalUrl(path: string = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return new URL(normalizedPath, siteMetadata.siteUrl).toString()
}

export function genPageMetadata({
  title,
  description,
  image,
  path = '/',
  type = 'website',
  ...rest
}: PageSEOProps): Metadata {
  const canonical = buildCanonicalUrl(path)

  return {
    title,
    description: description || siteMetadata.description,
    keywords: siteMetadata.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${title} | ${siteMetadata.title}`,
      description: description || siteMetadata.description,
      url: canonical,
      siteName: siteMetadata.title,
      images: image ? [image] : [siteMetadata.socialBanner],
      locale: siteMetadata.locale.replace('-', '_'),
      type,
    },
    twitter: {
      title: `${title} | ${siteMetadata.title}`,
      description: description || siteMetadata.description,
      card: 'summary_large_image',
      images: image ? [image] : [siteMetadata.socialBanner],
    },
    ...rest,
  }
}
