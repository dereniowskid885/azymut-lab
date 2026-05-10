import {ISanityImageObject} from '@/types/image'
import Image from 'next/image'
import {useEffect, useState} from 'react'

export interface IImageSliderCard {
  title: string | null
  description: string | null
  hoverText: string | null
  index: number
  image: ISanityImageObject
  imageAlt?: string | null
}

export default function ImageSliderCard({
  title,
  description,
  hoverText,
  index,
  image,
  imageAlt,
}: IImageSliderCard) {
  const [tapped, setTapped] = useState(false)

  const handleTouchEnd = (e: any) => {
    const touch = e.changedTouches[0]
    const deltaX = Math.abs(touch.clientX - (e.currentTarget as any)._touchStartX)
    const deltaY = Math.abs(touch.clientY - (e.currentTarget as any)._touchStartY)

    if (deltaX > 10 || deltaY > 10) return

    setTapped((prev) => !prev)
  }

  const handleTouchStart = (e: any) => {
    const el = e.currentTarget as any
    el._touchStartX = e.touches[0].clientX
    el._touchStartY = e.touches[0].clientY
  }

  useEffect(() => {
    if (!tapped) return

    const tappedTimeout = setTimeout(() => {
      setTapped(false)
    }, 5000)

    return () => clearTimeout(tappedTimeout)
  }, [tapped])

  const imageUrl = image.urlBuilder?.height(1400).url()

  return (
    <div
      className={`relative w-[75vw] md:w-[60vw] lg:w-[30vw] min-h-[320px] md:min-h-[360px] overflow-hidden flex-shrink-0 group h-full`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={`w-full h-full p-4 relative transition duration-700 supports-hover:opacity-100 supports-hover:group-hover:opacity-20 ${imageUrl ? '' : index % 2 === 0 ? 'bg-studio-400' : 'bg-studio-600'} ${tapped ? 'opacity-20' : 'opacity-100'}`}
      >
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={imageAlt || 'Zdjęcie realizacji wnętrza'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 75vw, (max-width: 1024px) 60vw, 30vw"
              priority={index < 2}
              fetchPriority={index < 4 ? 'high' : 'auto'}
              placeholder={image.blurDataURL ? 'blur' : undefined}
              blurDataURL={image.blurDataURL || undefined}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
          </>
        ) : null}

        <div className="absolute top-4 left-4 right-4 space-y-1">
          <h3 className="font-sans text-white text-2xl font-bold leading-tight">{title}</h3>

          {description && <p className="text-white/80 text-md">{description}</p>}
        </div>
      </div>

      <p
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 text-black -translate-y-1/2 text-lg md:text-xl leading-tight transition duration-700 text-center pointer-events-none w-3/4 px-4 pt-8 supports-hover:opacity-0 supports-hover:group-hover:opacity-100 ${tapped ? 'opacity-100' : 'opacity-0'}`}
      >
        {hoverText}
      </p>
    </div>
  )
}
