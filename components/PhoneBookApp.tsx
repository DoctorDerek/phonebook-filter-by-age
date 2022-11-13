"use client" // Specify this is a Client Component, not a Server Component.

import { useContext, useEffect, useState } from "react"

import ContactActionDialog, { DialogState } from "@/components/ContactActionDialog"
import ContactList from "@/components/ContactList"
import GlobalStateContext from "@/components/GlobalStateContext"
import PhoneBookHeadings from "@/components/PhoneBookHeadings"
import SearchBar from "@/components/SearchBar"
import { useActor } from "@xstate/react"

/**
 * The `<PhoneBookApp>` handles our global state using 3 state handlers:
 * 1. `dialogState` is used to control the dialog box that appears when the user
 *    clicks on a contact card.
 * 2. `filterText` is used to filter the contacts list by name using the
 *    `<SearchBar>` component.
 * 3. `phoneBookState` is used to control the state of the phone book. It's
 *    managed by the `phoneBookMachine` state machine.
 *
 * This component also handles the layout of the main content area of the app.
 * */
export default function PhoneBookApp() {
  // Retrieve our global context from the XState finite state machine:
  const globalServices = useContext(GlobalStateContext)
  const [phoneBookState] = useActor(globalServices.phoneBookService)
  const { send } = globalServices.phoneBookService

  /** READ the XState machine if it's `idle` or FINISH if it's `running`. */
  useEffect(() => {
    // When we first load or are idle, load the phone book from localStorage:
    if (phoneBookState.matches("idle")) send({ type: "READ" })
    // When we're running, we need to write the phone book to localStorage:
    if (phoneBookState.matches("running")) send({ type: "FINISH" })
  }, [phoneBookState, send])

  /** Unpack our current XState machine context (i.e. the phone book entries) */
  const { context } = phoneBookState || {}
  const { contacts } = context || {}

  /** Set up a state handler for the "search by name" filter logic. */
  const [filterText, setFilterText] = useState("")

  /** We model the dialogState off the XState action patterns. */
  const [dialogState, setDialogState] = useState<DialogState>({
    type: "CLOSED",
  })

  // Guard clause: Don't render the component until the state machine is ready.
  if (!phoneBookState.matches("ready")) return null
  // This prevents the default contacts list from being rendered and then being
  // replaced with the contacts list from localStorage, causing layout shift.

  return (
    <>
      {/**
       * The Dialog doesn't belong in the main content area because we use
       * space-y-2, which wouldn't work correctly with the hidden element.
       * */}
      <ContactActionDialog
        dialogState={dialogState}
        setDialogState={setDialogState}
        contacts={contacts}
      />

      <div className="flex flex-col items-center justify-center space-y-2">
        <PhoneBookHeadings setDialogState={setDialogState} />

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
