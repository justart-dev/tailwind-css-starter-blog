import siteMetadata from '@/data/siteMetadata'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import LanguageSelector from './LanguageSelector'
import { headerNavLinks } from 'app/headerNavLinks'

const Header = () => {
  let headerClass = 'masthead w-full py-5 sm:py-6'

  headerClass += ' transition-all duration-300 ease-in-out'

  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50 bg-paper/92 backdrop-blur-md dark:bg-ink/90'
  }

  return (
    <header className={headerClass}>
      <div className="px-1">
        <div className="flex min-h-[52px] items-center justify-between gap-4">
          {/* Left: nav links */}
          <div className="hidden items-center gap-6 md:flex">
            {headerNavLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="mono text-muted hover:text-ink dark:text-muted dark:hover:text-paper transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </div>

          {/* Right: actions */}
          <div className="ml-auto flex items-center gap-3">
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
