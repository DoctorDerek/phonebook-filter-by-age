import Image from "next/image"
import { Dispatch, SetStateAction } from "react"

import ButtonDelete from "@/components/ButtonDelete"
import ContactCardName from "@/components/ContactCardName"
import { DialogState } from "@/components/ContactDialog"
import { Contact } from "@/contacts/CONTACTS"

/**
 * We have to specify the `sizes` prop when using `next/image` with `fill`.
 * These screen sizes correspond to Tailwind's sm: and xl: breakpoints.
 * The image sizes correspond to Tailwind's w-16 class, which is 4rem. */
const IMAGE_SIZES = "(max-width: 640px) 4rem, (max-width: 1280px) 4rem, 4rem"

export default function ContactCard({
  contact,
  setDialogState,
}: {
  contact: Contact
  setDialogState: Dispatch<SetStateAction<DialogState>>
}) {
  const {
    photo,
    name,
    birthday,
    streetAddress,
    city,
    state,
    zipCode,
    phoneNumber,
    email,
  } = contact
  return (
    <div className="flex w-full items-center justify-between p-3 uppercase">
      {/** The entire `<ContactCard>` component uses UPPERCASE text. */}
      <div className="flex items-center justify-center space-x-2">
        <div className="relative h-16 w-16">
          {photo && ( // Only show the photo if there's a `photo` URL.
            <Image
              src={`/contacts/${photo}`}
              alt={name} // Screen readers announce "Image of {name}"
              fill
              className="object-fit rounded-full"
              sizes={IMAGE_SIZES}
            />
          )}
        </div>
        <ContactCardName contact={contact} setDialogState={setDialogState} />
      </div>
      <ButtonDelete contact={contact} setDialogState={setDialogState} />
    </div>
  )
}
