import {defineQuery} from 'next-sanity'

export const homePageQuery = defineQuery(`
  *[_type == "home"][0]{
    _id,
    _type,
    imagesCarousel[]{
      _key,
      _id,
      _type,
      image{
        ...,
        asset->{
          ...,
          metadata{
            lqip
          }
        }
      },
      imageAlt,
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
    logoImage{
      ...,
      asset->{
        ...,
        metadata{
          lqip
        }
      }
    },
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
        image{
          ...,
          asset->{
            ...,
            metadata{
              lqip
            }
          }
        },
        imageAlt,
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
    image{
      ...,
      asset->{
        ...,
        metadata{
          lqip
        }
      }
    },
    imageAlt,
    email,
    contactFormEmail,
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
    image{
      ...,
      asset->{
        ...,
        metadata{
          lqip
        }
      }
    },
    imageAlt,
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
