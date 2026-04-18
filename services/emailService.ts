'use server'

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
  if (message.length < 0) return

  const {error} = await resend.emails.send({
    from: `${sender} <onboarding@resend.dev>`,
    to: email,
    subject: subject,
    html: `<div class="flex gap-3"><h3>${fullName}</h3><p>Phone number: ${phone}</p><p>${message}</p></div>`,
  })

  return {success: !error}
}
