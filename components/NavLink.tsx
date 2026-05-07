'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useEffect, useState} from 'react'

interface INavLink {
  href: string
  label: string
}

export default function NavLink({href, label}: INavLink) {
  const pathname = usePathname()
  const [isActive, setIsActive] = useState(pathname === href)

  useEffect(() => {
    console.log('pathname: ', pathname)
    console.log('href: ', href)
    console.log('check: ', pathname === href)
    setIsActive(pathname === href)
  }, [pathname, href])

  return (
    <Link
      href={href}
      className={`text-lg hover:text-black md:text-xl tracking-widest transition ${isActive ? 'text-black font-bold' : 'text-gray-500'}`}
    >
      {label}
    </Link>
  )
}
