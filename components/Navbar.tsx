import {menuObj} from '@/const/menu'
import NavLink from './NavLink'

export default function Navbar() {
  return (
    <nav className="flex flex-wrap items-center gap-x-5 bg-white/80 backdrop-blur">
      {menuObj?.map((menuItem) => {
        return (
          <NavLink key={menuItem.id} href={menuItem.href} label={menuItem.title.toLowerCase()} />
        )
      })}
    </nav>
  )
}
