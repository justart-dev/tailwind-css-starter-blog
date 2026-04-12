import siteMetadata from '@/data/siteMetadata'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import LanguageSelector from './LanguageSelector'
import Image from 'next/image'
import { headerNavLinks } from 'app/headerNavLinks'

const Header = () => {
  let headerClass = 'w-full py-4 sm:py-5'

  headerClass += ' transition-all duration-300 ease-in-out'

  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <div className="px-1 py-2">
        <div className="flex min-h-[52px] items-center justify-between gap-4">
          <Link
            href="/"
            aria-label={siteMetadata.headerTitle}
            className="flex flex-shrink-0 items-center gap-3"
          >
            <div className="flex h-10 min-h-[2.5rem] w-10 min-w-[2.5rem] items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-amber-100 to-orange-100 shadow-sm ring-1 ring-black/5 sm:h-11 sm:w-11 dark:from-sky-500/20 dark:to-cyan-400/10 dark:ring-white/10">
              <Image
                src={siteMetadata.siteLogo}
                alt="avatar"
                width={44}
                height={44}
                className="aspect-square h-full w-full rounded-2xl object-cover transition-all duration-300"
                priority
              />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden text-lg font-semibold whitespace-nowrap text-gray-950 transition-colors duration-300 sm:block sm:text-xl dark:text-gray-50">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </Link>
          <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
            <div className="hidden min-h-[46px] items-center rounded-full border border-gray-200/80 bg-white/80 px-2 py-1.5 shadow-sm md:flex dark:border-white/10 dark:bg-white/5">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap text-gray-700 transition-all duration-200 hover:bg-gray-950 hover:text-white dark:text-gray-200 dark:hover:bg-white dark:hover:text-gray-950"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <div className="flex min-h-[46px] items-center gap-1 rounded-full border border-gray-200/80 bg-white/70 px-3 py-1.5 shadow-sm dark:border-white/10 dark:bg-white/5">
              <SearchButton />
              <ThemeSwitch />
              <MobileNav />
              <LanguageSelector />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
