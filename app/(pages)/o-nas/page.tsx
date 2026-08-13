import {Header} from '@/components/Header'
import SectionFullWidth from '@/components/SectionFullWidth'
import TeamMemberSection from '@/components/TeamMemberSection'
import {sanityFetch} from '@/sanity/lib/live'
import {aboutPageQuery} from '@/sanity/lib/queries'
import {parseSanityImage} from '@/sanity/lib/utils'
import {SanityImage} from '@/types/image'
import type {Metadata} from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const {data} = await sanityFetch({query: aboutPageQuery, stega: false})

  return {
    title: data?.title ?? 'O nas',
    description: data?.description ?? '',
    openGraph: {
      title: data?.title ?? 'O nas',
      description: data?.description ?? '',
      url: 'https://azymutlab.com/o-nas',
    },
  }
}

export default async function About() {
  const {data} = await sanityFetch({query: aboutPageQuery})

  const {
    title = '',
    description = '',
    team = [],
    ctaTitle = '',
    ctaDescription = '',
    ctaHref = '',
    ctaButtonText = '',
  } = data ?? {}

  return (
    <main className="space-y-8 md:space-y-12">
      {title ? <Header title={title} description={description} /> : null}

      {team?.map((member, index) => {
        return (
          <div key={member._key} className="space-y-8 md:space-y-12">
            <TeamMemberSection
              name={member.name}
              role={member.role}
              bio={member.bio}
              quote={member.quote}
              specializations={member.specializations}
              email={member.email}
              phone={member.phone}
              instagram={member.instagram}
              imageUrl={
                parseSanityImage(member.image as SanityImage)
                  .urlBuilder?.height(1400)
                  .url() ?? null
              }
              blurDataURL={parseSanityImage(member.image as SanityImage).blurDataURL}
              index={index}
              isReversed={index % 2 === 1}
            />

            {index < team.length - 1 ? (
              <hr className="border-gray-200 full-container-width" />
            ) : null}
          </div>
        )
      })}

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
