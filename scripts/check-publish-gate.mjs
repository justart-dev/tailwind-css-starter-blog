#!/usr/bin/env node
import { readdirSync, readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import matter from 'gray-matter'

const BLOG_DIR = 'data/blog'
const PUBLIC_DIR = 'public'
const LIMITS = { title: 60, summary: 160 }

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name)
    return entry.isDirectory() ? walk(full) : full.endsWith('.mdx') ? [full] : []
  })
}

const errors = []
const warnings = []

for (const file of walk(BLOG_DIR)) {
  const { data, content } = matter(readFileSync(file, 'utf8'))
  if (data.draft === true) continue

  const label = file
  if (!data.title) errors.push(`${label}: title 없음`)
  else if (data.title.length > LIMITS.title)
    warnings.push(`${label}: title ${data.title.length}자 (권장 ${LIMITS.title}자 이하)`)

  if (!data.date) errors.push(`${label}: date 없음`)

  if (!data.summary)
    errors.push(`${label}: summary 없음 — 직답 블록과 meta description이 비어 있음`)
  else if (data.summary.length > LIMITS.summary)
    warnings.push(`${label}: summary ${data.summary.length}자 (권장 ${LIMITS.summary}자 이하)`)

  const imageRefs = [...content.matchAll(/(?:src=["']|<Image[^>]*src=["'])([^"']+)/g)].map(
    (match) => match[1]
  )
  for (const ref of imageRefs) {
    if (/^https?:/.test(ref)) continue
    const assetPath = join(PUBLIC_DIR, ref.replace(/^\//, ''))
    if (!existsSync(assetPath)) errors.push(`${label}: 이미지 없음 ${ref}`)
  }

  if (!Array.isArray(data.tags) || data.tags.length === 0)
    warnings.push(`${label}: 태그 없음 — 추천 글(Recommended reading)이 최근 글만으로 채워짐`)
}

for (const message of warnings) console.warn(`WARN  ${message}`)
for (const message of errors) console.error(`ERROR ${message}`)

console.log(
  `\npublish gate: ${errors.length} error(s), ${warnings.length} warning(s) across ${walk(BLOG_DIR).length} posts`
)

process.exit(errors.length > 0 ? 1 : 0)
