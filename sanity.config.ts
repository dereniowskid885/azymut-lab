'use client'

/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/page.tsx` route
 */
import {apiVersion, dataset, projectId, studioUrl} from '@/sanity/lib/api'
import {pageStructure, singletonPlugin} from '@/sanity/plugins/settings'
import home from '@/sanity/schemas/singletons/home'
import settings from '@/sanity/schemas/singletons/settings'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import about from './sanity/schemas/singletons/about'
import contact from './sanity/schemas/singletons/contact'
import offer from './sanity/schemas/singletons/offer'
import portfolio from './sanity/schemas/singletons/portfolio'
import work from './sanity/schemas/singletons/work'

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Azymut Lab - Content Management'

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      home,
      settings,
      offer,
      portfolio,
      about,
      contact,
      work,
    ],
  },
  plugins: [
    structureTool({
      structure: pageStructure([home, settings, offer, portfolio, about, contact, work]),
    }),
    presentationTool({
      previewUrl: {previewMode: {enable: '/api/draft-mode/enable'}},
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([
      home.name,
      settings.name,
      offer.name,
      portfolio.name,
      about.name,
      contact.name,
      work.name,
    ]),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
