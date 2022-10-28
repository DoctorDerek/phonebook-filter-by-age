import { ReactNode } from "react"

import { Inter } from "@next/font/google"

const inter = Inter()

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <main className="my-2 mx-auto flex min-h-screen w-[95vw] cursor-crosshair flex-col items-center justify-center">
          <div className="min-w-104 flex max-w-3xl flex-col items-center justify-center space-y-2 rounded-xl border border-solid border-gray-600 p-2">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
