import ContactForm from '@/components/ContactForm'
import {Header} from '@/components/Header'
import SectionFullWidth from '@/components/SectionFullWidth'
import {sanityFetch} from '@/sanity/lib/live'
import {contactPageQuery} from '@/sanity/lib/queries'
import {urlForImage} from '@/sanity/lib/utils'
import type {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type {Image as SanityImage} from 'sanity'

export async function generateMetadata(): Promise<Metadata> {
  const {data} = await sanityFetch({query: contactPageQuery, stega: false})

  return {
    title: data?.title ?? 'Kontakt',
    description: data?.description ?? '',
    openGraph: {
      title: data?.title ?? 'Kontakt',
      description: data?.description ?? '',
      url: 'https://azymutlab.com/kontakt',
    },
  }
}

export default async function Contact() {
  const {data} = await sanityFetch({query: contactPageQuery})

  const {
    description = '',
    title = '',
    formDescription = '',
    formTitle = '',
    image,
    email = '',
    phone = '',
    address,
    socialLinks,
    ctaHref = '',
    ctaButtonText = '',
  } = data ?? {}

  const imageUrl = image
    ? urlForImage(image as SanityImage)
        ?.height(600)
        .url()
    : null

  return (
    <div className="space-y-8 md:space-y-12">
      {title ? <Header title={title} description={description} /> : null}

      <div className="flex flex-col md:flex-row justify-between gap-12">
        <div className="w-full md:w-1/2">
          <ContactForm title={formTitle} description={formDescription} />
        </div>

        <div className="relative h-[50vh] md:h-auto w-full md:w-1/2">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={'Contact Image'}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 75vw, 30vw"
              fetchPriority="high"
            />
          ) : null}
        </div>
      </div>

      <SectionFullWidth buttonHref={ctaHref} buttonText={ctaButtonText}>
        <div className="grid grid-cols-2 w-full sm:w-[50vw] md:w-[75vw] gap-6 md:flex-row md:gap-12 md:grid-rows-1 md:grid-cols-4">
          {email ? (
            <div className="flex flex-col gap-2">
              <span className="text-sm tracking-widest uppercase font-sans text-white/50">
                E-mail
              </span>

              <Link
                href={`mailto:${email}`}
                className="text-sm font-sans text-white/70 hover:text-white transition-colors border-b border-white/10 pb-0.5"
              >
                {email}
              </Link>
            </div>
          ) : null}

          {phone ? (
            <div className="flex flex-col gap-2">
              <span className="text-sm tracking-widest uppercase font-sans text-white/50">
                Telefon
              </span>

              <Link
                href={`tel:${phone}`}
                className="text-sm font-sans text-white/70 hover:text-white transition-colors border-b border-white/10 pb-0.5"
              >
                {phone}
              </Link>
            </div>
          ) : null}

          {socialLinks?.instagram ? (
            <div className="flex flex-col gap-2">
              <span className="text-sm tracking-widest uppercase font-sans text-white/50">
                Instagram
              </span>

              <Link
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-sans text-white/70 hover:text-white transition-colors border-b border-white/10 pb-0.5"
              >
                @azymutlab
              </Link>
            </div>
          ) : null}

          {address?.street && address.postalCode && address.city ? (
            <div className="flex flex-col gap-2">
              <span className="text-sm tracking-widest uppercase font-sans text-white/50">
                Adres
              </span>

              <p className="text-sm font-sans text-white/70 leading-relaxed">
                {address?.street}
                <br />
                {address?.postalCode ?? ''} {address?.city ?? ''}
              </p>
            </div>
          ) : null}
        </div>
      </SectionFullWidth>
    </div>
  )
}
