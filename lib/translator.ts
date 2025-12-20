// Chrome Translator API 타입 정의
interface TranslatorCreateOptions {
  sourceLanguage: string
  targetLanguage: string
}

interface Translator {
  translate(text: string): Promise<string>
}

interface TranslatorConstructor {
  create(options: TranslatorCreateOptions): Promise<Translator>
  availability(options: TranslatorCreateOptions): Promise<'unavailable' | 'downloadable' | 'downloading' | 'available'>
}

declare global {
  interface Window {
    Translator?: TranslatorConstructor
  }
}

// 번역 제외 태그
const SKIP_TAGS = new Set([
  'SCRIPT',
  'STYLE',
  'CODE',
  'PRE',
  'TEXTAREA',
  'INPUT',
  'NOSCRIPT',
  'IFRAME',
  'SVG',
])

// 번역 제외 클래스
const SKIP_CLASSES = ['no-translate', 'notranslate']

// Translator API 지원 여부 확인
export function isTranslatorSupported(): boolean {
  return typeof window !== 'undefined' && 'Translator' in window
}

// 번역 가능 여부 확인
export async function canTranslate(
  sourceLanguage: string,
  targetLanguage: string
): Promise<'unavailable' | 'downloadable' | 'downloading' | 'available'> {
  if (!isTranslatorSupported()) return 'unavailable'

  try {
    console.log('[Translator] Checking availability:', { sourceLanguage, targetLanguage })
    const result = await window.Translator!.availability({
      sourceLanguage,
      targetLanguage,
    })
    console.log('[Translator] Availability result:', result)
    return result
  } catch (error) {
    console.error('[Translator] availability error:', error)
    return 'unavailable'
  }
}

// Translator 인스턴스 생성
export async function createTranslator(
  sourceLanguage: string,
  targetLanguage: string
): Promise<Translator | null> {
  if (!isTranslatorSupported()) return null

  try {
    const translator = await window.Translator!.create({
      sourceLanguage,
      targetLanguage,
    })
    return translator
  } catch (error) {
    console.error('Failed to create translator:', error)
    return null
  }
}

// 요소가 번역 제외 대상인지 확인
function shouldSkipElement(element: Element): boolean {
  if (SKIP_TAGS.has(element.tagName)) return true
  if (SKIP_CLASSES.some((cls) => element.classList.contains(cls))) return true
  return false
}

// 텍스트 노드 수집
function collectTextNodes(root: Element): Text[] {
  const textNodes: Text[] = []
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const parent = node.parentElement
      if (!parent) return NodeFilter.FILTER_REJECT

      // 부모 요소가 제외 대상인지 확인
      let current: Element | null = parent
      while (current) {
        if (shouldSkipElement(current)) {
          return NodeFilter.FILTER_REJECT
        }
        current = current.parentElement
      }

      // 공백만 있는 노드 제외
      if (!node.textContent?.trim()) {
        return NodeFilter.FILTER_REJECT
      }

      return NodeFilter.FILTER_ACCEPT
    },
  })

  let node: Text | null
  while ((node = walker.nextNode() as Text | null)) {
    textNodes.push(node)
  }

  return textNodes
}

// 페이지 번역 실행
export async function translatePage(
  translator: Translator,
  onProgress?: (current: number, total: number) => void
): Promise<void> {
  const textNodes = collectTextNodes(document.body)
  const total = textNodes.length

  // 배치 처리로 성능 최적화
  const BATCH_SIZE = 10

  for (let i = 0; i < textNodes.length; i += BATCH_SIZE) {
    const batch = textNodes.slice(i, i + BATCH_SIZE)

    await Promise.all(
      batch.map(async (node) => {
        const originalText = node.textContent
        if (!originalText?.trim()) return

        try {
          const translatedText = await translator.translate(originalText)
          node.textContent = translatedText
        } catch (error) {
          console.error('Translation failed for text:', originalText, error)
        }
      })
    )

    onProgress?.(Math.min(i + BATCH_SIZE, total), total)
  }
}

// 원본 텍스트 저장 및 복원
const originalTexts = new WeakMap<Text, string>()

export function saveOriginalTexts(): void {
  const textNodes = collectTextNodes(document.body)
  textNodes.forEach((node) => {
    if (node.textContent) {
      originalTexts.set(node, node.textContent)
    }
  })
}

export function restoreOriginalTexts(): void {
  const textNodes = collectTextNodes(document.body)
  textNodes.forEach((node) => {
    const original = originalTexts.get(node)
    if (original) {
      node.textContent = original
    }
  })
}
