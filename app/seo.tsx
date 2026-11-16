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

function ogImageEntry(image?: string) {
  const url = image || siteMetadata.socialBanner
  const absolute = url.startsWith('http') ? url : `${siteMetadata.siteUrl}${url}`
  return { url: absolute, width: 1200, height: 630, alt: siteMetadata.title }
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
  const ogImage = ogImageEntry(image)
  const shareTitle = title === siteMetadata.title ? title : `${title} | ${siteMetadata.headerTitle}`

  return {
    title,
    description: description || siteMetadata.description,
    keywords: siteMetadata.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: shareTitle,
      description: description || siteMetadata.description,
      url: canonical,
      siteName: siteMetadata.title,
      images: [ogImage],
      locale: siteMetadata.locale.replace('-', '_'),
      type,
    },
    twitter: {
      title: shareTitle,
      description: description || siteMetadata.description,
      card: 'summary_large_image',
      images: [ogImage.url],
    },
    ...rest,
  }
}
