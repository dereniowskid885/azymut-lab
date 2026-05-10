export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validatePhone = (phone: string) => {
  const regex = /^(\+?\d{1,3}[\s-]?)?\(?\d{2,3}\)?[\s-]?\d{3}[\s-]?\d{3,4}$/
  return regex.test(phone.replace(/\s/g, ''))
}

export const validateSubject = (subject: string) => {
  return subject.trim().length >= 3 && subject.trim().length <= 100
}

export const validateName = (fullName: string) => {
  const regex = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]{3,100}$/
  return regex.test(fullName.trim())
}

export const validateMessage = (message: string) => {
  const hasHtml = /<[^>]*>/g.test(message)
  return message.trim().length >= 10 && message.trim().length <= 2000 && !hasHtml
}

export const getFieldError = (name: string, value: string): string | null => {
  switch (name) {
    case 'fullName':
      if (!value.trim()) return 'Imię i nazwisko jest wymagane'
      if (!validateName(value)) return 'Podaj poprawne imię i nazwisko (min. 3 znaki)'
      return null

    case 'email':
      if (!value.trim()) return 'Adres e-mail jest wymagany'
      if (!validateEmail(value)) return 'Podaj poprawny adres e-mail'
      return null

    case 'phone':
      if (!value.trim()) return null
      if (!validatePhone(value)) return 'Podaj poprawny numer telefonu'
      return null

    case 'subject':
      if (!value.trim()) return 'Temat jest wymagany'
      if (!validateSubject(value)) return 'Temat musi mieć od 3 do 100 znaków'
      return null

    case 'message':
      if (!value.trim()) return 'Wiadomość jest wymagana'
      if (!validateMessage(value)) return 'Wiadomość musi mieć od 10 do 2000 znaków'
      return null

    default:
      return null
  }
}
