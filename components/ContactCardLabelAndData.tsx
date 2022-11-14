import { ReactNode } from "react"

/**
 * We have a consistent layout for the contact's name, birthday, and address. */
export default function ContactCardLabelAndData({
  label,
  data,
}: {
  label: ReactNode
  data: ReactNode
}) {
  return (
    <div className="flex flex-col">
      <span className="text-xs font-semibold tracking-widest text-gray-400">
        {label}
      </span>
      <span className="text-sm font-bold tracking-wide">{data}</span>
    </div>
  )
}
