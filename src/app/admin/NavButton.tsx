import { Button } from "@nextui-org/button"
import Link from "next/link"

type NavButtonProps = {
  children: React.ReactNode
  href: string
  currentPath?: string
}
export function NavButton({ children, href, currentPath }: NavButtonProps) {
  let isActive = false
  if (currentPath === href) {
    isActive = true
  }

  return (
    <Button
      as={Link}
      href={href}
      className={
        isActive ? "bg-primary text-background" : "bg-background text-primary"
      }
    >
      {children}
    </Button>
  )
}
