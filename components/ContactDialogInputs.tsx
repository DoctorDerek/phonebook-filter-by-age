import { FieldErrorsImpl, UseFormRegister } from "react-hook-form"

import { DialogState } from "@/components/ContactDialog"
import { Contact } from "@/contacts/CONTACTS"

export default function ContactDialogInputs({
  dialogState,
  register,
  errors,
}: {
  dialogState: DialogState
  register: UseFormRegister<Contact>
  errors: Partial<FieldErrorsImpl<Contact>>
}) {
  return (
    <>
      {dialogState.type !== "RESET" && (
        <>
          <div className="space-y-1 whitespace-nowrap">
            <label className="flex space-x-1 text-sm text-gray-700">
              <span>Name</span>
              <input
                type="text"
                placeholder={dialogState.contact?.name}
                {...register("name", {
                  required: dialogState.type === "CREATE",
                })}
                className="w-full rounded-md border border-gray-300  pl-1 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                disabled={dialogState.type === "DELETE"}
              />
            </label>
            <label className="flex space-x-1 text-sm text-gray-700">
              <span>Phone Number</span>
              <input
                type="tel"
                placeholder={dialogState.contact?.phoneNumber}
                {...register("phoneNumber", {
                  required: dialogState.type === "CREATE",
                })}
                /**
                 * Note that we don't try to validate the phone number,
                 * because formats for telephone numbers vary so much
                 * around the world. For example, many validations for
                 * telephone numbers will reject any country code, such
                 * as +1 for United States, even though that is wrong.
                 * */
                className="w-full rounded-md border border-gray-300 pl-1 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                disabled={dialogState.type === "DELETE"}
              />
            </label>
            {dialogState.type === "CREATE" &&
              (errors.name || errors.phoneNumber) && (
                <div>All fields are required.</div>
              )}
          </div>
        </>
      )}
    </>
  )
}
