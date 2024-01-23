"use client";

import {
  Navbar as NextuiNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/react"
import { Link } from "@nextui-org/link"
import NextLink from "next/link"
import { useState } from "react"
import { ThemeSwitcher } from "./ThemeSwitcher"
import { AcmeLogo } from "@/components/svg/AcmeLogo"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [ { label: "Admin", href: "/admin" } ]

  return (
    <NextuiNavbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        wrapper: "container mx-auto max-w-screen-2xl",
      }}
    >
      <NavbarContent className="sm:hidden md:flex" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>
      <Link as={NextLink} href="/">
        <NavbarContent className="pr-3 " justify="center">
          <NavbarBrand>
            <AcmeLogo />
            <p className="font-bold text-inherit">Group Finder</p>
          </NavbarBrand>
        </NavbarContent>
      </Link>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems?.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextuiNavbar>
  )
}
