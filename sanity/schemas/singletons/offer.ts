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
      description:
        'Used both for the <meta> description tag for SEO, and the personal website subheader.',
      type: 'text',
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
              name: 'icon',
              title: 'Ikona (emoji lub kod)',
              description: 'Np. 🏠 lub nazwa ikony do wyświetlenia przy usłudze.',
              type: 'string',
            }),
            defineField({
              name: 'title',
              title: 'Nazwa usługi',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Opis usługi',
              description: 'Krótki opis czym jest dana usługa i co obejmuje.',
              type: 'text',
              rows: 4,
            }),
            defineField({
              name: 'scope',
              title: 'Zakres prac',
              description:
                'Lista elementów wchodzących w skład usługi (np. projekt, nadzór, odbiór).',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
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
      name: 'process',
      title: 'Proces współpracy',
      description: 'Kroki opisujące jak wygląda współpraca z Azymut Lab od A do Z.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'step',
              title: 'Numer kroku',
              type: 'number',
              validation: (Rule) => Rule.required().integer().positive(),
            }),
            defineField({
              name: 'title',
              title: 'Nazwa etapu',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Opis etapu',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'step',
            },
            prepare({title, subtitle}) {
              return {
                title,
                subtitle: `Krok ${subtitle}`,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'ctaTitle',
      title: 'Tytuł CTA',
      description: 'Nagłówek sekcji zachęcającej do kontaktu, np. "Zacznijmy razem".',
      type: 'string',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'Opis CTA',
      description: 'Krótki tekst pod nagłówkiem CTA zachęcający do umówienia konsultacji.',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        subtitle: 'Oferta',
        title,
      }
    },
  },
})
