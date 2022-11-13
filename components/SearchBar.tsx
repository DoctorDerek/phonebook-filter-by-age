import { Dispatch, SetStateAction } from "react"

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"

export default function SearchBar({
  setFilterText,
}: {
  setFilterText: Dispatch<SetStateAction<string>>
}) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search for contact by name..."
        className="w-full rounded-md border border-gray-300 pl-6 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
        onChange={(event) => setFilterText(event?.target?.value)}
      />
      <MagnifyingGlassIcon className="absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2" />
    </div>
  )
}
