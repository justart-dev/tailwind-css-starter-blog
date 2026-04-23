import siteMetadata from '@/data/siteMetadata'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import LanguageSelector from './LanguageSelector'
import Image from 'next/image'
import { headerNavLinks } from 'app/headerNavLinks'

const Header = () => {
  let headerClass = 'w-full py-5 sm:py-6'

  headerClass += ' transition-all duration-300 ease-in-out'

  if (siteMetadata.stickyNav) {
    headerClass +=
      ' sticky top-0 z-50 border-b border-black/6 bg-[#fcfbf8]/92 backdrop-blur-md dark:border-white/10 dark:bg-[#0b1020]/90'
  }

  return (
    <header className={headerClass}>
      <div className="px-1">
        <div className="flex min-h-[52px] items-center justify-between gap-4">
          <Link
            href="/"
            aria-label={siteMetadata.headerTitle}
            className="flex flex-shrink-0 items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-black/8 bg-white dark:border-white/10 dark:bg-slate-900">
              <Image
                src={siteMetadata.siteLogo}
                alt="avatar"
                width={44}
                height={44}
                className="aspect-square h-full w-full rounded-xl object-cover"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-semibold tracking-[-0.03em] text-gray-950 dark:text-white">
                {siteMetadata.headerTitle}
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {headerNavLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-950 dark:text-gray-300 dark:hover:text-white"
              >
                {link.title}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-3 md:flex">
              <SearchButton />
              <ThemeSwitch />
              <LanguageSelector />
            </div>
            <div className="flex items-center md:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
