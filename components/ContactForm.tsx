'use client'

import {sendEmail} from '@/services/emailService'
import {ChangeEvent, FormEvent, useState} from 'react'
import Section from './Section'

export interface IContactForm {
  title: string | null
  description: string | null
}

export default function ContactForm({title, description}: IContactForm) {
  const [formData, setFormData] = useState({
    fullName: '',
    subject: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await sendEmail(
        formData.fullName,
        formData.subject,
        'company-email@email.com',
        formData.phone,
        formData.message,
        formData.email,
      )
    } catch (err) {
      console.log(err)
    }
  }

  const labelClass = 'text-sm tracking-widest uppercase text-gray-400'

  return (
    <Section title={title} description={description}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className={labelClass}>Imię i nazwisko</label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Jan Kowalski"
              className="bg-transparent border-0 border-b border-gray-200 py-2 text-sm font-sans text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className={labelClass}>E-mail</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jan@example.com"
              className="bg-transparent border-0 border-b border-gray-200 py-2 text-sm font-sans text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClass}>Telefon (opcjonalnie)</label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+48 000 000 000"
            className="bg-transparent border-0 border-b border-gray-200 py-2 text-sm font-sans text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClass}>Temat</label>

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Np. projekt wnętrza, wykończenie pod klucz..."
            className="bg-transparent border-0 border-b border-gray-200 py-2 text-sm font-sans text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className={labelClass}>Wiadomość</label>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Opowiedz nam o swojej przestrzeni — metraż, lokalizacja, planowany zakres prac..."
            rows={5}
            className="bg-transparent border-0 border-b border-gray-200 py-2 text-sm font-sans text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors resize-none"
          />
        </div>
      </form>

      <div className="flex justify-between items-center gap-6">
        <p className="text-sm font-sans text-gray-400 leading-relaxed max-w-[200px]">
          Dane są przetwarzane zgodnie z polityką prywatności i nie są udostępniane osobom trzecim.
        </p>

        <button type="submit" className="action-button">
          Wyślij wiadomość
        </button>
      </div>
    </Section>
  )
}
