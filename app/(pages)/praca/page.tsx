import {Header} from '@/components/Header'
import Section from '@/components/Section'
import SectionFullWidth from '@/components/SectionFullWidth'
import {sanityFetch} from '@/sanity/lib/live'
import {workPageQuery} from '@/sanity/lib/queries'
import {parseSanityImage} from '@/sanity/lib/utils'
import {SanityImage} from '@/types/image'
import type {Metadata} from 'next'
import Image from 'next/image'

export async function generateMetadata(): Promise<Metadata> {
  const {data} = await sanityFetch({query: workPageQuery, stega: false})

  return {
    title: data?.title ?? 'Praca',
    description: data?.description ?? '',
    openGraph: {
      title: data?.title ?? 'Praca',
      description: data?.description ?? '',
      url: 'https://azymutlab.com/praca',
    },
  }
}

export default async function Work() {
  const {data} = await sanityFetch({query: workPageQuery})

  const {
    description = '',
    title = '',
    image,
    imageAlt,
    introTitle = '',
    introDescription = '',
    ctaTitle = '',
    ctaDescription = '',
    ctaHref = '',
    ctaButtonText = '',
  } = data ?? {}

  const {urlBuilder} = parseSanityImage(image as SanityImage)

  const imageUrl = urlBuilder?.height(1400).url()

  return (
    <div className="space-y-8 md:space-y-12 flex flex-col flex-grow justify-between">
      <div className="space-y-8 md:space-y-12">
        {title ? <Header title={title} description={description} /> : null}

        <div className="flex flex-col md:flex-row justify-between gap-12 min-h-[75vh]">
          <div className="w-full md:w-1/2">
            <Section title={introTitle} description={introDescription}>
              <></>
            </Section>
          </div>

          <div className="relative h-[50vh] md:h-auto w-full md:w-1/2">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={imageAlt || 'Zdjęcie sekcji praca'}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 75vw, 30vw"
                fetchPriority="high"
              />
            ) : null}
          </div>
        </div>

        {ctaTitle && (
          <SectionFullWidth buttonHref={ctaHref} buttonText={ctaButtonText}>
            <div className="space-y-4">
              <h2 className="text-2xl md:text-4xl text-white tracking-tight">{ctaTitle}</h2>

              {ctaDescription && (
                <p className="text-md text-white/50 leading-relaxed max-w-sm">{ctaDescription}</p>
              )}
            </div>
          </SectionFullWidth>
        )}
      </div>
    </div>
  )
}
