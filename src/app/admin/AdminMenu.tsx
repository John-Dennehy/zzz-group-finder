"use client"

import { usePathname } from "next/navigation"
import { NavButton } from "./NavButton"

const menuItems = [
  { href: "/admin", text: "Admin Home" },
  { href: "/admin/attendee-types", text: "Attendee Types" },
  { href: "/admin/groups", text: "Groups" },
]

export function AdminMenu() {
  const path = usePathname()

  return (
    <div>
      {menuItems.map((item) => (
        <NavButton key={item.href} href={item.href} currentPath={path}>
          {item.text}
        </NavButton>
      ))}
    </div>
  )
}
