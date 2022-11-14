import { Dispatch, SetStateAction } from "react"

import ContactCard from "@/components/ContactCard"
import { DialogState } from "@/components/ContactDialog"
import { Contact } from "@/contacts/CONTACTS"
import useFilterByAgeRange from "@/utils/useFilterByAgeRange"

export default function ContactList({
  contacts,
  filterText,
  setDialogState,
}: {
  contacts: Contact[]
  filterText: string
  setDialogState: Dispatch<SetStateAction<DialogState>>
}) {
  const { filterByAgeRange } = useFilterByAgeRange({ filterText })
  /**
   * We allow the user to filter by age range. Note that the empty string ""
   * will always return true for the filter function. That is the initial state.
   */
  const filteredPhoneBookEntries = contacts?.filter(filterByAgeRange)

  return (
    <div className="relative w-full space-y-6">
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
