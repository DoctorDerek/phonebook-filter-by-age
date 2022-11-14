import { FieldErrorsImpl, UseFormRegister } from "react-hook-form"

import { DialogState } from "@/components/ContactDialog"
import { Contact } from "@/contacts/CONTACTS"

/**
 * We have a helper for inputs (contact's `fieldName`).
 *
 * Note that we don't try to validate a phone number,
 * because formats for telephone numbers vary so much
 * around the world. For example, many validations for
 * telephone numbers will reject any country code, such
 * as +1 for United States, even though that is wrong.
 * */
function ContactDialogInput({
  label,
  fieldName,
  dialogState,
  register,
}: {
  label: string
  fieldName: keyof Contact
  dialogState: DialogState
  register: UseFormRegister<Contact>
}) {
  /** We check for undefined and then coerce to a string. */
  const placeholder = String(dialogState.contact?.[fieldName] || "")
  return (
    <label className="flex space-x-1 text-sm text-gray-700">
      <span>{label}</span>
      <input
        type="text"
        placeholder={placeholder}
        {...register(fieldName, {
          required: dialogState.type === "CREATE",
        })}
        className="w-full rounded-md border border-gray-300  pl-1 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
        disabled={dialogState.type === "DELETE"}
      />
    </label>
  )
}

/** This is the "interior" of the form, where the user inputs data. */
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
            <ContactDialogInput
              label="Name"
              fieldName="name"
              dialogState={dialogState}
              register={register}
            />
            <ContactDialogInput
              label="Phone Number"
              fieldName="phoneNumber"
              dialogState={dialogState}
              register={register}
            />
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
