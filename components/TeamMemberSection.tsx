import Image from 'next/image'
import Link from 'next/link'

export interface ITeamMemberSection {
  name?: string | null
  role?: string | null
  bio?: string | null
  quote?: string | null
  specializations?: string[] | null
  email?: string | null
  phone?: string | null
  instagram?: string | null
  imageUrl?: string | null
  blurDataURL?: string | null
  imageAlt?: string | null
  index: number
  isReversed?: boolean
}

interface IContactItem {
  label: string
  href: string
  value: string
  isExternal?: boolean
}

const instagramHandle = (url: string) => {
  const handle = url.replace(/\/+$/, '').split('/').pop()
  return handle ? `@${handle}` : url
}

export default function TeamMemberSection({
  name,
  role,
  bio,
  quote,
  specializations,
  email,
  phone,
  instagram,
  imageUrl,
  blurDataURL,
  imageAlt,
  index,
  isReversed = false,
}: ITeamMemberSection) {
  const contactItems: IContactItem[] = []

  if (email) {
    contactItems.push({label: 'E-mail', href: `mailto:${email}`, value: email})
  }

  if (phone) {
    contactItems.push({label: 'Telefon', href: `tel:${phone.replace(/\s/g, '')}`, value: phone})
  }

  if (instagram) {
    contactItems.push({
      label: 'Instagram',
      href: instagram,
      value: instagramHandle(instagram),
      isExternal: true,
    })
  }

  return (
    <section className="flex flex-col md:flex-row justify-between gap-8 md:gap-12 min-h-[75vh]">
      <div className={`w-full md:w-1/2 space-y-6 ${isReversed ? 'md:order-2' : ''}`}>
        <div className="space-y-2">
          {role ? (
            <p className="text-sm tracking-widest uppercase font-sans text-gray-400">{role}</p>
          ) : null}

          <h2 className="text-2xl md:text-4xl tracking-tight">{name}</h2>
        </div>

        {bio ? (
          <p className="text-md md:text-lg text-gray-600 leading-relaxed whitespace-pre-wrap">
            {bio}
          </p>
        ) : null}

        {quote ? (
          <p className="font-serif italic text-lg md:text-xl border-l-2 border-studio-300 pl-4 py-1">
            {quote}
          </p>
        ) : null}

        {specializations && specializations.length > 0 ? (
          <div className="space-y-3">
            <p className="text-sm tracking-widest uppercase font-sans text-gray-400">
              Specjalizacje
            </p>

            <ul className="flex flex-col gap-2 ml-0">
              {specializations.map((item, i) => (
                <li key={i} className="text-md text-gray-600 pl-6 relative">
                  <span className="absolute left-0 top-0 text-gray-400">—</span>

                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {contactItems.length > 0 ? (
          <div className="flex flex-wrap gap-x-10 gap-y-4 pt-2">
            {contactItems.map((item) => (
              <div key={item.label} className="flex flex-col gap-2">
                <span className="text-sm tracking-widest uppercase font-sans text-gray-400">
                  {item.label}
                </span>

                <Link
                  href={item.href}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  className="text-sm font-sans text-gray-600 hover:text-black transition-colors border-b border-gray-200 pb-0.5"
                >
                  {item.value}
                </Link>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div
        className={`relative h-[50vh] md:h-auto w-full md:w-1/2 ${isReversed ? 'md:order-1' : ''} ${
          imageUrl ? '' : index % 2 === 0 ? 'bg-studio-400' : 'bg-studio-600'
        }`}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt || `${name} – zespół Azymut Lab`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index === 0}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            placeholder={blurDataURL ? 'blur' : undefined}
            blurDataURL={blurDataURL || undefined}
          />
        ) : null}
      </div>
    </section>
  )
}
