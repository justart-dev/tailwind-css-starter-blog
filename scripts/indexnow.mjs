#!/usr/bin/env node
import siteMetadata from '../data/siteMetadata.js'

const KEY = 'f61399c26bb28dd93419408d31f5a81f'
const ENDPOINT = 'https://api.indexnow.org/indexnow'

async function fetchSitemapUrls() {
  const response = await fetch(`${siteMetadata.siteUrl}/sitemap.xml`)
  if (!response.ok) throw new Error(`sitemap fetch failed: ${response.status}`)
  const xml = await response.text()
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
}

async function submit(urls) {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: new URL(siteMetadata.siteUrl).host,
      key: KEY,
      keyLocation: `${siteMetadata.siteUrl}/${KEY}.txt`,
      urlList: urls,
    }),
  })
  return { status: response.status, text: await response.text() }
}

const urls = process.argv.slice(2).filter((arg) => arg.startsWith('http'))
const targets = urls.length > 0 ? urls : await fetchSitemapUrls()

if (targets.length === 0) {
  console.error('IndexNow: 제출할 URL이 없습니다')
  process.exit(1)
}

const result = await submit(targets)
console.log(`IndexNow: ${targets.length}개 URL 제출 → HTTP ${result.status}`)
if (result.text) console.log(result.text)
process.exit(result.status === 200 || result.status === 202 ? 0 : 1)
