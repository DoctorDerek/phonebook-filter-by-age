import { FieldErrorsImpl, UseFormRegister } from "react-hook-form"

import { DialogState } from "@/components/ContactDialog"
import { Contact } from "@/contacts/CONTACTS"

export default function ContactDialogButtons({
  dialogState,
  closeDialog,
}: {
  dialogState: DialogState
  closeDialog: () => void
}) {
  return (
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
  )
}
