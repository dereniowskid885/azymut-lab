'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'

interface INavLink {
  href: string
  label: string
}

export default function NavLink({href, label}: INavLink) {
  const pathname = usePathname()
  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <Link
      href={href}
      className={`text-lg hover:text-black md:text-xl tracking-widest transition ${isActive ? 'text-black font-bold' : 'text-gray-500'}`}
    >
      {label}
    </Link>
  )
}
