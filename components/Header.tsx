import siteMetadata from '@/data/siteMetadata'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import Image from 'next/image'
import { headerNavLinks } from 'app/headerNavLinks'

const Header = () => {
  let headerClass = 'flex items-center w-full justify-between py-4 sm:py-6'

  // 헤더 스타일 - 부드러운 디자인을 위한 스타일 조정
  headerClass += ' bg-white/90 dark:bg-transparent backdrop-blur-sm transition-all duration-300 ease-in-out'

  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[60px]">
          <Link href="/" aria-label={siteMetadata.headerTitle} className="flex items-center flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 min-w-[2rem] min-h-[2rem] sm:min-w-[2.5rem] sm:min-h-[2.5rem] mr-2 sm:mr-3 flex items-center justify-center overflow-hidden">
              <Image
                src={siteMetadata.siteLogo}
                alt="avatar"
                width={40}
                height={40}
                className="w-full h-full aspect-square object-cover rounded-full border-2 border-gray-200 transition-all duration-300 dark:border-gray-700"
                priority
              />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden text-xl sm:text-2xl font-semibold text-gray-900 transition-colors duration-300 sm:block dark:text-gray-100 whitespace-nowrap">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </Link>
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            <div className="hidden md:flex items-center space-x-4">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200 dark:text-gray-100 dark:hover:text-blue-400 whitespace-nowrap"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <SearchButton />
              <ThemeSwitch />
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
