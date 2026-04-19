import {CogIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Stopka i logo',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'footer',
      title: 'Tekst stopki',
      description: 'Tekst wyświetlany w stopce.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'Url',
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'logoImage',
      title: 'Logo',
      type: 'image',
      description: 'Logo wyświetlane w headerze.',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Ustawienia',
      }
    },
  },
})
