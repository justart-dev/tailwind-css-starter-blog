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
    <div className="footer-near space-y-6 pt-6 md:space-y-8 md:pt-10">
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
                저에 대한 간단한 소개와 이 블로그를 운영하는 이유를 담았습니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="surface-panel relative overflow-hidden p-6 sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left_top,rgba(245,158,11,0.08),transparent_26%),radial-gradient(circle_at_right_bottom,rgba(59,130,246,0.08),transparent_30%)]" />
        <div className="relative grid items-stretch gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="space-y-6">
            <div className="flex h-full flex-col justify-center rounded-[1.75rem] p-8 text-center">
              {avatar && (
                <Image
                  src={avatar}
                  alt="avatar"
                  width={144}
                  height={144}
                  className="mx-auto h-28 w-28 rounded-[2rem] object-cover shadow-[0_12px_30px_-18px_rgba(15,23,42,0.6)]"
                />
              )}
              <h3 className="mt-6 mb-1 text-2xl font-semibold tracking-[-0.04em] text-black dark:text-white">
                {name}
              </h3>
              {occupation && (
                <div className="text-sm text-gray-700 dark:text-gray-300">{occupation}</div>
              )}
              {company && <div className="text-sm text-gray-700 dark:text-gray-300">{company}</div>}
            </div>
          </div>

          <div className="space-y-6">
            <div className="h-full rounded-[1.75rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,255,255,0.84))] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.62),rgba(15,23,42,0.38))]">
              <div className="text-xs font-semibold tracking-[0.22em] text-gray-500 uppercase dark:text-gray-400">
                About me
              </div>
              <div className="mt-4 h-px w-16 bg-gradient-to-r from-amber-300/70 to-transparent dark:from-cyan-300/50" />
              <div className="prose dark:prose-invert mt-6 max-w-none">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
