import {defineQuery} from 'next-sanity'

export const homePageQuery = defineQuery(`
  *[_type == "home"][0]{
    _id,
    _type,
    imagesCarousel[]{
      _key,
      _id,
      _type,
      image,
      title,
      description,
      link,
      hoverText
    },
    title,
    description
  }
`)

export const settingsQuery = defineQuery(`
  *[_type == "settings"][0]{
    _id,
    _type,
    footer,
    logoImage,
  }
`)

export const offerPageQuery = defineQuery(`
  *[_type == "offer"][0]{
    _id,
    _type,
    title,
    description,
    services[]{
      _key,
      title,
      description,
      note,
      variants[]{
        _key,
        badge,
        name,
        isRecommended,
        items,
        note
      }
    },
    ctaTitle,
    ctaDescription,
    ctaHref,
    ctaButtonText
  }
`)

// export const portfolioPageQuery = defineQuery(`
//   *[_type == "portfolio"][0]{
//     _id,
//     _type,
//     title,
//     description,
//     projects[]{
//       _key,
//       title,
//       category,
//       location,
//       area,
//       year,
//       description,
//       images[]{
//         _key,
//         asset->{
//           _id,
//           url,
//           metadata{
//             dimensions
//           }
//         },
//         hotspot,
//         crop
//       }
//     }
//   }
// `)

export const contactPageQuery = defineQuery(`
  *[_type == "contact"][0]{
    _id,
    _type,
    title,
    description,
    image,
    email,
    phone,
    address{
      street,
      city,
      postalCode
    },
    socialLinks{
      instagram,
      facebook,
      linkedin,
      pinterest
    },
    formTitle,
    formDescription,
    ctaHref,
    ctaButtonText
  }
`)

export const workPageQuery = defineQuery(`
  *[_type == "work"][0]{
    _id,
    _type,
    title,
    description,
    introTitle,
    introDescription,
    ctaTitle,
    ctaDescription,
    ctaHref,
    ctaButtonText
  }
`)

export const slugsByTypeQuery = defineQuery(`
  *[_type == $type && defined(slug.current)]{"slug": slug.current}
`)
