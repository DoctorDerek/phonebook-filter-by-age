"use client" // Specify this is a Client Component, not a Server Component.

import { useContext, useEffect, useState } from "react"

import ButtonCreate from "@/components/ButtonCreate"
import ButtonReset from "@/components/ButtonReset"
import ContactActionDialog, { DialogState } from "@/components/ContactActionDialog"
import ContactCard from "@/components/ContactCard"
import ContactList from "@/components/ContactList"
import GlobalStateContext from "@/components/GlobalStateContext"
import SearchBar from "@/components/SearchBar"
import { DevicePhoneMobileIcon } from "@heroicons/react/24/solid"
import { useActor } from "@xstate/react"

export default function PhoneBookApp() {
  // Retrieve our global context from the XState finite state machine:
  const globalServices = useContext(GlobalStateContext)
  const [state] = useActor(globalServices.phoneBookService)
  const { send } = globalServices.phoneBookService

  /** READ the XState machine if it's `idle` or FINISH if it's `running`. */
  useEffect(() => {
    // When we first load or are idle, load the phone book from localStorage:
    if (state.matches("idle")) send({ type: "READ" })
    // When we're running, we need to write the phone book to localStorage:
    if (state.matches("running")) send({ type: "FINISH" })
  }, [state, send])

  /** Unpack our current XState machine context (i.e. the phone book entries) */
  const { context } = state || {}
  const { contacts } = context || {}

  /** Set up a state handler for the "search by name" filter logic. */
  const [filterText, setFilterText] = useState("")

  /** We model the dialogState off the XState action patterns. */
  const [dialogState, setDialogState] = useState<DialogState>({
    type: "CLOSED",
  })

  // Guard clause: Don't render the component until the state machine is ready.
  if (!state.matches("ready")) return null
  // This prevents the default contacts list from being rendered and then being
  // replaced with the contacts list from localStorage, causing layout shift.

  return (
    <>
      <ContactActionDialog
        dialogState={dialogState}
        setDialogState={setDialogState}
        contacts={contacts}
      />

      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="group flex items-center justify-center space-x-2 text-4xl font-semibold">
          <DevicePhoneMobileIcon className="h-10 w-10 group-hover:animate-spin" />
          <h1>Phone Book App</h1>
        </div>

        <div className="flex w-full items-center justify-between">
          <div className="flex items-center justify-center space-x-2">
            <h2 className="text-2xl font-semibold">Contacts</h2>
            <ButtonReset setDialogState={setDialogState} />
          </div>
          <ButtonCreate setDialogState={setDialogState} />
        </div>

        <SearchBar setFilterText={setFilterText} />

        <ContactList
          contacts={contacts}
          filterText={filterText}
          setDialogState={setDialogState}
        />
      </div>
    </>
  )
}
