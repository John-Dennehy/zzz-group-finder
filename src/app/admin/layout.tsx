import { ReactNode } from "react"
import { AdminMenu } from "@/components/AdminMenu"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto">
      <h2 className="text-2xl text-primary">/admin/layout.tsx</h2>
      <AdminMenu />
      <div className="container mx-auto border-medium">{children}</div>
    </div>
  )
}
