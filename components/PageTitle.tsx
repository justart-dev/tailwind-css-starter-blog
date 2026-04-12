import { ReactNode } from 'react'
import clsx from 'clsx'

interface Props {
  children: ReactNode
  className?: string
}

export default function PageTitle({ children, className }: Props) {
  return (
    <h1
      className={clsx(
        'text-4xl font-semibold tracking-[-0.06em] text-gray-950 sm:text-5xl lg:text-6xl dark:text-white',
        className
      )}
    >
      {children}
    </h1>
  )
}
