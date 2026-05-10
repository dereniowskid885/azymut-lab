import {ReactNode} from 'react'

export interface ISection {
  className?: string
  title: string | null
  description: string | null
  note?: string | null
  children: ReactNode
}

export default function Section({className = '', title, description, note, children}: ISection) {
  return (
    <section className={`space-y-8 md:space-y-12 ${className}`}>
      <div className="space-y-4 md:w-5/6">
        <p className="text-2xl md:text-4xl">{title}</p>

        {description ? (
          <p className="text-md md:text-lg text-gray-600 whitespace-pre-wrap">{description}</p>
        ) : null}

        {note ? (
          <p className="text-md md:text-lg bg-warning-bg border-l-2 border-warning-border text-warning-text px-4 py-3 w-fit">
            {note}
          </p>
        ) : null}
      </div>

      {children}
    </section>
  )
}
