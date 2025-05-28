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
        className="mr-2 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100 hover:text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/50 dark:hover:text-blue-300"
      >
        <span>{displayText}</span>
      </Link>
    </span>
  )
}

export default Tag
