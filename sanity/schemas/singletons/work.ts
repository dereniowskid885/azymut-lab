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
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introTitle',
      title: 'Tytuł',
      description: 'Krótki tekst o kulturze pracy i wartościach studia Azymut Lab.',
      type: 'text',
      rows: 1,
    }),
    defineField({
      name: 'introDescription',
      title: 'Opis',
      description: 'Krótki tekst o kulturze pracy i wartościach studia Azymut Lab.',
      type: 'text',
      rows: 4,
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
    defineField({
      name: 'ctaHref',
      title: 'Link CTA',
      description: 'Nazwa linku podstrony np. /offer lub /contact',
      type: 'string',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'Tekst przycisku CTA',
      description: 'Tekst na przycisku',
      type: 'string',
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
