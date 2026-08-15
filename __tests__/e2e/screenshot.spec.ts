import { test } from '@playwright/test'

test('screenshot homepage', async ({ page }) => {
  await page.goto('http://localhost:3004')
  await page.waitForTimeout(4000)
  await page.screenshot({ path: '/tmp/screenshot.png', fullPage: true })
})
