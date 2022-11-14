import Image from "next/image"
import { Dispatch, SetStateAction } from "react"

import ButtonDelete from "@/components/ButtonDelete"
import ContactCardName from "@/components/ContactCardName"
import { DialogState } from "@/components/ContactDialog"
import { Contact } from "@/contacts/CONTACTS"

/**
 * We have to specify the `sizes` prop when using `next/image` with `fill`.
 * These screen sizes correspond to Tailwind's sm: and xl: breakpoints.
 * The image sizes correspond to Tailwind's w-20 class, which is 5rem. */
export const IMAGE_SIZES =
  "(max-width: 640px) 5rem, (max-width: 1280px) 5rem, 5rem"

/**
 * The photo floats to the left of a bold heading above smaller text for city. */
export default function ContactCardPhotoAndHeading({
  contact,
  setDialogState,
}: {
  contact: Contact
  setDialogState: Dispatch<SetStateAction<DialogState>>
}) {
  const { name, photo } = contact || { name: "", photo: "" }
  return (
    <div className="flex items-center justify-center space-x-4">
      <div className="relative h-20 w-20 flex-shrink-0">
        {/** We don't want to shrink and distort the image. */}
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
      <ButtonDelete contact={contact} setDialogState={setDialogState} />
    </div>
  )
}
