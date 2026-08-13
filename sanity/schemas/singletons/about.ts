import {InfoOutlineIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'O nas',
  type: 'document',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      description: 'Główny tytuł podstrony O nas.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      description: 'Tekst wyświetlany pod headerem.',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'team',
      title: 'Zespół',
      description:
        'Osoby prezentowane na podstronie. Sekcje wyświetlają się naprzemiennie – pierwsza osoba ma zdjęcie po prawej, druga po lewej.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'teamMember',
          title: 'Osoba',
          fields: [
            defineField({
              name: 'image',
              title: 'Zdjęcie',
              description: 'Zdjęcie portretowe. Najlepiej w orientacji pionowej.',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'imageAlt',
              title: 'Opis zdjęcia (alt)',
              type: 'string',
            }),
            defineField({
              name: 'name',
              title: 'Imię i nazwisko',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Stanowisko',
              description: 'Np. „Architekt wnętrz · Współzałożycielka”.',
              type: 'string',
            }),
            defineField({
              name: 'bio',
              title: 'Opis',
              description: 'Kilka zdań o osobie.',
              type: 'text',
              rows: 5,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'quote',
              title: 'Motto',
              description: 'Krótki cytat wyróżniony kursywą. Opcjonalnie.',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'specializations',
              title: 'Specjalizacje',
              description: 'Lista wyświetlana z myślnikami. Opcjonalnie.',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
            }),
            defineField({
              name: 'email',
              title: 'Adres e-mail',
              type: 'string',
              validation: (rule) => rule.email(),
            }),
            defineField({
              name: 'phone',
              title: 'Numer telefonu',
              type: 'string',
            }),
            defineField({
              name: 'instagram',
              title: 'Instagram',
              description: 'Pełny adres profilu, np. https://www.instagram.com/azymutlab.',
              type: 'url',
            }),
          ],
          preview: {
            select: {title: 'name', subtitle: 'role', media: 'image'},
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
        title: 'O nas',
      }
    },
  },
})
