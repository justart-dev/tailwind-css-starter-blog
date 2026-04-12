import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  const tagSlug = slug(text)
  const displayText = text.split(' ').join('-')

  return (
    <span className="inline-flex">
      <Link
        href={`/tags/${tagSlug}`}
        className="inline-flex items-center rounded-full border border-gray-200/80 bg-white/80 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-gray-600 uppercase transition-colors hover:border-gray-950 hover:text-gray-950 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-white dark:hover:text-white"
      >
        <span>{displayText}</span>
      </Link>
    </span>
  )
}

export default Tag
