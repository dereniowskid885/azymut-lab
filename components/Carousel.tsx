import {ChevronLeftIcon, ChevronRightIcon} from '@sanity/icons'
import useEmblaCarousel from 'embla-carousel-react'
import {ReactNode, useCallback} from 'react'

export interface ICarousel {
  children: ReactNode
  loop?: boolean
  amountOfSlides?: number
}

export default function Carousel({children, loop = true, amountOfSlides}: ICarousel) {
  const shouldDisable = amountOfSlides ? amountOfSlides <= 3 : false

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: loop,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': {active: shouldDisable ? false : true},
    },
  })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <div className="relative flex flex-grow">
      <div className="overflow-hidden full-container-width p-0" ref={emblaRef}>
        <div className="flex h-full">{children}</div>
      </div>

      {amountOfSlides && amountOfSlides > 3 ? (
        <>
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
        </>
      ) : null}
    </div>
  )
}
