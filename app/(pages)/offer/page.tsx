import {Header} from '@/components/Header'
import Section from '@/components/Section'
import {sanityFetch} from '@/sanity/lib/live'
import {offerPageQuery} from '@/sanity/lib/queries'
import Link from 'next/link'

export default async function Offer() {
  const {data} = await sanityFetch({query: offerPageQuery})

  const {
    description = '',
    title = '',
    services = [],
    process = [],
    ctaTitle = '',
    ctaDescription = '',
  } = data ?? {}

  return (
    <div className="space-y-10 md:space-y-12">
      {title ? <Header title={title} description={description} /> : null}

      {services && services.length > 0 && (
        <Section title="Usługi">
          <div className="space-y-12">
            {services.map((service) => (
              <div
                key={service._key}
                className="grid grid-cols-1 md:grid-cols-[48px_1fr_3fr_1fr] gap-4 md:gap-8"
              >
                <div className="select-none text-2xl">{service.icon}</div>

                <h2 className="text-xl">{service.title}</h2>

                <p className="text-lg leading-relaxed text-gray-500">{service.description}</p>

                {service.scope && service.scope.length > 0 && (
                  <div className="flex flex-row md:flex-col gap-2 flex-wrap md:items-end">
                    {service.scope.map((item) => (
                      <span
                        key={item}
                        className="text-sm tracking-wide font-bold bg-studio-100 border border-studio-300 px-3 py-1 rounded-full whitespace-nowrap"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      <hr className="border-gray-200 full-container-width" />

      {process && process.length > 0 && (
        <Section title="Proces współpracy">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {process.map((step) => (
              <div key={step._key} className="space-y-4">
                <p className="text-4xl text-studio-100">{String(step.step).padStart(2, '0')}</p>
                <p className="text-xl">{step.title}</p>
                <p className="text-lg leading-relaxed text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

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
