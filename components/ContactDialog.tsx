"use client" // Specify this is a Client Component, not a Server Component.

import { Dispatch, SetStateAction, useContext } from "react"
import { useForm } from "react-hook-form"

import ContactDialogButtons from "@/components/ContactDialogButtons"
import ContactDialogClose from "@/components/ContactDialogClose"
import ContactDialogDescription from "@/components/ContactDialogDescription"
import ContactDialogInputs from "@/components/ContactDialogInputs"
import ContactDialogTitle from "@/components/ContactDialogTitle"
import ContactDialogWarning from "@/components/ContactDialogWarning"
import GlobalStateContext from "@/components/GlobalStateContext"
import { Contact } from "@/contacts/CONTACTS"
import { Dialog } from "@headlessui/react"

export type DialogState = {
  type: "CLOSED" | "CREATE" | "UPDATE" | "DELETE" | "RESET"
  contact?: Contact
}

/** We show a dialog to confirm user intent before performing any action. */
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
            <ContactDialogClose closeDialog={closeDialog} />

            <ContactDialogTitle dialogState={dialogState} />

            <ContactDialogDescription dialogState={dialogState} />

            <ContactDialogWarning dialogState={dialogState} />

            <ContactDialogInputs
              dialogState={dialogState}
              register={register}
              errors={errors}
            />

            <ContactDialogButtons
              dialogState={dialogState}
              closeDialog={closeDialog}
            />
          </Dialog.Panel>
        </form>
      </div>
    </Dialog>
  )
}
