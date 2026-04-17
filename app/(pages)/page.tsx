import {Header} from '@/components/Header'
import ImageSlider from '@/components/ImageSlider'
import {studioUrl} from '@/sanity/lib/api'
import {sanityFetch} from '@/sanity/lib/live'
import {homePageQuery} from '@/sanity/lib/queries'
import Link from 'next/link'

export default async function IndexRoute() {
  const {data} = await sanityFetch({query: homePageQuery})

  if (!data) {
    return (
      <div className="text-center">
        You don&rsquo;t have a homepage yet,{' '}
        <Link href={`${studioUrl}/structure/home`} className="underline">
          create one now
        </Link>
        !
      </div>
    )
  }

  const {description = '', title = '', imagesCarousel = []} = data ?? {}

  return (
    <div className="space-y-6 md:space-y-12 flex-grow flex flex-col">
      {title ? <Header title={title} description={description} /> : null}

      <ImageSlider data={imagesCarousel} />

      <hr className="border-gray-200 full-container-width" />
    </div>
  )
}
