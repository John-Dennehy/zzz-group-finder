"use client"

import { NavButton } from "@/components/NavButton"
import { usePathname } from "next/navigation"

const menuItems = [
  { href: "/admin", text: "Admin Home" },
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
