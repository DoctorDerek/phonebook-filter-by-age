import Head from "next/head"
import { useContext, useEffect } from "react"

import GlobalStateContext from "@/components/GlobalStateContext"
import { useActor } from "@xstate/react"

export default function PhoneBookApp() {
  // Retrieve our loggedIn/loggedOut status from the global context with xState:
  const globalServices = useContext(GlobalStateContext)
  const [state] = useActor(globalServices.phoneBookService)
  const { send } = globalServices.phoneBookService

  useEffect(() => {
    // When first load or are idle, load the phone book from localStorage:
    if (state.matches("idle")) send({ type: "READ" })
    // When we're running, we need to write the phone book to localStorage:
    if (state.matches("running")) send({ type: "FINISH" })
  }, [state, send])
  console.log(state.context.phoneBookEntries)

  return (
    <div>
      <Head>
        <title>Phonebook App by @DoctorDerek</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <>Current state: {state.value}</>
        </div>
        <button>ASDF</button>
      </main>
    </div>
  )
}
