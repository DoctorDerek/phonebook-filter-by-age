import "@/styles/globals.css"

import { ReactNode } from "react"

import Providers from "@/app/providers"
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
          <main className="my-2 mx-auto flex min-h-screen w-[95vw] cursor-crosshair flex-col items-center justify-center">
            <div className="min-w-104 max-w-3xl rounded-xl border border-solid border-gray-600 p-2">
              {children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
