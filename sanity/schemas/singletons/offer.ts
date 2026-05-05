import {ThListIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'offer',
  title: 'Oferta',
  type: 'document',
  icon: ThListIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      description: 'Główny tytuł podstrony Oferta.',
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
      name: 'services',
      title: 'Usługi',
      description: 'Lista usług oferowanych przez studio.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Nazwa usługi',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Krótki opis usługi',
              description:
                'Np. "Kompleksowa dokumentacja techniczna dopasowana do skali inwestycji."',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'note',
              title: 'Ważna informacja (opcjonalna)',
              description: 'Np. ostrzeżenie o prawach autorskich przy projekcie zewnętrznym.',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'variants',
              title: 'Warianty',
              description: 'Np. Basic, Extended, Premium.',
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
                      title: 'Tekst alternatywny dla zdjęcia',
                      type: 'string',
                    }),
                    defineField({
                      name: 'badge',
                      title: 'Etykieta',
                      description: 'Np. "Podstawowa", "Rekomendowana", "Pod klucz".',
                      type: 'string',
                    }),
                    defineField({
                      name: 'name',
                      title: 'Nazwa wariantu',
                      description: 'Np. "Basic", "Extended", "Premium".',
                      type: 'string',
                    }),
                    defineField({
                      name: 'isRecommended',
                      title: 'Wyróżniony wariant',
                      description: 'Zaznacz aby wyróżnić ten wariant ciemnym tłem.',
                      type: 'boolean',
                      initialValue: false,
                    }),
                    defineField({
                      name: 'items',
                      title: 'Zakres wariantu',
                      description: 'Lista elementów wchodzących w skład tego wariantu.',
                      type: 'array',
                      of: [defineArrayMember({type: 'string'})],
                    }),
                    defineField({
                      name: 'note',
                      title: 'Ważna informacja (opcjonalna)',
                      description: 'Np. "Nie obejmuje: zabudów stałych, karniszy".',
                      type: 'string',
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'name',
                      subtitle: 'badge',
                    },
                    prepare({title, subtitle}) {
                      return {
                        title,
                        subtitle,
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
              subtitle: 'description',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'ctaTitle',
      title: 'Tytuł CTA',
      description: 'Nagłówek sekcji z czarnym tłem.',
      type: 'string',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'Opis CTA',
      description: 'Krótki tekst pod nagłówkiem CTA.',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ctaHref',
      title: 'Link CTA',
      description: 'Podstrona do której prowadzi kliknięcie w przycisk np. /oferta lub /kontakt.',
      type: 'string',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'Tekst przycisku CTA',
      description: 'Tekst na przycisku.',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Oferta',
      }
    },
  },
})
