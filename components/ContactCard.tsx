import { Dispatch, SetStateAction } from "react"

import ContactCardLabelAndData from "@/components/ContactCardLabelAndData"
import ContactCardPhoneNumber from "@/components/ContactCardPhoneNumber"
import ContactCardPhotoAndHeading from "@/components/ContactCardPhotoAndHeading"
import { DialogState } from "@/components/ContactDialog"
import { Contact } from "@/contacts/CONTACTS"

function Address({ contact }: { contact: Contact }) {
  const { streetAddress, city, state, zipCode } = contact || {
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
  }

  return (
    <div className="flex flex-col">
      <span>{streetAddress}</span>
      <span>
        {city}, {state}
      </span>
      <span>{zipCode}</span>
    </div>
  )
}

/**
 * The photo floats left of a heading with the contact's name above their city.
 * The contact's birthday, address, phone number, and email address follow.
 *
 * Design: https://www.figma.com/file/bgqegwF2VfeZ6qlJZ0FLVB/Exercise
 * */
export default function ContactCard({
  contact,
  setDialogState,
}: {
  contact: Contact
  setDialogState: Dispatch<SetStateAction<DialogState>>
}) {
  const { birthday, phoneNumber, email } = contact
  return (
    <div className="flex w-full flex-col items-start justify-between border border-solid border-gray-200 p-3 uppercase shadow-lg filter xl:space-y-8 xl:p-8">
      {/** The entire `<ContactCard>` component uses UPPERCASE text. */}
      <ContactCardPhotoAndHeading
        contact={contact}
        setDialogState={setDialogState}
      />
      <div className="grid w-full grid-cols-1 xl:grid-cols-4">
        <ContactCardLabelAndData label="Birthday" data={birthday} />
        <ContactCardLabelAndData
          label="Address"
          data={<Address contact={contact} />}
        />
        <ContactCardLabelAndData
          label="Phone Number"
          data={<ContactCardPhoneNumber phoneNumber={phoneNumber || ""} />}
        />
        <ContactCardLabelAndData label="Email Address" data={email} />
      </div>
    </div>
  )
}
