import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { Separator } from '@/components/ui/separator'

export default function Footer() {
  return (
    <footer className="mt-16">
      <Separator className="mb-10" />
      <div className="flex flex-col items-center">
        <div className="mb-4 flex space-x-5">
          {siteMetadata.email ? (
            <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          ) : null}
          {siteMetadata.github ? (
            <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          ) : null}
          {siteMetadata.linkedin ? (
            <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          ) : null}
          {siteMetadata.x ? <SocialIcon kind="x" href={siteMetadata.x} size={6} /> : null}
          {siteMetadata.telegram ? (
            <SocialIcon kind="telegram" href={siteMetadata.telegram} size={6} />
          ) : null}
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link className="hover:text-primary transition-colors" href="/">
            {siteMetadata.title}
          </Link>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <Link className="hover:text-primary transition-colors" href="https://beian.miit.gov.cn">
            皖ICP备20001994号
          </Link>
        </div>
      </div>
    </footer>
  )
}
