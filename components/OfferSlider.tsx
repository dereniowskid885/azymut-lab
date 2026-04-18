'use client'

import {TVariants} from '@/types/offer'
import Carousel from './Carousel'
import OfferSliderCard from './OfferSliderCard'

interface IOfferSlider {
  data: TVariants | null
}

export default function OfferSlider({data = []}: IOfferSlider) {
  if (!data?.length) return null

  return (
    <Carousel loop={false}>
      {data.map((item, index) => {
        return <OfferSliderCard key={item._key} {...item} index={index} />
      })}
    </Carousel>
  )
}
