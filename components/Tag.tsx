import Link from 'next/link'
import { slug } from 'github-slugger'

interface Props {
  text: string
  interactive?: boolean
  hashed?: boolean
}

const Tag = ({ text, interactive = true, hashed = false }: Props) => {
  const tagSlug = slug(text)
  const displayText = text.split(' ').join('-')

  const passiveClasses = hashed
    ? 'inline-flex items-center text-sm font-medium tracking-[-0.02em] text-gray-600 dark:text-gray-300'
    : 'inline-flex items-center text-[11px] font-medium tracking-[0.14em] text-gray-500 uppercase dark:text-gray-400'

  const interactiveClasses =
    'inline-flex items-center rounded-full border border-gray-200/80 bg-white/80 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-gray-600 uppercase no-underline transition-colors hover:border-gray-950 hover:text-gray-950 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-white dark:hover:text-white'

  if (!interactive) {
    return (
      <span className="inline-flex">
        <span className={passiveClasses}>{hashed ? `#${displayText}` : displayText}</span>
      </span>
    )
  }

  return (
    <span className="inline-flex">
      <Link href={`/tags/${tagSlug}`} className={interactiveClasses}>
        <span>{displayText}</span>
      </Link>
    </span>
  )
}

export default Tag
