import { ImgHTMLAttributes } from 'react'

interface CustomImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  sizes?: string
  quality?: number
  placeholder?: string
  unoptimized?: boolean
}

const basePath = (import.meta.env.VITE_BASE_PATH as string) || ''

const Image = ({
  src,
  width,
  height,
  fill,
  priority,
  sizes,
  quality: _quality,
  placeholder: _placeholder,
  unoptimized: _unoptimized,
  style,
  ...rest
}: CustomImageProps) => {
  const resolvedSrc =
    src.startsWith('http') || src.startsWith('data:') || src.startsWith('blob:')
      ? src
      : `${basePath}${src}`

  const fillStyle = fill
    ? { position: 'absolute' as const, inset: 0, width: '100%', height: '100%' }
    : {}

  return (
    <img
      src={resolvedSrc}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      style={{ ...fillStyle, ...style }}
      {...rest}
    />
  )
}

export default Image
