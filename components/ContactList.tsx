import { Dispatch, SetStateAction } from "react"

import { DialogState } from "@/components/ContactActionDialog"
import ContactCard from "@/components/ContactCard"
import { Contact } from "@/contacts/CONTACTS"

export default function ContactList({
  contacts,
  filterText,
  setDialogState,
}: {
  contacts: Contact[]
  filterText: string
  setDialogState: Dispatch<SetStateAction<DialogState>>
}) {
  /**
   * We allow the user to filter by name. Note that the empty string "" will
   * always return true for the regular expression, which is the initial state.
   */
  const filteredPhoneBookEntries = contacts?.filter(
    ({ name }) => new RegExp(filterText, "i").exec(name)
    // The "i" flag means we use a case-insensitive search.
  )

  return (
    <div className="divide-y-gray-300 relative w-full divide-y-2 border border-solid border-gray-300">
      {filteredPhoneBookEntries?.map((contact) => {
        const { id, name, phoneNumber, photo } = contact
        // ID should be unique, but there's no penalty for adding to key.
        const key = `${id}${name}${phoneNumber}${photo}`
        return (
          <ContactCard
            key={key}
            contact={contact}
            setDialogState={setDialogState}
          />
        )
      })}
    </div>
  )
}
