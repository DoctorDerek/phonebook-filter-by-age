import { FieldErrorsImpl, UseFormRegister } from "react-hook-form"

import { DialogState } from "@/components/ContactDialog"
import { Contact } from "@/contacts/CONTACTS"
import classNames from "@/utils/classNames"

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
  errors,
}: {
  label: string
  fieldName: keyof Contact
  dialogState: DialogState
  register: UseFormRegister<Contact>
  errors: Partial<FieldErrorsImpl<Contact>>
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
        className={classNames(
          "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
          errors[fieldName] ? "ring-2 ring-red-500" : ""
        )}
        placeholder={placeholder}
        {...register(fieldName, {
          // Fields are only required when we're creating a new user (contact).
          // When updating a user, blank fields just don't change the field.
          validate: (value) => {
            if (dialogState.type !== "CREATE") return true
            if (fieldName === "email") {
              return (
                (typeof value === "string" && value?.includes("@")) ||
                "Please enter a valid email address."
              )
            }
            if (fieldName === "password") {
              // 8 characters
              if (typeof value === "string" && value?.length < 8)
                return "Please enter a password of at least 8 characters."
              // 1 number
              if (typeof value === "string" && !/\d/.test(value))
                return "Please enter a password with at least one number."
              // 1 symbol
              if (typeof value === "string" && !/[!@#$%^&*]/.test(value))
                return "Please enter a password with at least one symbol."
              return true // Valid password
            }
            // Don't validate other fields, but they are required.
            return Boolean(value) || "All fields are required."
          },
        })}
        disabled={dialogState.type === "DELETE"}
      />
    </div>
  )
}

function ErrorMessage({
  errors,
}: {
  errors: Partial<FieldErrorsImpl<Contact>>
}) {
  const getErrorMessage = () => {
    return (
      errors?.email?.message ||
      errors?.password?.message ||
      errors?.firstName?.message ||
      errors?.lastName?.message ||
      errors?.birthday?.message ||
      errors?.phoneNumber?.message ||
      errors?.streetAddress?.message ||
      errors?.city?.message ||
      errors?.state?.message ||
      errors?.zipCode?.message ||
      "All fields are required."
    )
  }
  return <div className="text-red-500 mt-2">{getErrorMessage()}</div>
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
          errors={errors}
        />
        <ContactDialogInput
          label="Password"
          fieldName="password"
          dialogState={dialogState}
          register={register}
          errors={errors}
        />
        <div className="text-base italic pt-4">
          Note: The password is only to demonstrate password validation. Do not
          use a real password.
        </div>
        {dialogState.type === "CREATE" &&
          // We only show an error message if this slide has errors.
          (errors?.email?.message || errors?.password?.message) && (
            <ErrorMessage errors={errors} />
          )}
      </div>
      <div className="keen-slider__slide">
        <ContactDialogInput
          label="First Name"
          fieldName="firstName"
          dialogState={dialogState}
          register={register}
          errors={errors}
        />
        <ContactDialogInput
          label="Last Name"
          fieldName="lastName"
          dialogState={dialogState}
          register={register}
          errors={errors}
        />
        <ContactDialogInput
          label="Birthday"
          fieldName="birthday"
          dialogState={dialogState}
          register={register}
          errors={errors}
        />
        <ContactDialogInput
          label="Phone Number"
          fieldName="phoneNumber"
          dialogState={dialogState}
          register={register}
          errors={errors}
        />
        Toggle
        <ContactDialogInput
          label="Street Address"
          fieldName="streetAddress"
          dialogState={dialogState}
          register={register}
          errors={errors}
        />
        <ContactDialogInput
          label="City"
          fieldName="city"
          dialogState={dialogState}
          register={register}
          errors={errors}
        />
        <ContactDialogInput
          label="State"
          fieldName="state"
          dialogState={dialogState}
          register={register}
          errors={errors}
        />
        <ContactDialogInput
          label="ZIP Code"
          fieldName="zipCode"
          dialogState={dialogState}
          register={register}
          errors={errors}
        />
        {dialogState.type === "CREATE" &&
          // We only show an error message if this slide has errors.
          (errors?.firstName?.message ||
            errors?.lastName?.message ||
            errors?.birthday?.message ||
            errors?.phoneNumber?.message ||
            errors?.streetAddress?.message ||
            errors?.city?.message ||
            errors?.state?.message ||
            errors?.zipCode?.message) && <ErrorMessage errors={errors} />}
      </div>
      <div className="keen-slider__slide">Security Questions</div>
      <div className="keen-slider__slide">Review and Submit</div>
    </>
  )
}
