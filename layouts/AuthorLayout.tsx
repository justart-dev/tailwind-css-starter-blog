import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import Image from '@/components/Image'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, github } = content

  return (
    <div className="py-8">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-black md:text-5xl dark:text-white">
            About
          </h1>
        </div>
        <div className="flex flex-col md:flex-row md:items-start md:gap-12">
          <div className="mb-8 flex flex-col items-center md:mb-0 md:w-1/3">
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
          <div className="prose dark:prose-invert max-w-none md:w-2/3">{children}</div>
        </div>
      </div>
    </div>
  )
}
