import {dataset, projectId} from '@/sanity/lib/api'
import {ISanityImageObject, SanityImage} from '@/types/image'
import {createImageUrlBuilder} from '@sanity/image-url'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const parseSanityImage = (source: SanityImage | null | undefined): ISanityImageObject => {
  if (!source?.asset) {
    return {}
  }

  return {
    urlBuilder: imageBuilder?.image(source).auto('format').fit('max'),
    blurDataURL: source.asset.metadata?.lqip,
  }
}

export function urlForOpenGraphImage(image: SanityImage | null | undefined) {
  return parseSanityImage(image).urlBuilder?.width(1200).height(627).fit('crop').url()
}
