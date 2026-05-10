import {EnvelopeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Kontakt',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      description: 'Główny tytuł podstrony Kontakt.',
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
      name: 'image',
      title: 'Obraz',
      description: 'Obraz wyświetlany obok formularza kontaktowego.',
      type: 'image',
    }),
    defineField({
      name: 'imageAlt',
      title: 'Opis zdjęcia (alt)',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Adres e-mail',
      type: 'string',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Numer telefonu',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Adres studia',
      type: 'object',
      fields: [
        defineField({
          name: 'street',
          title: 'Ulica i numer',
          type: 'string',
        }),
        defineField({
          name: 'city',
          title: 'Miasto',
          type: 'string',
        }),
        defineField({
          name: 'postalCode',
          title: 'Kod pocztowy',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Media społecznościowe',
      type: 'object',
      fields: [
        defineField({
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        }),
        defineField({
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
        }),
        defineField({
          name: 'pinterest',
          title: 'Pinterest URL',
          type: 'url',
        }),
      ],
    }),
    defineField({
      name: 'formTitle',
      title: 'Tytuł formularza',
      description: 'Nagłówek nad formularzem kontaktowym, np. "Napisz do nas".',
      type: 'string',
    }),
    defineField({
      name: 'formDescription',
      title: 'Opis formularza',
      description: 'Krótki tekst zachęcający do wypełnienia formularza.',
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
        title: 'Kontakt',
      }
    },
  },
})
