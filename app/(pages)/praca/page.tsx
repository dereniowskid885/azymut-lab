import {Header} from '@/components/Header'
import Section from '@/components/Section'
import SectionFullWidth from '@/components/SectionFullWidth'
import {sanityFetch} from '@/sanity/lib/live'
import {workPageQuery} from '@/sanity/lib/queries'

export default async function Work() {
  const {data} = await sanityFetch({query: workPageQuery})

  const {
    description = '',
    title = '',
    introTitle = '',
    introDescription = '',
    ctaTitle = '',
    ctaDescription = '',
    ctaHref = '',
    ctaButtonText = '',
  } = data ?? {}

  return (
    <div className="space-y-8 md:space-y-12 flex flex-col flex-grow justify-between">
      <div className="space-y-8 md:space-y-12">
        {title ? <Header title={title} description={description} /> : null}

        <Section title={introTitle} description={introDescription}>
          <></>
        </Section>
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
  )
}
