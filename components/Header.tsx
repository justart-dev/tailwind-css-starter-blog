import siteMetadata from '@/data/siteMetadata'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import Image from 'next/image'
import { headerNavLinks } from 'app/headerNavLinks'

const Header = () => {
  let headerClass = 'flex items-center w-full justify-between py-6'

  // 헤더 스타일 - 부드러운 디자인을 위한 스타일 조정
  headerClass += ' bg-white/90 dark:bg-transparent  transition-all duration-200 ease-in-out '

  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label={siteMetadata.headerTitle} className="flex items-center">
            <div className="mr-3">
              <Image
                src={siteMetadata.siteLogo}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full border-2 border-gray-200 transition-colors duration-300 dark:border-gray-700"
              />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-6 text-2xl font-semibold text-gray-900 transition-colors duration-300 sm:block dark:text-gray-100">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </Link>
          <div className="flex items-center space-x-4">
            {headerNavLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="hidden font-medium text-gray-900 hover:text-blue-600 sm:block dark:text-gray-100 dark:hover:text-blue-400"
              >
                {link.title}
              </Link>
            ))}
            <SearchButton />
            <ThemeSwitch />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
