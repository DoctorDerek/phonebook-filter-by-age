import { Dispatch, SetStateAction } from "react"

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"

export default function SearchBar({
  setFilterText,
}: {
  setFilterText: Dispatch<SetStateAction<string>>
}) {
  return (
    <label className="relative flex w-full flex-col space-y-1.5">
      <span className="text-xs font-semibold uppercase tracking-widest">
        Age Ranges
      </span>
      <input
        type="text"
        placeholder="TYPE TO SEARCH"
        className="w-full bg-gray-200 p-4 tracking-widest placeholder:text-xs placeholder:font-medium placeholder:text-gray-500"
        onChange={(event) => setFilterText(event?.target?.value)}
      />
    </label>
  )
}
