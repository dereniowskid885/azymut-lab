'use server'

import {contactEmailTemplate} from '@/helpers/email'
import {Resend} from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async (
  fullName: string,
  subject: string,
  email: string,
  phone: string,
  message: string,
  sender: string,
) => {
  if (message.length < 10) return

  const {error} = await resend.emails.send({
    from: `${sender} <onboarding@resend.dev>`,
    to: email,
    subject: subject,
    html: contactEmailTemplate({fullName, subject, sender, phone, message}),
  })

  return {success: !error}
}
