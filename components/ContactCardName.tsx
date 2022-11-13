import { Dispatch, SetStateAction } from "react"

import ContactCardPhoneNumber from "@/components/ContactCardPhoneNumber"
import { DialogState } from "@/components/ContactDialog"
import { Contact } from "@/contacts/CONTACTS"

/** The `<ContactCardName>` includes the `edit` button to UPDATE the contact. */
export default function ContactCardName({
  contact,
  setDialogState,
}: {
  contact: Contact
  setDialogState: Dispatch<SetStateAction<DialogState>>
}) {
  const { name, phoneNumber } = contact || { name: "", phoneNumber: "" }
  return (
    <h3 className="flex flex-col items-start justify-center">
      <button
        className="group flex items-center justify-center text-2xl font-semibold"
        onClick={() => setDialogState({ type: "UPDATE", contact })}
      >
        {name}
        <div className="invisible pl-1 text-sm text-gray-400 group-hover:visible">
          edit
        </div>
      </button>
      <ContactCardPhoneNumber phoneNumber={phoneNumber || ""} />
    </h3>
  )
}
