# Azymut Lab — Architectural Studio

A website for the Azymut Lab architectural studio. A modern business showcase with a content management system, contact form, and SEO optimization.

## Tech Stack

- **Next.js 16** — App Router, SSR, image optimization
- **Sanity.io** — headless CMS, content management
- **Tailwind CSS** — styling
- **Resend** — email sending from the contact form
- **TypeScript** — type safety
- **Embla Carousel** — project slider
- **Vercel** — hosting and deployment

## Features

- Homepage with a project slider
- Offer page with service options
- Portfolio of completed projects
- Contact form with validation and email delivery
- Job page with employment offers
- Full content management through Sanity Studio
- SEO — meta tags, sitemap, robots.txt, Schema.org
- Responsive, mobile-first design

## Local Setup

### Requirements

- Node.js 18+
- Sanity.io account
- Resend account

### Installation

```bash
git clone https://github.com/twoj-user/azymut-lab.git
cd azymut-lab
npm install
```

### Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

Fill in the variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_READ_TOKEN=
RESEND_API_KEY=
```

### Run the Project

```bash
# Next.js application
npm run dev

# Sanity Studio
npm run sanity
```

The app is available at `http://localhost:3000`  
Sanity Studio is available at `http://localhost:3000/studio`

## Project Structure

```
├── app/
│   ├── (pages)/          # pages
│   │   ├── oferta/
│   │   ├── portfolio/
│   │   ├── kontakt/
│   │   └── praca/
│   ├── api/
│   ├── layout.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/           # React components
├── constants/            # constants (menu)
├── lib/                  # helpers (validation, email template)
├── sanity/
│   ├── lib/              # configuration, queries
│   └── schemas/          # document schemas
└── public/               # static files (icons, fonts)
```

## Sanity Studio

The CMS panel is available at `/studio` after deployment. Content management includes:

- **Home** — title, description, project slider
- **Offer** — services, variants, CTA
- **Portfolio** — completed projects with image gallery
- **Contact** — contact details, social media
- **Jobs** — job offers, benefits
- **Settings** — logo, footer, OG image

## Deployment

The project is deployed on Vercel. Every push to the `main` branch triggers an automatic deployment.

```bash
# manual deploy
vercel --prod
```

## License

Private project — all rights reserved © Azymut Lab
