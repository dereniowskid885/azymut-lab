import './globals.css'
import {IBM_Plex_Mono, PT_Serif, Questrial} from 'next/font/google'

const serif = PT_Serif({
  variable: '--font-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '700'],
})

const sans = Questrial({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400'],
})

const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['500', '700'],
})

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'InteriorDesigner',
  'name': 'Azymut Lab',
  'description': 'Studio architektoniczne. Wykończenia wnętrz pod klucz w Krakowie.',
  'url': 'https://azymutlab.com',
  'telephone': '+48 500724192',
  'email': 'hello@azymutlab.com',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'ul. Sebastiana Klonowica 6',
    'addressLocality': 'Kraków',
    'postalCode': '30-654',
    'addressCountry': 'PL',
  },
  'areaServed': {
    '@type': 'City',
    'name': 'Kraków',
  },
  'sameAs': [
    // 'https://www.instagram.com/azymutlab',
  ],
}

export default async function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pl" className={`${mono.variable} ${sans.variable} ${serif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
