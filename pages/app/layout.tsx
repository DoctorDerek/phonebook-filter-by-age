import { ReactNode } from "react"

import { Inter } from "@next/font/google"

const inter = Inter()

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
