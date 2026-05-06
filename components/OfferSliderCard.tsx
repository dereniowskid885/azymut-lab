import Image from 'next/image'
import {useEffect, useRef, useState} from 'react'

export interface IOfferSliderCard {
  badge: string | null
  name: string | null
  isRecommended: boolean | null
  items: string[] | null
  note: string | null
  index: number
  imageUrl?: string | null
  imageAlt?: string | null
}

export default function OfferSliderCard({
  badge,
  name,
  isRecommended,
  items,
  note,
  index,
  imageUrl,
  imageAlt,
}: IOfferSliderCard) {
  const cardRef = useRef(null)

  const [isCardVisibleMobile, setCardVisibleMobile] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setCardVisibleMobile(entry.isIntersecting),
      {
        threshold: 0.8,
      },
    )

    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`relative w-[75vw] md:basis-1/3 md:flex-shrink-0 min-h-[240px] md:min-h-[360px] overflow-hidden flex-shrink-0 transition duration-700 group h-full md:opacity-100 md:hover:opacity-90 z-10 ${
        imageUrl
          ? ''
          : isRecommended
            ? 'bg-[#1a1a18]'
            : index % 2 === 0
              ? 'bg-studio-400'
              : 'bg-studio-600'
      }`}
    >
      {imageUrl ? (
        <>
          <Image
            src={imageUrl}
            alt={imageAlt || 'Offer Carousel Image'}
            fill
            className="object-cover -z-50"
            sizes="(max-width: 768px) 75vw, (max-width: 1024px) 60vw, 30vw"
            priority={index < 2}
            fetchPriority={index < 4 ? 'high' : 'auto'}
          />

          <div className="absolute inset-0 bg-black/40" />
        </>
      ) : null}

      <div className="h-full flex flex-col py-4 gap-6 p-[24px] md:px-[48px] xl:px-[80px] max-w-2xl mx-auto">
        <div className="space-y-1 z-50">
          {badge ? (
            <p
              className={`text-sm font-semibold tracking-widest uppercase ${!imageUrl && isRecommended ? 'text-studio-600' : index % 2 === 0 ? 'text-white/60' : 'text-white/80'}`}
            >
              {badge}
            </p>
          ) : null}

          {name ? (
            <h3 className="text-white text-2xl font-bold font-sans leading-tight">{name}</h3>
          ) : null}
        </div>

        {items && items.length > 0 ? (
          <ul className="flex flex-col gap-2 flex-1">
            {items.map((item, i) => (
              <li
                key={i}
                className={`text-md pl-6 relative ${!imageUrl && isRecommended ? 'text-white/60' : 'text-white'}`}
              >
                <span className="absolute left-0 top-0">—</span>

                {item}
              </li>
            ))}
          </ul>
        ) : null}

        {note ? (
          <div
            className={`flex flex-col gap-2 transition duration-700 opacity-0 md:group-hover:opacity-100 z-50 ${isCardVisibleMobile ? 'opacity-100 md:opacity-0' : ''}`}
          >
            <p
              className={`text-md md:text-lg leading-tight ${!imageUrl && isRecommended ? 'text-white/60' : 'text-white'}`}
            >
              {note}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
