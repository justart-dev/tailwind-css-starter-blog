import Link from '@/components/Link'

const recoveryLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/tags', label: 'Tags' },
  { href: '/myPicks', label: 'MyPicks' },
  { href: '/sitemap.xml', label: 'Sitemap' },
  { href: '/feed.xml', label: 'RSS' },
]

export default function NotFound() {
  return (
    <div className="flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6">
      <div className="space-x-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-6xl leading-9 font-extrabold tracking-tight text-gray-900 md:border-r-2 md:px-6 md:text-8xl md:leading-14 dark:text-gray-100">
          404
        </h1>
      </div>
      <div className="max-w-md">
        <p className="mb-4 text-xl leading-normal font-bold md:text-2xl">
          Sorry we couldn't find this page.
        </p>
        <p className="mb-8">But dont worry, you can find plenty of other things on our homepage.</p>
        <Link
          href="/"
          className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm leading-5 font-medium text-white shadow-xs transition-colors duration-150 hover:bg-blue-700 focus:outline-hidden dark:hover:bg-blue-500"
        >
          Back to homepage
        </Link>
        <div className="mt-8 space-y-3">
          <div className="text-[11px] font-semibold tracking-[0.24em] text-gray-500 uppercase dark:text-gray-400">
            Where to look next
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {recoveryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted hover:text-ink dark:text-muted dark:hover:text-paper text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
