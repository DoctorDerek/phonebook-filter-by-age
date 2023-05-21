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
    <div className="relative mt-4">
      <label
        htmlFor={fieldName}
        className="absolute -top-3 left-3 inline-block bg-white px-1 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type={fieldName === "password" ? "password" : "text"}
        id={fieldName}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder={placeholder}
        {...register(fieldName, {
          required: dialogState.type === "CREATE",
        })}
        disabled={dialogState.type === "DELETE"}
      />
    </div>
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
  if (dialogState.type === "RESET") return null

  return (
    <>
      <div className="keen-slider__slide">
        <ContactDialogInput
          label="Email Address"
          fieldName="email"
          dialogState={dialogState}
          register={register}
        />
        <ContactDialogInput
          label="Password"
          fieldName="password"
          dialogState={dialogState}
          register={register}
        />
        <div className="text-base italic pt-4">
          Note: The password is only to demonstrate password validation. Do not
          use a real password.
        </div>
      </div>
      <div className="keen-slider__slide">
        <ContactDialogInput
          label="Name"
          fieldName="name"
          dialogState={dialogState}
          register={register}
        />
        <ContactDialogInput
          label="Birthday"
          fieldName="birthday"
          dialogState={dialogState}
          register={register}
        />
        <ContactDialogInput
          label="Phone Number"
          fieldName="phoneNumber"
          dialogState={dialogState}
          register={register}
        />
        Toggle
        <ContactDialogInput
          label="Street Address"
          fieldName="streetAddress"
          dialogState={dialogState}
          register={register}
        />
        <ContactDialogInput
          label="City"
          fieldName="city"
          dialogState={dialogState}
          register={register}
        />
        <ContactDialogInput
          label="State"
          fieldName="state"
          dialogState={dialogState}
          register={register}
        />
        <ContactDialogInput
          label="ZIP Code"
          fieldName="zipCode"
          dialogState={dialogState}
          register={register}
        />
      </div>
      <div className="keen-slider__slide">Security Questions</div>
      <div className="keen-slider__slide">Review and Submit</div>
      {dialogState.type === "CREATE" &&
        (errors.name ||
          errors.birthday ||
          errors.streetAddress ||
          errors.city ||
          errors.state ||
          errors.zipCode ||
          errors.phoneNumber ||
          errors.email) && <div>All fields are required.</div>}
    </>
  )
}
