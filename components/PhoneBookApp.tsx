"use client" // Specify this is a Client Component, not a Server Component.

import Image from "next/image"
import { useContext, useEffect, useState } from "react"

import ContactActionDialog, { DialogState } from "@/components/ContactActionDialog"
import GlobalStateContext from "@/components/GlobalStateContext"
import {
  DevicePhoneMobileIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  TrashIcon,
} from "@heroicons/react/24/solid"
import { useActor } from "@xstate/react"

/**
 * We have to specify the `sizes` prop when using `next/image` with `fill`.
 * These screen sizes correspond to Tailwind's sm: and xl: breakpoints.
 * The image sizes correspond to Tailwind's w-16 class, which is 4rem. */
const IMAGE_SIZES = "(max-width: 640px) 4rem, (max-width: 1280px) 4rem, 4rem"

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

  /**
   * We allow the user to filter by name. Note that the empty string "" will
   * always return true for the regular expression, which is the initial state.
   */
  const filteredPhoneBookEntries = contacts?.filter(
    ({ name }) => new RegExp(filterText, "i").exec(name)
    // The "i" flag means we use a case-insensitive search.
  )

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
            <button
              onClick={() => setDialogState({ type: "RESET" })}
              className="group flex items-center justify-center"
            >
              <TrashIcon
                aria-label="Delete all phone book entries and reset"
                className="h-6 w-6 rounded-md group-hover:fill-red-600 group-hover:outline group-hover:outline-1 group-hover:outline-red-600"
              />
              <div className="invisible pl-1 font-bold text-red-600 group-hover:visible">
                reset
              </div>
            </button>
          </div>
          <button
            className="rounded-md bg-blue-400 px-6 py-2 text-white hover:bg-blue-500 hover:outline hover:outline-1 hover:outline-blue-400"
            onClick={() => setDialogState({ type: "CREATE" })}
          >
            + Add Contact
          </button>
        </div>

        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search for contact by name..."
            className="w-full rounded-md border border-gray-300 pl-6 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
            onChange={(event) => setFilterText(event?.target?.value)}
          />
          <MagnifyingGlassIcon className="absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2" />
        </div>
        <div className="divide-y-gray-300 relative w-full divide-y-2 border border-solid border-gray-300">
          {filteredPhoneBookEntries?.map((contact) => {
            const { id, name, phoneNumber, photo } = contact
            // ID should be unique, but there's no penalty for adding to key.
            const key = `${id}${name}${phoneNumber}${photo}`
            return (
              <div
                className="flex w-full items-center justify-between p-3"
                key={key}
              >
                <div className="flex items-center justify-center space-x-2">
                  <div className="relative h-16 w-16">
                    {photo && ( // Only show the photo if there's a `photo` URL.
                      <Image
                        src={`/contacts/${photo}`}
                        alt={name} // Screen readers announce "Image of {name}"
                        fill
                        className="object-fit rounded-full"
                        sizes={IMAGE_SIZES}
                      />
                    )}
                  </div>
                  <h3 className="flex flex-col items-start justify-center">
                    <button
                      className="group flex items-center justify-center text-2xl font-semibold"
                      onClick={() =>
                        setDialogState({ type: "UPDATE", contact })
                      }
                    >
                      {name}
                      <div className="invisible pl-1 text-sm text-gray-400 group-hover:visible">
                        edit
                      </div>
                    </button>
                    <a
                      href={`tel:${phoneNumber}`}
                      className="group flex items-center justify-center space-x-1 text-sm font-medium"
                    >
                      <PhoneIcon
                        className="h-2.5 w-2.5 fill-gray-400 group-hover:fill-green-400"
                        aria-label="Call"
                      />
                      <span className="text-gray-400 group-hover:text-gray-500">
                        {phoneNumber}
                      </span>
                      <div className="invisible text-xs font-bold text-green-400 group-hover:visible">
                        call
                      </div>
                    </a>
                  </h3>
                </div>
                <button
                  className="group flex items-center justify-center"
                  onClick={() => setDialogState({ type: "DELETE", contact })}
                >
                  <div className="invisible pr-1 text-sm font-bold text-red-600 group-hover:visible">
                    delete
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-red-500">
                    <TrashIcon
                      className="h-4 w-4 fill-white"
                      aria-label={`Delete ${name} ${phoneNumber}`}
                    />
                  </div>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
