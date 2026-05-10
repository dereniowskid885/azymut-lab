import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import {parseSanityImage} from '@/sanity/lib/utils'
import {SanityImage} from '@/types/image'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from './Navbar'

interface HeaderProps {
  title?: string | null
  description?: string | null
}

export async function Header(props: HeaderProps) {
  const {title, description} = props

  if (!description && !title) {
    return null
  }

  const {data} = await sanityFetch({query: settingsQuery})

  const {urlBuilder} = parseSanityImage(data?.logoImage as SanityImage)

  const logoUrl = urlBuilder?.width(120).height(93).url()

  return (
    <div className="space-y-4 md:space-y-8">
      <div className="flex justify-between items-center gap-4">
        {title && (
          <h1 className="text-2xl md:text-4xl tracking-[12px] uppercase lg:text-6xl font-normal">
            <Link href="/">{title}</Link>
          </h1>
        )}

        {logoUrl && (
          <Link href="/">
            <Image
              src={logoUrl}
              alt="Logo Azymut Lab - studio projektowe z Krakowa"
              width={120}
              height={93}
              sizes="(max-width: 768px) 80px, 120px"
              className="w-20 md:w-[120px]"
              fetchPriority="high"
            />
          </Link>
        )}
      </div>

      <hr className="border-gray-200 full-container-width" />

      <Navbar />

      {description && (
        <p className="text-md md:text-lg text-gray-600 md:w-5/6 lg:w-3/5 leading-relaxed whitespace-pre-wrap">
          {description}
        </p>
      )}

      <hr className="border-gray-200 full-container-width" />
    </div>
  )
}
