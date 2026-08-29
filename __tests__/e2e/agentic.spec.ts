import { test, expect } from '@playwright/test'

// 에이전트 친화성 테스트 (Is Agentic 개선 항목).
// 실행 전 준비: `pnpm dev` 서버 기동 후 `node scripts/generate-markdown.mjs` 로
// public/llms.txt 등 에이전트 파일을 생성해야 합니다 (.contentlayer 생성 이후).

const startUrl = 'http://localhost:3000'

test('홈 화면의 raw HTML에 h1 제목이 존재해야 한다.', async ({ page }) => {
  const response = await page.goto(startUrl)

  expect(response?.status()).toBe(200)

  const h1 = page.getByRole('heading', { name: 'Justart-dev archive', level: 1 })
  await expect(h1).toBeVisible()
})

test('홈 화면의 raw HTML 텍스트가 500자 이상이어야 한다.', async ({ page }) => {
  const response = await page.goto(startUrl)
  const html = (await response?.text()) ?? ''

  const text = html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  expect(text.length).toBeGreaterThanOrEqual(500)
})

test('제거된 신뢰 페이지(/about 등)는 404로 응답해야 한다.', async ({ page }) => {
  const response = await page.goto(`${startUrl}/about`)

  expect(response?.status()).toBe(404)
})

test('존재하지 않는 경로는 404로 응답하고 안내 링크(Blog 등)를 제공해야 한다.', async ({
  page,
}) => {
  const response = await page.goto(`${startUrl}/agentic-test-no-page`)

  expect(response?.status()).toBe(404)
  const main = page.locator('main')
  await expect(main.getByRole('link', { name: 'llms.txt' })).toBeHidden()
  await expect(main.getByRole('link', { name: 'Blog' })).toBeVisible()
})

test('/llms.txt가 llmstxt.org 형식(H1, 요약, when-to-use, 파일 목록)을 따라야 한다.', async ({
  request,
}) => {
  const response = await request.get(`${startUrl}/llms.txt`)

  expect(response.status()).toBe(200)

  const body = await response.text()
  expect(body.startsWith('# ')).toBeTruthy()
  expect(body).toContain('# Justart-dev Blog')
  expect(body).toContain('> ')
  expect(body).toContain('When to use this site')
  expect(body).toContain('## Writing')
  expect(body).toContain('/blog/')
  expect(body).toContain('## Optional')
})

test('/llms.txt의 Writing 목록 링크는 실제 마크다운(.md) 파일을 가리켜야 한다.', async ({
  request,
}) => {
  const response = await request.get(`${startUrl}/llms.txt`)
  const body = await response.text()

  const mdLinks = [...body.matchAll(/\]\((https:\/\/justart-dev\.pages\.dev\/[^\s)]+\.md)\)/g)]
  expect(mdLinks.length).toBeGreaterThan(0)

  const sample = mdLinks[0][1].replace('https://justart-dev.pages.dev', startUrl)
  const mdResponse = await request.get(sample)
  expect(mdResponse.status()).toBe(200)

  const mdBody = await mdResponse.text()
  expect(mdBody.startsWith('# ')).toBeTruthy()
})
