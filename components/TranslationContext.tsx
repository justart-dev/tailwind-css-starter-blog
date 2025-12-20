'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import {
  isTranslatorSupported,
  canTranslate,
  createTranslator,
  translatePage,
} from '../lib/translator'

export type SupportedLanguage = 'ko' | 'en' | 'ja'

interface TranslationContextType {
  currentLang: SupportedLanguage
  isSupported: boolean
  isTranslating: boolean
  progress: number
  setLanguage: (lang: SupportedLanguage) => Promise<void>
}

const TranslationContext = createContext<TranslationContextType | null>(null)

const STORAGE_KEY = 'preferred-language'

interface TranslationProviderProps {
  children: ReactNode
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const pathname = usePathname()
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>('ko')
  const [isSupported, setIsSupported] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isInitialized, setIsInitialized] = useState(false)

  // 초기화: API 지원 여부 확인 및 저장된 언어 로드
  useEffect(() => {
    const supported = isTranslatorSupported()
    setIsSupported(supported)

    if (supported) {
      const savedLang = localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null
      if (savedLang && ['ko', 'en', 'ja'].includes(savedLang)) {
        setCurrentLang(savedLang)
      }
    }

    setIsInitialized(true)
  }, [])

  // 페이지 변경 시 번역 적용
  useEffect(() => {
    console.log('[Translation] Effect triggered:', { isInitialized, isSupported, currentLang, pathname })
    if (!isInitialized || !isSupported || currentLang === 'ko') return

    const applyTranslation = async () => {
      console.log('[Translation] Starting translation to:', currentLang)
      setIsTranslating(true)
      setProgress(0)

      try {
        // 번역 가능 여부 확인
        console.log('[Translation] Checking availability...')
        const availability = await canTranslate('ko', currentLang)
        console.log('[Translation] Availability:', availability)
        if (availability === 'unavailable') {
          console.warn('Translation not available for this language pair')
          setIsTranslating(false)
          return
        }

        // Translator 생성
        console.log('[Translation] Creating translator...')
        const translator = await createTranslator('ko', currentLang)
        console.log('[Translation] Translator created:', translator)
        if (!translator) {
          console.error('Failed to create translator')
          setIsTranslating(false)
          return
        }

        // 페이지 번역 실행
        console.log('[Translation] Translating page...')
        await translatePage(translator, (current, total) => {
          setProgress(Math.round((current / total) * 100))
        })
        console.log('[Translation] Translation complete!')
      } catch (error) {
        console.error('[Translation] Translation failed:', error)
      } finally {
        setIsTranslating(false)
        setProgress(100)
      }
    }

    // DOM이 완전히 로드된 후 번역 시작
    const timer = setTimeout(applyTranslation, 300)
    return () => clearTimeout(timer)
  }, [currentLang, isInitialized, isSupported, pathname])

  const setLanguage = useCallback(
    async (lang: SupportedLanguage) => {
      if (lang === currentLang) return

      // 언어 변경 시 페이지 새로고침으로 깔끔하게 처리
      localStorage.setItem(STORAGE_KEY, lang)
      window.location.reload()
    },
    [currentLang]
  )

  return (
    <TranslationContext.Provider
      value={{
        currentLang,
        isSupported,
        isTranslating,
        progress,
        setLanguage,
      }}
    >
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider')
  }
  return context
}
