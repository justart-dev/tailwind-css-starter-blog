import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer className="site-footer pb-10">
      <div className="mt-16 border-t border-black/8 px-6 pt-8 dark:border-white/10">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="text-xs font-semibold tracking-[0.28em] text-gray-500 uppercase dark:text-gray-400">
            Small attempts add up to big changes.
          </div>
          <div className="mb-1 flex space-x-4">
            <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
            <SocialIcon kind="github" href={siteMetadata.github} size={6} />
            <SocialIcon kind="notion" href={siteMetadata.notion} size={6} />
            <SocialIcon kind="threads" href={siteMetadata.threads} size={6} />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <div>{siteMetadata.author}</div>
            <div>{`© ${new Date().getFullYear()}`}</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
