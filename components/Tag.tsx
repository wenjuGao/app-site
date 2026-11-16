import Link from './Link'
import { slug } from 'github-slugger'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Props {
  text: string
  className?: string
}

const Tag = ({ text, className = '' }: Props) => {
  return (
    <Badge
      asChild
      variant="secondary"
      className={cn(
        'hover:bg-primary hover:text-primary-foreground mr-2 mb-2 transition-colors',
        className
      )}
    >
      <Link href={`/tags/${slug(text)}`}>{text.split(' ').join('-')}</Link>
    </Badge>
  )
}

export default Tag
