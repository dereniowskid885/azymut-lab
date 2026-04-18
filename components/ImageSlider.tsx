'use client'

import {HomePageQueryResult} from '@/sanity.types'
import {urlForImage} from '@/sanity/lib/utils'
import Link from 'next/link'
import type {Image as SanityImage} from 'sanity'
import Carousel from './Carousel'
import ImageSliderCard from './ImageSliderCard'

interface IImageSlider {
  data: NonNullable<HomePageQueryResult>['imagesCarousel']
}

export default function ImageSlider({data}: IImageSlider) {
  if (!data?.length) return null

  return (
    <Carousel>
      {data.map((item, index) => {
        const imageUrl = item.image
          ? urlForImage(item.image as SanityImage)
              ?.height(600)
              .url()
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
    </Carousel>
  )
}
