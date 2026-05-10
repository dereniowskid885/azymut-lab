'use client'

import {HomePageQueryResult} from '@/sanity.types'
import {parseSanityImage} from '@/sanity/lib/utils'
import {SanityImage} from '@/types/image'
import Link from 'next/link'
import Carousel from './Carousel'
import ImageSliderCard from './ImageSliderCard'

interface IImageSlider {
  data: NonNullable<HomePageQueryResult>['imagesCarousel']
}

export default function ImageSlider({data}: IImageSlider) {
  if (!data?.length) return null

  return (
    <Carousel amountOfSlides={data.length}>
      {data.map((item, index) => {
        const image = parseSanityImage(item.image as SanityImage)

        const card = (
          <ImageSliderCard
            title={item.title}
            description={item.description}
            hoverText={item.hoverText}
            index={index}
            image={image}
            imageAlt={item.imageAlt}
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
    </Carousel>
  )
}
