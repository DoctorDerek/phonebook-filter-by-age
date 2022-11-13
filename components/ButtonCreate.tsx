import { Dispatch, SetStateAction } from "react"

import { DialogState } from "@/components/ContactActionDialog"

export default function ButtonCreate({
  setDialogState,
}: {
  setDialogState: Dispatch<SetStateAction<DialogState>>
}) {
  return (
    <button
      className="rounded-md bg-blue-400 px-6 py-2 text-white hover:bg-blue-500 hover:outline hover:outline-1 hover:outline-blue-400"
      onClick={() => setDialogState({ type: "CREATE" })}
    >
      + Add Contact
    </button>
  )
}
