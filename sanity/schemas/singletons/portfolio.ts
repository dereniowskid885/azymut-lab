import {ImagesIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      description: 'Główny tytuł podstrony Portfolio.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      description:
        'Used both for the <meta> description tag for SEO, and the personal website subheader.',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'projects',
      title: 'Projekty',
      description: 'Lista realizacji studia Azymut Lab.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'images',
              title: 'Zdjęcia',
              description: 'Galeria zdjęć realizacji.',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'image',
                  options: {hotspot: true},
                }),
              ],
            }),
            defineField({
              name: 'title',
              title: 'Tytuł projektu',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'category',
              title: 'Kategoria',
              description: 'Np. Mieszkanie, Dom, Biuro, Apartament.',
              type: 'string',
            }),
            defineField({
              name: 'location',
              title: 'Lokalizacja',
              description: 'Np. Warszawa, Kraków.',
              type: 'string',
            }),
            defineField({
              name: 'area',
              title: 'Powierzchnia (m²)',
              type: 'number',
            }),
            defineField({
              name: 'year',
              title: 'Rok realizacji',
              type: 'number',
            }),
            defineField({
              name: 'description',
              title: 'Opis projektu',
              type: 'text',
              rows: 4,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'category',
              media: 'images.0',
            },
            prepare({title, subtitle, media}) {
              return {
                title,
                subtitle: subtitle ?? 'Bez kategorii',
                media,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        subtitle: 'Portfolio',
        title,
      }
    },
  },
})
