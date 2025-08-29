import siteMetadata from '@/data/siteMetadata'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import Image from 'next/image'
import { headerNavLinks } from 'app/headerNavLinks'

const Header = () => {
  let headerClass = 'flex items-center w-full justify-between py-2 sm:py-3'

  // 헤더 스타일 - 부드러운 디자인을 위한 스타일 조정
  headerClass +=
    ' bg-white/90 dark:bg-transparent backdrop-blur-sm transition-all duration-300 ease-in-out'

  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[48px] items-center justify-between sm:min-h-[52px]">
          <Link
            href="/"
            aria-label={siteMetadata.headerTitle}
            className="flex flex-shrink-0 items-center"
          >
            <div className="mr-2 flex h-8 min-h-[2rem] w-8 min-w-[2rem] items-center justify-center overflow-hidden sm:mr-3 sm:h-10 sm:min-h-[2.5rem] sm:w-10 sm:min-w-[2.5rem]">
              <Image
                src={siteMetadata.siteLogo}
                alt="avatar"
                width={40}
                height={40}
                className="aspect-square h-full w-full rounded-full border-2 border-gray-200 object-cover transition-all duration-300 dark:border-gray-700"
                priority
              />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden text-xl font-semibold whitespace-nowrap text-gray-900 transition-colors duration-300 sm:block sm:text-2xl dark:text-gray-100">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </Link>
          <div className="flex flex-shrink-0 items-center space-x-2 sm:space-x-4">
            <div className="hidden items-center space-x-4 md:flex">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="font-medium whitespace-nowrap text-gray-900 transition-colors duration-200 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
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
