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

const LanguageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const Blank = () => <div className="h-6 w-6" />

const LanguageSelector = () => {
  const [mounted, setMounted] = useState(false)
  const { currentLang, isSupported, isTranslating, progress, setLanguage } = useTranslation()

  useEffect(() => setMounted(true), [])

  // API 미지원 시 컴포넌트 숨김
  if (!mounted || !isSupported) {
    return null
  }

  const currentLanguage = languages.find((l) => l.code === currentLang)

  return (
    <div className="flex items-center">
      <Menu as="div" className="relative inline-block text-left">
        <div className="flex items-center justify-center hover:text-blue-600 dark:hover:text-blue-600">
          <MenuButton
            aria-label="Language selector"
            className="flex items-center gap-1"
            disabled={isTranslating}
          >
            {isTranslating ? (
              <div className="flex items-center gap-1">
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
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
                <span className="text-xs">{progress}%</span>
              </div>
            ) : (
              <>
                <LanguageIcon />
                <span className="hidden text-sm sm:inline">{currentLanguage?.flag}</span>
              </>
            )}
          </MenuButton>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="ring-opacity-5 absolute right-0 z-50 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-hidden dark:bg-gray-800">
            <RadioGroup value={currentLang} onChange={setLanguage}>
              <div className="p-1">
                {languages.map((lang) => (
                  <Radio key={lang.code} value={lang.code}>
                    <MenuItem>
                      {({ focus }) => (
                        <button
                          className={`${focus ? 'bg-blue-600 text-white' : ''} ${
                            currentLang === lang.code ? 'font-semibold' : ''
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          <span className="mr-2">{lang.flag}</span>
                          {lang.label}
                          {currentLang === lang.code && (
                            <svg
                              className="ml-auto h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
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
      </Menu>
    </div>
  )
}

export default LanguageSelector
