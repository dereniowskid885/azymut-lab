import {Header} from '@/components/Header'
import OfferSlider from '@/components/OfferSlider'
import Section from '@/components/Section'
import SectionFullWidth from '@/components/SectionFullWidth'
import {sanityFetch} from '@/sanity/lib/live'
import {offerPageQuery} from '@/sanity/lib/queries'
import type {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const {data} = await sanityFetch({query: offerPageQuery, stega: false})

  return {
    title: data?.title ?? 'Oferta',
    description: data?.description ?? '',
    openGraph: {
      title: data?.title ?? 'Oferta',
      description: data?.description ?? '',
      url: 'https://azymutlab.com/oferta',
    },
  }
}

export default async function Offer() {
  const {data} = await sanityFetch({query: offerPageQuery})

  const {
    description = '',
    title = '',
    services = [],
    ctaTitle = '',
    ctaDescription = '',
    ctaButtonText = '',
    ctaHref = '',
  } = data ?? {}

  return (
    <main className="space-y-8 md:space-y-12">
      {title ? <Header title={title} description={description} /> : null}

      {services?.map((service, index) => (
        <div key={service._key} className="space-y-8 md:space-y-12">
          <Section title={service.title} description={service.description} note={service.note}>
            <OfferSlider data={service.variants} />
          </Section>

          {index < services.length - 1 ? (
            <hr className="border-gray-200 full-container-width" />
          ) : null}
        </div>
      ))}

      {ctaTitle ? (
        <SectionFullWidth buttonHref={ctaHref} buttonText={ctaButtonText}>
          <div className="space-y-4">
            <h2 className="text-2xl md:text-4xl text-white tracking-tight">{ctaTitle}</h2>

            {ctaDescription && (
              <p className="text-md text-white/50 leading-relaxed max-w-sm">{ctaDescription}</p>
            )}
          </div>
        </SectionFullWidth>
      ) : null}
    </main>
  )
}
