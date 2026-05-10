import {parseSanityImage} from '@/sanity/lib/utils'
import {SanityImage} from '@/types/image'
import {PortableText, type PortableTextBlock, type PortableTextComponents} from 'next-sanity'
import Image from 'next/image'

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
        const {urlBuilder, blurDataURL} = parseSanityImage(value)

        const imageUrl = urlBuilder?.height(600).url()

        return (
          <div className="my-6 space-y-2">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={value?.alt || 'Zdjęcie do artykułu'}
                className="relative aspect-[16/9]"
                placeholder={blurDataURL ? 'blur' : undefined}
                blurDataURL={blurDataURL || undefined}
              />
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
