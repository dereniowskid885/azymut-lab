import type {Image, ImageUrlBuilder, Reference} from 'sanity'

interface SanityAsset extends Reference {
  metadata: {
    lqip: string | null
  } | null
}

export type SanityImage = Omit<Image, 'asset'> & {
  asset?: SanityAsset | null
}

export interface ISanityImageObject {
  urlBuilder?: ImageUrlBuilder
  blurDataURL?: string | null | undefined
}
