'use client'

import {HomePageQueryResult} from '@/sanity.types'
import {urlForImage} from '@/sanity/lib/utils'
import {ChevronLeftIcon, ChevronRightIcon} from '@sanity/icons'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import {useCallback} from 'react'
import type {Image as SanityImage} from 'sanity'
import ImageSliderCard from './ImageSliderCard'

interface IImageSlider {
  data: NonNullable<HomePageQueryResult>['imagesCarousel']
}

export default function ImageSlider({data}: IImageSlider) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  if (!data?.length) return null

  return (
    <div className="relative flex flex-grow">
      <div className="overflow-hidden full-container-width p-0" ref={emblaRef}>
        <div className="flex h-full">
          {data.map((item, index) => {
            const imageUrl = item.image
              ? urlForImage(item.image as SanityImage)
                  ?.width(800)
                  ?.height(600)
                  ?.url()
              : null

            const card = (
              <ImageSliderCard
                imageUrl={imageUrl}
                title={item.title}
                description={item.description}
                hoverText={item.hoverText}
                index={index}
              />
            )

            return (
              <div key={item._key}>
                {item.link ? (
                  <Link href={item.link} target="_blank" rel="noopener noreferrer">
                    {card}
                  </Link>
                ) : (
                  card
                )}
              </div>
            )
          })}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full w-10 h-10 md:flex items-center justify-center transition duration-700 hidden"
        aria-label="Previous"
      >
        <ChevronLeftIcon fontSize={28} />
      </button>

      <button
        onClick={scrollNext}
        className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full w-10 h-10 md:flex items-center justify-center transition duration-700 hidden"
        aria-label="Next"
      >
        <ChevronRightIcon fontSize={28} />
      </button>
    </div>
  )
}
