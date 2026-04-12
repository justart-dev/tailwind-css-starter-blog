import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import Image from '@/components/Image'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company } = content

  return (
    <div className="space-y-6 pt-6 md:space-y-8 md:pt-10">
      <div className="surface-panel p-6 sm:p-8">
        <div className="flex flex-col gap-3">
          <div className="text-xs font-semibold tracking-[0.24em] text-gray-500 uppercase dark:text-gray-400">
            Profile
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-[-0.05em] text-gray-950 sm:text-4xl dark:text-white">
                About
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-300">
                Justart에 대해 소개합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="surface-panel p-6 sm:p-8">
        <div className="grid items-start gap-10 md:grid-cols-[290px_minmax(0,1fr)]">
          <div className="flex flex-col items-center text-center">
            {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={144}
                height={144}
                className="h-36 w-36 rounded-full border border-gray-200 dark:border-gray-700"
              />
            )}
            <h3 className="mt-4 mb-1 text-xl font-semibold text-black dark:text-white">{name}</h3>
            <div className="text-sm text-gray-700 dark:text-gray-300">{occupation}</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">{company}</div>
          </div>
          <div className="prose dark:prose-invert max-w-none">{children}</div>
        </div>
      </div>
    </div>
  )
}
