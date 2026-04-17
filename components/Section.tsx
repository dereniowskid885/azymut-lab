import {ReactNode} from 'react'

export interface ISection {
  title: string
  children: ReactNode
  className?: string
}

export default function Section({title, children, className = ''}: ISection) {
  return (
    <section className={`space-y-8 ${className}`}>
      <p className="text-2xl font-bold tracking-widest text-studio-600 uppercase">{title}</p>

      {children}
    </section>
  )
}
