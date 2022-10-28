import "@/styles/globals.css"

import { QueryClient, QueryClientProvider } from "react-query"

import GlobalStateContext from "@/components/GlobalStateContext"
import phoneBookMachine from "@/utils/phoneBookMachine"
import { useInterpret } from "@xstate/react"

import type { AppProps } from "next/app"

const queryClient = new QueryClient()

export default function MyApp({ Component, pageProps }: AppProps) {
  const phoneBookService = useInterpret(phoneBookMachine)

  // Note that we load React Query here but don't actually use it in the app.
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <GlobalStateContext.Provider value={{ phoneBookService }}>
        {/* We can access React context in the app via Provider */}
        <Component {...pageProps} />
      </GlobalStateContext.Provider>
    </QueryClientProvider>
  )
}
