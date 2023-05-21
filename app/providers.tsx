"use client"

// Specify this is a Client Component, not a Server Component.
import { useInterpret } from "@xstate/react"
import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "react-query"

import GlobalStateContext from "@/components/GlobalStateContext"
import phoneBookMachine from "@/utils/phoneBookMachine"

const queryClient = new QueryClient()

/**
 * Context is not supported in Server Components, so we make a Client Component.
 * Reference: https://beta.nextjs.org/docs/rendering/server-and-client-components#using-context-in-client-components
 * */
export default function Providers({ children }: { children: ReactNode }) {
  const phoneBookService = useInterpret(phoneBookMachine)

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      {/* We load React Query here but don't actually use it in the app. */}
      <GlobalStateContext.Provider value={{ phoneBookService }}>
        {/* We can access React context in the app via Provider */}
        {children}
      </GlobalStateContext.Provider>
    </QueryClientProvider>
  )
}
