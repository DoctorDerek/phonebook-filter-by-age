import Image from "next/image"
import { Dispatch, SetStateAction } from "react"

import { DialogState } from "@/components/ContactActionDialog"
import { Contact } from "@/contacts/CONTACTS"
import { PhoneIcon, TrashIcon } from "@heroicons/react/24/solid"

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
  const { name, phoneNumber, photo } = contact
  return (
    <div className="flex w-full items-center justify-between p-3">
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
          <a
            href={`tel:${phoneNumber}`}
            className="group flex items-center justify-center space-x-1 text-sm font-medium"
          >
            <PhoneIcon
              className="h-2.5 w-2.5 fill-gray-400 group-hover:fill-green-400"
              aria-label="Call"
            />
            <span className="text-gray-400 group-hover:text-gray-500">
              {phoneNumber}
            </span>
            <div className="invisible text-xs font-bold text-green-400 group-hover:visible">
              call
            </div>
          </a>
        </h3>
      </div>
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
    </div>
  )
}
