import Head from "next/head"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import GlobalStateContext from "@/components/GlobalStateContext"
import { PhoneBookEntry } from "@/utils/phoneBookMachine"
import { Dialog } from "@headlessui/react"
import {
  DevicePhoneMobileIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid"
import { useActor } from "@xstate/react"

export default function PhoneBookApp() {
  // Retrieve our global context from the XState finite state machine:
  const globalServices = useContext(GlobalStateContext)
  const [state] = useActor(globalServices.phoneBookService)
  const { send } = globalServices.phoneBookService
  const router = useRouter()

  useEffect(() => {
    // Make sure that the window object is available before we start to render.
    if (!router?.isReady) return // void
    // When we first load or are idle, load the phone book from localStorage:
    if (state.matches("idle")) send({ type: "READ" })
    // When we're running, we need to write the phone book to localStorage:
    if (state.matches("running")) send({ type: "FINISH" })
  }, [state, send, router?.isReady])

  /** Unpack our current XState machine context (i.e. the phone book entries) */
  const { context } = state || {}
  const { phoneBookEntries } = context || {}

  /** Set up a state handler for the "search by last name" filter logic. */
  const [filterText, setFilterText] = useState("")

  /**
   * We allow the user to filter by last name. Note that the empty
   * string "" will always return true for the regular expression.
   */
  const filteredPhoneBookEntries = phoneBookEntries?.filter(
    ({ lastName }) => new RegExp(filterText, "i").exec(lastName)
    // The "i" flag means we use a case-insensitive search.
  )

  /** We model the dialogState off the XState action patterns. */
  const [dialogState, setDialogState] = useState<{
    type: "CLOSED" | "CREATE" | "UPDATE" | "DELETE" | "RESET"
    phoneBookEntry?: PhoneBookEntry
  }>({ type: "CLOSED" })

  /** We set up our form handlers for React Hook Form, including reset. */
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PhoneBookEntry>()

  /** We have a helper to reset the dialog state and thus close the dialog. */
  const closeDialog = () => {
    setDialogState({ type: "CLOSED", phoneBookEntry: undefined })
    reset() // Reset the form in the dialog, not just the dialog state.
  }

  /**
   * This is our master form handler that handles all the action types.
   *
   * The `data` are the updated (or new) fields from the form.
   * The `dialogState.type` is the action that we want to take.
   * The `dialogState.phoneBookEntry` is the active contact.
   */
  const onSubmit = (data: PhoneBookEntry) => {
    if (dialogState.type === "CREATE") {
      // We used React Hook Form to make sure we're getting all of the items:
      const { firstName, lastName, phoneNumber } = data
      // We need the max id from the current contacts to avoid hash collisions.
      const maxId = Math.max(...phoneBookEntries?.map(({ id }) => id))
      send({
        type: "CREATE",
        phoneBookEntry: { id: maxId + 1, firstName, lastName, phoneNumber },
      })
    }

    if (dialogState.type === "UPDATE") {
      // We should have values from the form OR the existing entry.
      const firstName =
        data.firstName || dialogState?.phoneBookEntry?.firstName || ""
      const lastName =
        data.lastName || dialogState?.phoneBookEntry?.lastName || ""
      const phoneNumber =
        data.phoneNumber || dialogState?.phoneBookEntry?.phoneNumber || ""
      const id = dialogState.phoneBookEntry?.id || -1
      send({
        type: "UPDATE",
        phoneBookEntry: { id, firstName, lastName, phoneNumber },
      })
    }

    if (dialogState.type === "DELETE" && dialogState?.phoneBookEntry)
      // We should have the entry from the dialog state, but data will be blank.
      send({ type: "DELETE", phoneBookEntry: dialogState?.phoneBookEntry })

    if (dialogState.type === "RESET") send({ type: "RESET" })

    // Close and reset the dialog once we've finished sending the action.
    closeDialog()
    // We handle flushing the state to `localStorage` in the `useEffect` hook.
  }

  return (
    <>
      <Head>
        <title>Phonebook App by @DoctorDerek</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dialog
        open={dialogState.type !== "CLOSED"}
        onClose={closeDialog}
        className="relative z-50"
      >
        {/* The backdrop (a fixed sibling to the panel container). */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* A full-screen container that will center the dialog. */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          {/* The actual dialog panel, centered inside the box. */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Dialog.Panel className="relative mx-auto flex min-h-[75vh] max-w-lg flex-col justify-between rounded-lg bg-white p-6 text-lg">
              <button
                onClick={closeDialog}
                className="group absolute top-2 right-2 h-6 w-6 rounded-lg hover:outline hover:outline-1 hover:outline-gray-600"
              >
                <XMarkIcon
                  aria-label="Close dialog"
                  className="fill-gray-500 group-hover:fill-gray-600"
                />
              </button>
              <Dialog.Title className="text-center text-2xl font-bold">
                {/** We transform the dialog state to title case: "Update" */}
                {`${dialogState.type.slice(0, 1)}${dialogState.type
                  .slice(1)
                  .toLocaleLowerCase()}`}{" "}
                {dialogState.type !== "RESET" && "Phone Book Entry"}
                {dialogState.type === "RESET" && "Contacts"}
              </Dialog.Title>

              <Dialog.Description>
                {dialogState.type === "CREATE" &&
                  "This will create a new entry in your contacts."}
                {dialogState.type === "UPDATE" &&
                  "This will update the entry in your contacts."}
                {dialogState.type === "DELETE" &&
                  "This will permanently delete the entry."}
                {dialogState.type === "RESET" &&
                  "This will permanently reset your contacts."}
              </Dialog.Description>

              {(dialogState.type === "DELETE" ||
                dialogState.type === "RESET") && (
                <p>
                  Are you sure you want to proceed? Your data will be
                  permanently removed. This action cannot be undone.
                </p>
              )}

              {dialogState.type !== "RESET" && (
                <>
                  <div className="space-y-1 whitespace-nowrap">
                    <label className="flex space-x-1 text-sm text-gray-700">
                      <span>First Name</span>
                      <input
                        type="text"
                        placeholder={dialogState.phoneBookEntry?.firstName}
                        {...register("firstName", {
                          required: dialogState.type === "CREATE",
                        })}
                        className="w-full rounded-md border border-gray-300 pl-1 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                        disabled={dialogState.type === "DELETE"}
                      />
                    </label>
                    <label className="flex space-x-1 text-sm text-gray-700">
                      <span>Last Name</span>
                      <input
                        type="text"
                        placeholder={dialogState.phoneBookEntry?.lastName}
                        {...register("lastName", {
                          required: dialogState.type === "CREATE",
                        })}
                        className="w-full rounded-md border border-gray-300  pl-1 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                        disabled={dialogState.type === "DELETE"}
                      />
                    </label>
                    <label className="flex space-x-1 text-sm text-gray-700">
                      <span>Phone Number</span>
                      <input
                        type="tel"
                        placeholder={dialogState.phoneBookEntry?.phoneNumber}
                        {...register("phoneNumber", {
                          required: dialogState.type === "CREATE",
                        })}
                        /**
                         * Note that we don't try to validate the phone number,
                         * because formats for telephone numbers vary so much
                         * around the world. For example, many validations for
                         * telephone numbers will reject any country code, such
                         * as +1 for United States, even though that is wrong.
                         * */
                        className="w-full rounded-md border border-gray-300 pl-1 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                        disabled={dialogState.type === "DELETE"}
                      />
                    </label>
                    {dialogState.type === "CREATE" &&
                      (errors.firstName ||
                        errors.lastName ||
                        errors.phoneNumber) && (
                        <div>All fields are required.</div>
                      )}
                  </div>
                </>
              )}

              <div className="flex w-full items-center justify-end space-x-2">
                <button
                  className="rounded-md bg-gray-800 px-6 py-2 text-white hover:bg-gray-700 hover:outline hover:outline-1 hover:outline-gray-800"
                  onClick={closeDialog}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-400 px-6 py-2 text-white hover:bg-blue-500 hover:outline hover:outline-1 hover:outline-blue-400"
                >
                  {dialogState.type}
                </button>
              </div>
            </Dialog.Panel>
          </form>
        </div>
      </Dialog>

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
          placeholder="Search for contact by last name..."
          className="w-full rounded-md border border-gray-300 pl-6 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
          onChange={(event) => setFilterText(event?.target?.value)}
        />
        <MagnifyingGlassIcon className="absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2" />
      </div>
      <div className="divide-y-gray-300 relative w-full divide-y-2 border border-solid border-gray-300">
        {filteredPhoneBookEntries?.map((phoneBookEntry) => {
          const { id, firstName, lastName, phoneNumber } = phoneBookEntry
          const key = `${id}${firstName}${lastName}${phoneNumber}`
          return (
            <div
              className="flex w-full items-center justify-between p-3"
              key={key}
            >
              <h3 className="flex flex-col items-start justify-center">
                <button
                  className="group flex items-center justify-center text-2xl font-semibold"
                  onClick={() =>
                    setDialogState({ type: "UPDATE", phoneBookEntry })
                  }
                >
                  {firstName} {lastName}
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
              <button
                className="group flex items-center justify-center"
                onClick={() =>
                  setDialogState({ type: "DELETE", phoneBookEntry })
                }
              >
                <div className="invisible pr-1 text-sm font-bold text-red-600 group-hover:visible">
                  delete
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-red-500">
                  <TrashIcon
                    className="h-4 w-4 fill-white"
                    aria-label={`Delete ${firstName} ${lastName} ${phoneNumber}`}
                  />
                </div>
              </button>
            </div>
          )
        })}
      </div>
    </>
  )
}
