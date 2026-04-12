import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export default function PageTitle({ children, className }: Props) {
  return (
    <h1
      className={`text-4xl font-semibold tracking-[-0.06em] text-gray-950 sm:text-5xl lg:text-6xl dark:text-white${className ? ` ${className}` : ''}`}
    >
      {children}
    </h1>
  )
}
