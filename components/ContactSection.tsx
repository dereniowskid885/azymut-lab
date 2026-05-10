'use client'

import {ThemeProvider, ToastProvider} from '@sanity/ui'
import {buildTheme} from '@sanity/ui/theme'
import ContactForm from './ContactForm'

export interface IContactSection {
  title: string | null
  description: string | null
  contactFormEmail?: string | null
}

const theme = buildTheme()

export default function ContactSection({title, description, contactFormEmail}: IContactSection) {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <ContactForm title={title} description={description} contactFormEmail={contactFormEmail} />
      </ToastProvider>
    </ThemeProvider>
  )
}
