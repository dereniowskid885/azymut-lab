import {HomeIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'home',
  title: 'Strona główna',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      description: 'Tytuł strony głównej wyświetlany w headerze.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      description: 'Tekst wyświetlany pod headerem.',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'imagesCarousel',
      title: 'Karuzela',
      description: 'Slider ze zdjęciami i tekstem',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Zdjęcie',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'imageAlt',
              title: 'Opis zdjęcia (alt)',
              type: 'string',
            }),
            defineField({
              name: 'title',
              title: 'Tytuł',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Opis',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'hoverText',
              title: 'Hover Text',
              description:
                'Tekst, który pojawia się po najechaniu myszką (desktop), lub jeśli jest widoczny (mobile).',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'url',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Strona główna',
      }
    },
  },
})
