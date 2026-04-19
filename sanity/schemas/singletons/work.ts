import {UsersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

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
      description: 'Tekst wyświetlany pod headerem.',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introTitle',
      title: 'Tytuł',
      description: 'Tytuł tekstu wyświetlanego w sekcji głównej podstrony.',
      type: 'text',
      rows: 1,
    }),
    defineField({
      name: 'introDescription',
      title: 'Opis',
      description: 'Opis tekstu wyświetlanego w sekcji głównej podstrony.',
      type: 'text',
      rows: 4,
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
        title: 'Praca',
      }
    },
  },
})
