"use client" // Specify this is a Client Component, not a Server Component.
import { Dispatch, SetStateAction, useContext } from "react"
import { useForm } from "react-hook-form"

import GlobalStateContext from "@/components/GlobalStateContext"
import { Contact } from "@/contacts/CONTACTS"
import { Dialog } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/24/solid"

export type DialogState = {
  type: "CLOSED" | "CREATE" | "UPDATE" | "DELETE" | "RESET"
  contact?: Contact
}

export default function ContactDialog({
  dialogState,
  setDialogState,
  contacts,
}: {
  dialogState: DialogState
  setDialogState: Dispatch<SetStateAction<DialogState>>
  contacts: Contact[]
}) {
  // Retrieve our global context from the XState finite state machine:
  const globalServices = useContext(GlobalStateContext)
  const { send } = globalServices.phoneBookService

  /** We set up our form handlers for React Hook Form, including reset. */
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Contact>()

  /** We have a helper to reset the dialog state and thus close the dialog. */
  const closeDialog = () => {
    setDialogState({ type: "CLOSED", contact: undefined })
    reset() // Reset the form in the dialog, not just the dialog state.
  }

  /**
   * This is our master form handler that handles all the action types.
   *
   * The `data` are the updated (or new) fields from the form.
   * The `dialogState.type` is the action that we want to take.
   * The `dialogState.contact` is the active contact.
   */
  const onSubmit = (data: Contact) => {
    if (dialogState.type === "CREATE") {
      // We used React Hook Form to make sure we're getting all of the items:
      const { name, phoneNumber } = data
      // We need the max id from the current contacts to avoid hash collisions.
      const maxId = Math.max(...contacts?.map(({ id }) => id))
      send({
        type: "CREATE",
        contact: { id: maxId + 1, name, phoneNumber },
      })
    }

    if (dialogState.type === "UPDATE") {
      // We should have values from the form OR the existing entry.
      const name = data.name || dialogState?.contact?.name || ""
      const phoneNumber =
        data.phoneNumber || dialogState?.contact?.phoneNumber || ""
      /** The id should come from the existing entry, but we fall back to -1. */
      const id = dialogState.contact?.id || -1
      send({
        type: "UPDATE",
        contact: { id, name, phoneNumber },
      })
    }

    if (dialogState.type === "DELETE" && dialogState?.contact)
      // We should have the entry from the dialog state, but data will be blank.
      send({ type: "DELETE", contact: dialogState?.contact })

    if (dialogState.type === "RESET") send({ type: "RESET" })

    // Close and reset the dialog once we've finished sending the action.
    closeDialog()
    // We handle flushing the state to `localStorage` in the `useEffect` hook.
  }

  return (
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
                Are you sure you want to proceed? Your data will be permanently
                removed. This action cannot be undone.
              </p>
            )}

            {dialogState.type !== "RESET" && (
              <>
                <div className="space-y-1 whitespace-nowrap">
                  <label className="flex space-x-1 text-sm text-gray-700">
                    <span>Name</span>
                    <input
                      type="text"
                      placeholder={dialogState.contact?.name}
                      {...register("name", {
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
                      placeholder={dialogState.contact?.phoneNumber}
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
                    (errors.name || errors.phoneNumber) && (
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
  )
}
