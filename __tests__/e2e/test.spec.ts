import { test, expect } from '@playwright/test'

test('홈 접속 > MyPicks 메뉴 클릭 > /myPicks 페이지 이동 > 페이지 제목이 "추천 링크 모음" 이 된다.', async ({
  page,
}) => {
  const startUrl = 'http://localhost:3000'
  const headingText = '추천 링크 모음'
  const title = /추천 링크 모음/

  await page.goto(startUrl)
  await page.getByRole('link', { name: 'MyPicks' }).click()

  await expect(page).toHaveURL(`${startUrl}/myPicks`)
  await expect(page.getByRole('heading', { name: headingText, level: 1 })).toBeVisible()
  await expect(page).toHaveTitle(title)
})

test('다크 모드 전환 테스트', async ({ page }) => {
  const startUrl = 'http://localhost:3000'

  // 1. 홈페이지 접속
  await test.step('1. 홈페이지에 접속합니다', async () => {
    await page.goto(startUrl)
    await expect(page).toHaveURL(startUrl)
  })

  // 2. 다크 모드 버튼 찾기
  await test.step('2. 다크 모드 전환 버튼을 찾습니다', async () => {
    const themeButton = page.getByRole('button', { name: 'Theme switcher' })
    await expect(themeButton).toBeVisible()

    // 테마 전환 버튼 클릭
    await themeButton.click()
  })

  // 3. 다크 모드 옵션 선택
  await test.step('3. 다크 모드 옵션을 선택합니다', async () => {
    // 다크 모드 옵션 버튼 찾기 (aria-label이나 텍스트로 찾기)
    const darkModeOption = page.getByRole('menuitem', { name: /dark/i })
    await expect(darkModeOption).toBeVisible()

    // 다크 모드 클릭
    await darkModeOption.click()

    // 테마 전환 애니메이션 대기
    await page.waitForTimeout(500)
  })

  // 4. 다크 모드 적용 확인
  await test.step('4. 다크 모드가 적용되었는지 확인합니다', async () => {
    const isDarkMode = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    )
    console.log(`현재 테마: ${isDarkMode ? '다크 모드' : '라이트 모드'}`)
    expect(isDarkMode).toBeTruthy()
  })

  // 5. 페이지 새로고침 후 테마 유지 확인
  await test.step('5. 페이지를 새로고침하여 다크 모드가 유지되는지 확인합니다', async () => {
    await page.reload()
    const isDarkMode = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    )
    expect(isDarkMode).toBeTruthy()
  })
})
