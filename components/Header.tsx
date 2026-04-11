import {CustomPortableText} from '@/components/CustomPortableText'
import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import {urlForImage} from '@/sanity/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import type {Image as IImage, PathSegment} from 'sanity'
import {Navbar} from './Navbar'

interface HeaderProps {
  id: string | null
  type: string | null
  path: PathSegment[]
  description?: null | any[]
  title?: string | null
}

export async function Header(props: HeaderProps) {
  const {id, type, path, title, description} = props

  if (!description && !title) {
    return null
  }

  const {data} = await sanityFetch({query: settingsQuery})
  const logoUrl = data?.ogImage
    ? urlForImage(data.ogImage as IImage)
        ?.width(120)
        .height(93)
        .url()
    : ''

  return (
    <div className="space-y-2 md:space-y-4">
      <Link href="/" className="flex justify-between items-center">
        {/* Title */}
        {title && (
          <h1 className="text-3xl tracking-[12px] uppercase md:text-6xl font-normal">{title}</h1>
        )}

        {/* Logo */}
        {logoUrl && (
          <Image
            src={logoUrl}
            alt="Logo"
            width={120}
            height={93}
            sizes="(max-width: 768px) 80px, 120px"
            className="w-20 md:w-[120px]"
          />
        )}
      </Link>

      {/* Description */}
      {description && (
        <div className="text-pretty font-serif text-lg text-gray-600 md:text-xl w-5/6 lg:w-3/5 min-h-[120px]">
          <CustomPortableText id={id} type={type} path={path} value={description} />
        </div>
      )}

      {/* Navbar */}
      <Navbar data={data} />
    </div>
  )
}
