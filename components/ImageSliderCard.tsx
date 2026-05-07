import Image from 'next/image'

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
  return (
    <div
      className={`relative w-[75vw] md:w-[60vw] lg:w-[30vw] min-h-[320px] md:min-h-[360px] overflow-hidden flex-shrink-0  group h-full`}
    >
      <div
        className={`w-full h-full p-4 relative opacity-100 hover:opacity-20 transition duration-700 ${imageUrl ? '' : index % 2 === 0 ? 'bg-studio-400' : 'bg-studio-600'}`}
      >
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={title || 'Carousel Image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 75vw, (max-width: 1024px) 60vw, 30vw"
              priority={index < 2}
              fetchPriority={index < 4 ? 'high' : 'auto'}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
          </>
        ) : null}

        <div className="absolute top-4 left-4 right-4 space-y-1">
          <h3 className="font-sans text-white text-2xl font-bold leading-tight">{title}</h3>

          {description && <p className="text-white/80 text-md">{description}</p>}
        </div>
      </div>

      <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 text-black -translate-y-1/2 text-lg md:text-xl leading-tight opacity-0 group-hover:opacity-100 transition duration-700 text-center pointer-events-none w-3/4 px-4 pt-8">
        {hoverText}
      </p>
    </div>
  )
}
