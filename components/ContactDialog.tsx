"use client" // Specify this is a Client Component, not a Server Component.

import { Dispatch, SetStateAction, useContext } from "react"
import { useForm } from "react-hook-form"

import ContactDialogButtons from "@/components/ContactDialogButtons"
import ContactDialogClose from "@/components/ContactDialogClose"
import ContactDialogDescription from "@/components/ContactDialogDescription"
import ContactDialogInputs from "@/components/ContactDialogInputs"
import ContactDialogTitle from "@/components/ContactDialogTitle"
import ContactDialogWarning from "@/components/ContactDialogWarning"
import { Contact } from "@/contacts/CONTACTS"
import useOnDialogSubmit from "@/utils/useOnDialogSubmit"
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

  const { onDialogSubmit } = useOnDialogSubmit({
    dialogState,
    contacts,
    closeDialog,
  })

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
        <form onSubmit={handleSubmit(onDialogSubmit)}>
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
