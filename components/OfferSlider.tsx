'use client'

import {urlForImage} from '@/sanity/lib/utils'
import {TVariants} from '@/types/offer'
import type {Image as SanityImage} from 'sanity'
import Carousel from './Carousel'
import OfferSliderCard from './OfferSliderCard'

interface IOfferSlider {
  data: TVariants | null
}

export default function OfferSlider({data = []}: IOfferSlider) {
  if (!data?.length) return null

  return (
    <Carousel loop={false} amountOfSlides={data.length}>
      {data.map((item, index) => {
        const imageUrl = item.image
          ? urlForImage(item.image as SanityImage)
              ?.height(1400)
              .url()
          : null

        return (
          <OfferSliderCard
            key={item._key}
            {...item}
            index={index}
            imageUrl={imageUrl}
            imageAlt={item.imageAlt}
          />
        )
      })}
    </Carousel>
  )
}
