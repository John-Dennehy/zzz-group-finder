"use client"

import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter()
  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" defaultTheme="light">
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
}
