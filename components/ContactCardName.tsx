import { Dispatch, SetStateAction } from "react"

import { DialogState } from "@/components/ContactDialog"
import { Contact } from "@/contacts/CONTACTS"

/** This component includes the `edit` button to UPDATE the contact. */
export default function ContactCardNameAndCity({
  contact,
  setDialogState,
}: {
  contact: Contact
  setDialogState: Dispatch<SetStateAction<DialogState>>
}) {
  const { name, city } = contact || { name: "", city: "" }
  return (
    <h3 className="flex flex-col items-start justify-center">
      <button
        className="group flex items-center justify-center text-left text-2xl font-semibold uppercase leading-7 tracking-widest"
        // We have to reapply the UPPERCASE style here because it's overridden.
        onClick={() => setDialogState({ type: "UPDATE", contact })}
      >
        {name}
        <div className="invisible pl-1 text-sm lowercase tracking-normal text-gray-400 group-hover:visible">
          edit
        </div>
      </button>
      <span className="text-xs font-semibold tracking-wider text-gray-400">
        {city}
      </span>
    </h3>
  )
}
