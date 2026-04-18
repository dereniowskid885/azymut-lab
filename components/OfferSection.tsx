import {TVariants} from '@/types/offer'
import OfferSlider from './OfferSlider'

export interface IOfferSection {
  className?: string
  title: string | null
  description: string | null
  note: string | null
  variants: TVariants | null
}

export default async function OfferSection({
  className = '',
  title,
  description,
  note,
  variants = [],
}: IOfferSection) {
  return (
    <section className={`space-y-8 md:space-y-12 ${className}`}>
      <div className="space-y-2 md:w-5/6">
        <p className="text-2xl md:text-4xl">{title}</p>

        {description && <p className="text-md md:text-lg text-gray-500">{description}</p>}

        {note && (
          <p className="text-md md:text-lg bg-warning-bg border-l-2 border-warning-border text-warning-text px-4 py-3 w-fit">
            {note}
          </p>
        )}
      </div>

      <OfferSlider data={variants} />
    </section>
  )
}
