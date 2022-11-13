import { Dispatch, SetStateAction } from "react"

import { DialogState } from "@/components/ContactDialog"
import { Contact } from "@/contacts/CONTACTS"
import { TrashIcon } from "@heroicons/react/24/solid"

export default function ButtonDelete({
  contact,
  setDialogState,
}: {
  contact: Contact
  setDialogState: Dispatch<SetStateAction<DialogState>>
}) {
  const { name, phoneNumber } = contact || { name: "", phoneNumber: "" }
  return (
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
  )
}
