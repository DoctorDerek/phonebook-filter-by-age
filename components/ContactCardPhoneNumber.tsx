import { PhoneIcon } from "@heroicons/react/24/solid"

/** We return the `phoneNumber` as a clickable `tel:` link. */
export default function ContactCardPhoneNumber({
  phoneNumber,
}: {
  phoneNumber: string
}) {
  return (
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
  )
}
