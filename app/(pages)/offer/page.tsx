import {Header} from '@/components/Header'
import OfferSection from '@/components/OfferSection'
import {sanityFetch} from '@/sanity/lib/live'
import {offerPageQuery} from '@/sanity/lib/queries'
import Link from 'next/link'

export default async function Offer() {
  const {data} = await sanityFetch({query: offerPageQuery})

  const {
    description = '',
    title = '',
    services = [],
    ctaTitle = '',
    ctaDescription = '',
  } = data ?? {}

  return (
    <div className="space-y-8 md:space-y-12">
      {title ? <Header title={title} description={description} /> : null}

      {services?.map((service, index) => (
        <div key={service._key} className="space-y-8 md:space-y-12">
          <OfferSection
            title={service.title}
            description={service.description}
            note={service.note}
            variants={service.variants}
          />

          {index < services.length - 1 && <hr className="border-gray-200 full-container-width" />}
        </div>
      ))}

      {ctaTitle && (
        <section className="bg-black flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-12 full-container-width">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-4xl text-white tracking-tight">{ctaTitle}</h2>

            {ctaDescription && (
              <p className="text-md text-white/50 leading-relaxed max-w-sm">{ctaDescription}</p>
            )}
          </div>

          <Link
            href="/contact"
            className="shrink-0 border border-white/30 text-white text-sm tracking-widest uppercase px-7 py-3 hover:bg-white/10 transition-colors"
          >
            Napisz do nas
          </Link>
        </section>
      )}
    </div>
  )
}
