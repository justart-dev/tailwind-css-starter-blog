#!/usr/bin/env node
import siteMetadata from '../data/siteMetadata.js'

const AI_BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Yeti',
]
const CONCURRENCY = 6

async function fetchText(url) {
  const started = Date.now()
  const response = await fetch(url, { headers: { 'User-Agent': 'justart-seo-snapshot' } })
  const body = await response.text()
  return { status: response.status, body, ms: Date.now() - started }
}

async function mapWithLimit(items, limit, task) {
  const results = []
  let cursor = 0
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++
      results[index] = await task(items[index])
    }
  })
  await Promise.all(workers)
  return results
}

function inspectPage(url, { status, body, ms }) {
  const title = body.match(/<title>([^<]*)<\/title>/)?.[1] ?? ''
  const description = body.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? ''
  const canonical = body.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? ''
  const ldTypes = [...body.matchAll(/"@type":"([A-Za-z]+)"/g)].map((match) => match[1])
  const internalLinks = new Set([...body.matchAll(/href="(\/blog\/[^"#?]*)"/g)].map((m) => m[1]))
  return {
    url,
    status,
    ms,
    title,
    description,
    canonical,
    ldTypes: [...new Set(ldTypes)],
    internalLinks: internalLinks.size,
  }
}

const siteUrl = siteMetadata.siteUrl
const robots = await fetchText(`${siteUrl}/robots.txt`)
const sitemap = await fetchText(`${siteUrl}/sitemap.xml`)
const llms = await fetchText(`${siteUrl}/llms.txt`)
const llmsFull = await fetchText(`${siteUrl}/llms-full.txt`)
const notFound = await fetchText(`${siteUrl}/definitely-not-a-page-${Date.now()}`)
const urls = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
const pages = await mapWithLimit(urls, CONCURRENCY, async (url) =>
  inspectPage(url, await fetchText(url))
)

const allowedBots = AI_BOTS.filter((bot) =>
  new RegExp(`User-Agent:\\s*${bot}[\\s\\S]*?Allow:\\s*/`, 'i').test(robots.body)
)
const blockedBots = AI_BOTS.filter((bot) => !allowedBots.includes(bot))
const broken = pages.filter((page) => page.status !== 200)
const missingDescription = pages.filter((page) => !page.description)
const missingCanonical = pages.filter((page) => !page.canonical)
const noStructuredData = pages.filter((page) => page.ldTypes.length === 0)
const averageInternalLinks =
  pages.reduce((sum, page) => sum + page.internalLinks, 0) / (pages.length || 1)
const sortedLatency = pages.map((page) => page.ms).sort((a, b) => a - b)

console.log(`# SEO snapshot — ${new Date().toISOString().slice(0, 10)}`)
console.log(`\nsite: ${siteUrl}`)
console.log(`\n## Crawler-side numbers\n`)
console.log(`| metric | value |`)
console.log(`| --- | --- |`)
console.log(`| sitemap URLs | ${urls.length} |`)
console.log(`| pages returning 200 | ${pages.length - broken.length}/${pages.length} |`)
console.log(
  `| AI crawlers allowed in robots.txt | ${allowedBots.length}/${AI_BOTS.length} (${allowedBots.join(', ')}) |`
)
console.log(
  `| AI crawlers not explicitly allowed | ${blockedBots.length ? blockedBots.join(', ') : '—'} |`
)
console.log(`| llms.txt | ${llms.status} · ${llms.body.length} bytes |`)
console.log(`| llms-full.txt | ${llmsFull.status} · ${llmsFull.body.length} bytes |`)
console.log(`| unknown URL status | ${notFound.status} |`)
console.log(`| pages without meta description | ${missingDescription.length} |`)
console.log(`| pages without canonical | ${missingCanonical.length} |`)
console.log(`| pages without structured data | ${noStructuredData.length} |`)
console.log(`| avg internal /blog links per page | ${averageInternalLinks.toFixed(1)} |`)
console.log(`| median response (ms) | ${sortedLatency[Math.floor(sortedLatency.length / 2)]} |`)

if (broken.length > 0) {
  console.log(`\n### Non-200 pages\n`)
  for (const page of broken) console.log(`- ${page.status} ${page.url}`)
}

console.log(`\n### Structured data types (by page)\n`)
for (const page of pages.filter((p) => p.ldTypes.length > 0)) {
  console.log(`- ${new URL(page.url).pathname}: ${page.ldTypes.join(', ')}`)
}
