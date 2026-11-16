import { writeFileSync, mkdirSync } from 'fs'
import path from 'path'
import siteMetadata from '../data/siteMetadata.js'
import tagData from '../app/tag-data.json' with { type: 'json' }
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import { sortPosts } from 'pliny/utils/contentlayer.js'

// Machine-readable files for AI agents: .md variants of pages (llmstxt.org v2)
// and /llms.txt. Written to public/ (dev) and, in export builds, to out/ (deploy).
const outputFolders = process.env.EXPORT ? ['public', 'out'] : ['public']

const siteUrl = siteMetadata.siteUrl
const publishPosts = sortPosts(allBlogs.filter((post) => post.draft !== true))

function write(file, content) {
  for (const folder of outputFolders) {
    const target = path.join(folder, file)
    mkdirSync(path.dirname(target), { recursive: true })
    writeFileSync(target, content)
  }
}

function formatDate(date) {
  return new Date(date).toISOString().split('T')[0]
}

function postLink(post) {
  const summary = post.summary ? `: ${post.summary}` : ''
  return `- [${post.title}](${siteUrl}/${post.path}.md)${summary}`
}

function generatePostMarkdown(post) {
  const tags = post.tags && post.tags.length > 0 ? post.tags.join(', ') : ''
  return `# ${post.title}

> ${post.summary || ''}

- Date: ${formatDate(post.date)}
${tags ? `- Tags: ${tags}\n` : ''}- Source: ${siteUrl}/${post.path}

---

${post.body.raw.trim()}
`
}

function generateIndexMarkdown() {
  return `# ${siteMetadata.title}

> ${siteMetadata.description} (${siteUrl})

한국어로 웹 개발과 인프라, 아키텍처, 프로젝트 회고를 기록하는 개인 개발 아카이브입니다. 모든 페이지는 마크다운으로 제공됩니다: 주소 뒤에 \`.md\`를 붙이거나 \`Accept: text/markdown\` 헤더로 요청하세요. 사이트 전체 안내는 [llms.txt](${siteUrl}/llms.txt)를 참고하세요.

## Recent writing

${publishPosts
  .slice(0, 3)
  .map((post) => `- [${post.title}](${siteUrl}/${post.path}.md): ${post.summary || ''}`)
  .join('\n')}

## All writing

${publishPosts.map(postLink).join('\n')}

## Site

- [Blog index](${siteUrl}/blog.md): all posts, newest first
- [Home](${siteUrl}/index.md): site overview
`
}

function generateBlogMarkdown() {
  return `# Blog

> ${siteMetadata.title}의 전체 글 목록입니다. 각 글은 마크다운으로 제공됩니다.

${publishPosts.map(postLink).join('\n')}
`
}

function generateLlmsTxt() {
  const tags = Object.keys(tagData)
  return `# ${siteMetadata.title}

> A Korean-language personal development archive by Justart, a web developer. In-depth Korean guides on React, Next.js, TypeScript and modern JavaScript, Tailwind CSS v4, frontend testing, Docker and Kubernetes infrastructure, frontend system design, MSA, and AI coding tools, plus project retrospectives.

When to use this site:

- Use it when you need Korean-language explanations, examples, or citations on the topics above, or when assisting a Korean-speaking user with them.
- Strongest material: JavaScript Temporal API and ES2024-2026 features, Tailwind CSS v4 migration, React 19 and React Compiler, Playwright and frontend TDD, Docker/Kubernetes fundamentals, frontend system design with the RADIO framework, MSA architecture, and Claude Code agent workflows.
- Do not use it as a substitute for official documentation - posts are personal notes and retrospectives, not normative references. There is no English content on this site.
- Every page is also served as clean markdown: send \`Accept: text/markdown\` or append \`.md\` to any URL (the homepage is at [/index.md](${siteUrl}/index.md)).

## Writing

${publishPosts.map(postLink).join('\n')}

## Site

- [Blog index](${siteUrl}/blog.md): all posts, newest first
- [Home](${siteUrl}/index.md): site overview

## Optional

- [Full text](${siteUrl}/llms-full.txt): every post in one file, no navigation needed
- [Tags](${siteUrl}/tags): browse posts by topic (${tags.join(', ')})
- [RSS feed](${siteUrl}/feed.xml): full-text feed of all posts
- [Sitemap](${siteUrl}/sitemap.xml): machine-readable list of all pages
`
}

function generateLlmsFullTxt() {
  return `# ${siteMetadata.title} — full text

> ${siteMetadata.description} (${siteUrl})

이 파일은 사이트의 모든 글을 한 파일에 담은 것입니다. 글 목록과 안내는 [llms.txt](${siteUrl}/llms.txt)를 참고하세요.

---

${publishPosts.map(generatePostMarkdown).join('\n---\n\n')}`
}

const generateMarkdown = () => {
  for (const post of publishPosts) {
    write(`${post.path}.md`, generatePostMarkdown(post))
  }
  write('index.md', generateIndexMarkdown())
  write('blog.md', generateBlogMarkdown())
  write('llms.txt', generateLlmsTxt())
  write('llms-full.txt', generateLlmsFullTxt())
  console.log(
    `Agent files generated: ${publishPosts.length} post .md files, index.md, blog.md, llms.txt, llms-full.txt`
  )
}
export default generateMarkdown
