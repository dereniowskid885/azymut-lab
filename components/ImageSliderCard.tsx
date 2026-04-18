import Image from 'next/image'
import {useEffect, useRef, useState} from 'react'

export interface IImageSliderCard {
  imageUrl?: string | null
  title: string | null
  description: string | null
  hoverText: string | null
  index: number
}

export default function ImageSliderCard({
  imageUrl,
  title,
  description,
  hoverText,
  index,
}: IImageSliderCard) {
  const cardRef = useRef(null)

  const [isCardVisibleMobile, setCardVisibleMobile] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setCardVisibleMobile(entry.isIntersecting),
      {
        threshold: 1,
      },
    )

    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className="relative w-[75vw] md:w-[30vw] min-h-[240px] md:min-h-[360px] overflow-hidden flex-shrink-0 opacity-90 hover:opacity-100 transition duration-700 group h-full"
    >
      <div
        className={`w-full h-full p-4 ${imageUrl ? '' : index % 2 === 0 ? 'bg-studio-400' : 'bg-studio-600'}`}
      >
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={title || 'Carousel Image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 75vw, 30vw"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
          </>
        ) : null}

        <div className="absolute top-4 left-4 right-4 space-y-1">
          <h3 className="font-sans text-white text-2xl font-bold leading-tight">{title}</h3>

          {description && <p className="text-white/80 text-md">{description}</p>}
        </div>

        <p
          className={`absolute bottom-4 left-4 right-4 text-white text-xl leading-tight opacity-0 md:group-hover:opacity-100 transition duration-700 ${isCardVisibleMobile ? 'opacity-100 md:opacity-0' : ''}`}
        >
          {hoverText}
        </p>
      </div>
    </div>
  )
}
