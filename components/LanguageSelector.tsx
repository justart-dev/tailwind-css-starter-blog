'use client'

import { Fragment, useEffect, useState } from 'react'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Radio,
  RadioGroup,
  Transition,
} from '@headlessui/react'
import { useTranslation, SupportedLanguage } from './TranslationContext'

const languages: { code: SupportedLanguage; label: string; flag: string }[] = [
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
]

const Blank = () => <div className="h-5 w-5" style={{ width: '1.25rem', height: '1.25rem' }} />

const LanguageSelector = () => {
  const [mounted, setMounted] = useState(false)
  const { currentLang, isSupported, isTranslating, progress, setLanguage } = useTranslation()

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <Blank />
  }

  const currentLanguage = languages.find((l) => l.code === currentLang)

  return (
    <div className="flex items-center">
      <Menu as="div" className="relative inline-block text-left">
        <div
          className={`flex items-center justify-center ${
            isSupported
              ? 'text-gray-500 dark:text-gray-400'
              : 'cursor-not-allowed text-gray-400 dark:text-gray-500'
          }`}
        >
          <MenuButton
            aria-label="Language selector"
            className="inline-flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-base leading-none transition-colors hover:text-gray-950 dark:hover:text-white"
            disabled={isTranslating || !isSupported}
            title={!isSupported ? '현재 브라우저에서는 언어 전환을 지원하지 않습니다.' : undefined}
          >
            {isTranslating ? (
              <div className="flex items-center gap-1">
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  style={{ width: '1rem', height: '1rem', flexShrink: 0 }}
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span className="text-[11px]">{progress}%</span>
              </div>
            ) : (
              <span className="text-base leading-none">{currentLanguage?.flag}</span>
            )}
          </MenuButton>
        </div>
        {isSupported && (
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 z-50 mt-2 w-36 origin-top-right divide-y divide-black/8 rounded-2xl border border-black/8 bg-[#fcfbf8] p-1 shadow-lg ring-0 shadow-black/5 focus:outline-hidden dark:divide-white/10 dark:border-white/10 dark:bg-[#0f172a]">
              <RadioGroup value={currentLang} onChange={setLanguage}>
                <div className="p-1">
                  {languages.map((lang) => (
                    <Radio key={lang.code} value={lang.code}>
                      <MenuItem>
                        {({ focus }) => (
                          <button
                            className={`${focus ? 'bg-gray-950 text-white dark:bg-white dark:text-gray-950' : 'text-gray-700 dark:text-gray-200'} ${
                              currentLang === lang.code ? 'font-semibold' : ''
                            } group flex w-full items-center rounded-xl px-3 py-2 text-sm transition-colors`}
                          >
                            <span className="mr-2">{lang.flag}</span>
                            {lang.label}
                            {currentLang === lang.code && (
                              <svg
                                className="ml-auto h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                style={{ width: '1rem', height: '1rem', flexShrink: 0 }}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </button>
                        )}
                      </MenuItem>
                    </Radio>
                  ))}
                </div>
              </RadioGroup>
            </MenuItems>
          </Transition>
        )}
      </Menu>
    </div>
  )
}

export default LanguageSelector
