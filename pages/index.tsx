import Head from "next/head"
import { useContext, useEffect, useState } from "react"

import GlobalStateContext from "@/components/GlobalStateContext"
import {
  DevicePhoneMobileIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  TrashIcon,
} from "@heroicons/react/24/solid"
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

  const [filterText, setFilterText] = useState("")

  /**
   * We allow the user to filter by last name. Note that the empty
   * string "" will always return true for the regular expression.
   */
  const filteredPhoneBookEntries = phoneBookEntries.filter(
    ({ lastName }) => new RegExp(filterText, "i").exec(lastName)
    // The "i" flag means we use a case-insensitive search.
  )

  return (
    <>
      <Head>
        <title>Phonebook App by @DoctorDerek</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="group flex items-center justify-center space-x-2 text-4xl font-semibold">
        <DevicePhoneMobileIcon className="h-10 w-10 group-hover:animate-spin" />
        <h1>Phone Book App</h1>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-center space-x-2">
          <h2 className="text-2xl font-semibold">Contacts</h2>
          <button onClick={() => resetPhoneBook()}>
            <TrashIcon
              aria-label="Delete all phone book entries and reset"
              className="h-6 w-6 rounded-md hover:fill-red-600 hover:outline hover:outline-1 hover:outline-red-600"
            />
          </button>
        </div>
        <button className="rounded-md bg-blue-400 px-6 py-2 text-white">
          + Add Contact
        </button>
      </div>
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search for contact by last name..."
          className="border-sm w-full rounded-md border border-gray-300 pl-6 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
          onChange={(event) => setFilterText(event?.target?.value)}
        />
        <MagnifyingGlassIcon className="absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2" />
      </div>
      <div className="divide-y-gray-300 relative w-full divide-y-2 border border-solid border-gray-300">
        {filteredPhoneBookEntries.map((phoneBookEntry) => {
          const { id, firstName, lastName, phoneNumber } = phoneBookEntry
          const key = `${id}${firstName}${lastName}${phoneNumber}`
          return (
            <div
              className="flex w-full items-center justify-between p-3"
              key={key}
            >
              <h3 className="flex flex-col items-start justify-center">
                <div className="text-2xl font-semibold">
                  {firstName} {lastName}
                </div>
                <div className="flex items-center justify-center space-x-1 text-sm font-medium text-gray-400">
                  <PhoneIcon className="h-2.5 w-2.5 fill-gray-400" />
                  <span>{phoneNumber}</span>
                </div>
              </h3>
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-red-500">
                <TrashIcon
                  className="h-4 w-4 fill-white "
                  aria-label={`Delete ${firstName} ${lastName} ${phoneNumber}`}
                />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
