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
    // When we first load or are idle, load the phone book from localStorage:
    if (state.matches("idle")) send({ type: "READ" })
    // When we're running, we need to write the phone book to localStorage:
    if (state.matches("running")) send({ type: "FINISH" })
  }, [state, send])
  console.log(state.context.phoneBookEntries)

  const { value, context } = state || {}
  const { phoneBookEntries } = context || {}

  const resetPhoneBook = () => send({ type: "RESET" })

  return (
    <div>
      <Head>
        <title>Phonebook App by @DoctorDerek</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <>Current state: {value}</>
          <>Current entries: {JSON.stringify(phoneBookEntries)}</>
        </div>
        <button onClick={() => resetPhoneBook()}>RESET</button>
      </main>
    </div>
  )
}
