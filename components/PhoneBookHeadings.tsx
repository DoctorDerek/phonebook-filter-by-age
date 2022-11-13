import { Dispatch, SetStateAction } from "react"

import ButtonCreate from "@/components/ButtonCreate"
import ButtonReset from "@/components/ButtonReset"
import { DialogState } from "@/components/ContactActionDialog"
import { DevicePhoneMobileIcon } from "@heroicons/react/24/solid"

export default function PhoneBookHeadings({
  setDialogState,
}: {
  setDialogState: Dispatch<SetStateAction<DialogState>>
}) {
  return (
    <>
      <div className="group flex items-center justify-center space-x-2 text-4xl font-semibold">
        <DevicePhoneMobileIcon className="h-10 w-10 group-hover:animate-spin" />
        <h1>Phone Book App</h1>
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-center space-x-2">
          <h2 className="text-2xl font-semibold">Contacts</h2>
          <ButtonReset setDialogState={setDialogState} />
        </div>
        <ButtonCreate setDialogState={setDialogState} />
      </div>
    </>
  )
}
