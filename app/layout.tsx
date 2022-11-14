import "@/styles/globals.css"

import { ReactNode } from "react"

import Providers from "@/app/providers"
import NavBar from "@/components/NavBar"
import { Inter } from "@next/font/google"

/**
 * We use Next.js's automatic font optimization feature to load Inter.
 * Reference: https://nextjs.org/docs/basic-features/font-optimization#specifying-a-subset
 */
const inter = Inter({ subsets: ["latin"] })

/**
 * This is the root layout that is shared among all the pages in the app.
 *
 * This replaces both the _app.tsx and _document.tsx files from Next 12.
 *
 * Technically this is a Server Component, so `<Providers>` are a separate file.
 *
 * Reference: https://beta.nextjs.org/docs/routing/pages-and-layouts#root-layout-required
 * */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers>
          <NavBar />
          <main className="mx-auto flex min-h-screen w-[95vw] cursor-crosshair flex-col p-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
