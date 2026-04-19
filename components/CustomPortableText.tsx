import {urlForImage} from '@/sanity/lib/utils'
import {PortableText, type PortableTextBlock, type PortableTextComponents} from 'next-sanity'
import Image from 'next/image'
import type {Image as SanityImage} from 'sanity'

export function CustomPortableText({
  paragraphClasses,
  value,
}: {
  paragraphClasses?: string
  value: PortableTextBlock[]
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({children}) => {
        return <p className={paragraphClasses}>{children}</p>
      },
    },
    marks: {
      link: ({children, value}) => {
        return (
          <a
            className="underline transition hover:opacity-50"
            href={value?.href}
            rel="noreferrer noopener"
          >
            {children}
          </a>
        )
      },
    },
    types: {
      image: ({value}: {value: SanityImage & {alt?: string; caption?: string}}) => {
        const imageUrl = value ? urlForImage(value)?.height(600).url() : null

        return (
          <div className="my-6 space-y-2">
            {imageUrl ? (
              <Image src={imageUrl} alt={'image'} className="relative aspect-[16/9]" />
            ) : null}

            {value?.caption && (
              <div className="font-sans text-sm text-gray-600">{value.caption}</div>
            )}
          </div>
        )
      },
    },
  }

  return <PortableText components={components} value={value} />
}
