'use client'

import {parseSanityImage} from '@/sanity/lib/utils'
import {SanityImage} from '@/types/image'
import {TVariants} from '@/types/offer'
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
        const image = parseSanityImage(item.image as SanityImage)

        return <OfferSliderCard key={item._key} {...item} index={index} image={image} />
      })}
    </Carousel>
  )
}
