import Link from 'next/link'
import {ReactNode} from 'react'

export interface ISectionFullWidth {
  className?: string
  children: ReactNode
  buttonHref: string
  buttonText: string
}

export default function SectionFullWidth({
  children,
  buttonHref,
  buttonText,
  className = '',
}: ISectionFullWidth) {
  return (
    <section
      className={`bg-black flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-12 full-container-width ${className}`}
    >
      {children}

      <Link href={buttonHref} className="action-button ml-auto">
        {buttonText}
      </Link>
    </section>
  )
}
