import {getFieldError} from '@/helpers/validations'
import {sendEmail} from '@/services/emailService'
import {Spinner, useToast} from '@sanity/ui'
import {FormEvent, useState} from 'react'
import Section from './Section'

export interface IContactForm {
  title: string | null
  description: string | null
  contactFormEmail?: string | null
}

export default function ContactForm({title, description, contactFormEmail}: IContactForm) {
  const toast = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string | null>>({})
  const [formData, setFormData] = useState({
    fullName: '',
    subject: '',
    email: '',
    phone: '',
    message: '',
  })

  const clearFormData = () => {
    setFormData({
      fullName: '',
      subject: '',
      email: '',
      phone: '',
      message: '',
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target
    setFormData((prev) => ({...prev, [name]: value}))
    setErrors((prev) => ({...prev, [name]: getFieldError(name, value)}))
  }

  const validateAll = () => {
    const newErrors = Object.fromEntries(
      Object.entries(formData).map(([key, val]) => [key, getFieldError(key, val)]),
    )

    return Object.values(newErrors).every((e) => e === null)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const isValid = validateAll()

    if (!isValid) {
      setIsLoading(false)
      toast.push({
        title: 'Proszę poprawić błędy w formularzu przed wysłaniem.',
        status: 'error',
        closable: true,
      })

      return
    }

    try {
      const result = await sendEmail(
        formData.fullName,
        formData.subject,
        contactFormEmail || 'studioazymut@gmail.com',
        formData.phone,
        formData.message,
        formData.email,
      )

      if (result?.success) {
        clearFormData()
      }

      toast.push({
        title: result?.success
          ? 'Wiadomość wysłana !'
          : 'Wystąpił błąd podczas wysyłania wiadomości. Prosimy spróbować ponownie później.',
        status: result?.success ? 'success' : 'error',
        closable: true,
      })
    } catch (err) {
      console.log(err)

      toast.push({
        title: 'Wystąpił błąd podczas wysyłania wiadomości. Prosimy spróbować ponownie później.',
        status: 'error',
        closable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const labelClass = 'text-sm tracking-widest uppercase text-gray-600'

  return (
    <Section title={title} description={description}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2 pb-8 relative">
            <label className={labelClass}>Imię i nazwisko</label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Jan Kowalski"
              className="bg-transparent border-0 border-b border-gray-200 py-2 text-sm font-sans text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
              minLength={3}
              maxLength={100}
              required
            />

            {errors.fullName && (
              <p className="text-xs text-red-400 mt-1 font-sans absolute bottom-0">
                {errors.fullName}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 pb-8 relative">
            <label className={labelClass}>E-mail</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jan@example.com"
              className="bg-transparent border-0 border-b border-gray-200 py-2 text-sm font-sans text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
              minLength={5}
              maxLength={100}
              required
            />

            {errors.email && (
              <p className="text-xs text-red-400 mt-1 font-sans absolute bottom-0">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 pb-8 relative">
          <label className={labelClass}>Telefon (opcjonalnie)</label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+48 000 000 000"
            maxLength={20}
            className="bg-transparent border-0 border-b border-gray-200 py-2 text-sm font-sans text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
          />

          {errors.phone && (
            <p className="text-xs text-red-400 mt-1 font-sans absolute bottom-0">{errors.phone}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 pb-8 relative">
          <label className={labelClass}>Temat</label>

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Np. projekt wnętrza, wykończenie pod klucz..."
            className="bg-transparent border-0 border-b border-gray-200 py-2 text-sm font-sans text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
            minLength={3}
            maxLength={100}
            required
          />

          {errors.subject && (
            <p className="text-xs text-red-400 mt-1 font-sans absolute bottom-0">
              {errors.subject}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 pb-8 relative">
          <label className={labelClass}>Wiadomość</label>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Opowiedz nam o swojej przestrzeni — metraż, lokalizacja, planowany zakres prac..."
            rows={5}
            className="bg-transparent border-0 border-b border-gray-200 py-2 text-sm font-sans text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors resize-none"
            minLength={10}
            maxLength={2000}
            required
          />

          {errors.message && (
            <p className="text-xs text-red-400 mt-1 font-sans absolute bottom-0">
              {errors.message}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center gap-6">
          <p className="text-sm font-sans text-gray-600 leading-relaxed max-w-[200px]">
            Dane są przetwarzane zgodnie z polityką prywatności i nie są udostępniane osobom
            trzecim.
          </p>

          <button
            type="submit"
            className="action-button flex items-center gap-2"
            disabled={isLoading}
          >
            <span>Wyślij wiadomość</span>
            {isLoading ? <Spinner className="w-[16px] h-[16px] top-[1px]" /> : null}
          </button>
        </div>
      </form>
    </Section>
  )
}
