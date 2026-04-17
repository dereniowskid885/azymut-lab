import {UsersIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'work',
  title: 'Praca',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      description: 'Główny tytuł podstrony Praca.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      description:
        'Used both for the <meta> description tag for SEO, and the personal website subheader.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Wprowadzenie',
      description: 'Krótki tekst o kulturze pracy i wartościach studia Azymut Lab.',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'perks',
      title: 'Co oferujemy',
      description: 'Lista benefitów i wartości, które oferuje studio pracownikom.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Ikona (emoji)',
              type: 'string',
            }),
            defineField({
              name: 'title',
              title: 'Tytuł benefitu',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Opis',
              type: 'text',
              rows: 2,
            }),
          ],
          preview: {
            select: {
              title: 'title',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'openPositions',
      title: 'Otwarte rekrutacje',
      description: 'Aktualne oferty pracy w studiu.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'position',
              title: 'Stanowisko',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'type',
              title: 'Forma zatrudnienia',
              type: 'string',
              options: {
                list: [
                  {title: 'Umowa o pracę', value: 'uop'},
                  {title: 'B2B', value: 'b2b'},
                  {title: 'Umowa zlecenie', value: 'zlecenie'},
                  {title: 'Staż', value: 'staz'},
                ],
                layout: 'radio',
              },
            }),
            defineField({
              name: 'experience',
              title: 'Poziom doświadczenia',
              type: 'string',
              options: {
                list: [
                  {title: 'Junior', value: 'junior'},
                  {title: 'Mid', value: 'mid'},
                  {title: 'Senior', value: 'senior'},
                ],
                layout: 'radio',
              },
            }),
            defineField({
              name: 'description',
              title: 'Opis stanowiska',
              type: 'text',
              rows: 4,
            }),
            defineField({
              name: 'requirements',
              title: 'Wymagania',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
            }),
            defineField({
              name: 'isActive',
              title: 'Aktywna oferta',
              description: 'Odznacz, aby ukryć ofertę bez jej usuwania.',
              type: 'boolean',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: 'position',
              subtitle: 'type',
            },
            prepare({title, subtitle}) {
              const labels: Record<string, string> = {
                uop: 'Umowa o pracę',
                b2b: 'B2B',
                zlecenie: 'Umowa zlecenie',
                staz: 'Staż',
              }
              return {
                title,
                subtitle: labels[subtitle] ?? subtitle,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'spontaneousApplication',
      title: 'Zgłoszenie spontaniczne',
      description: 'Tekst zachęcający do wysłania CV nawet bez aktywnej rekrutacji.',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Tytuł',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Opis',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'email',
          title: 'E-mail do wysłania CV',
          type: 'string',
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
        subtitle: 'Praca',
        title,
      }
    },
  },
})
