import { DialogState } from "@/components/ContactDialog"
import { Contact } from "@/contacts/CONTACTS"
import usePhoneBookService from "@/utils/usePhoneBookService"

/**
 * This is our master form handler that handles all the action types.
 *
 * The `data` are the updated (or new) fields from the form.
 * The `dialogState.type` is the action that we want to take.
 * The `dialogState.contact` is the active (old) contact.
 */
export default function useOnDialogSubmit({
  dialogState,
  contacts,
  closeDialog,
}: {
  dialogState: DialogState
  contacts: Contact[]
  closeDialog: () => void
}) {
  // Retrieve our global context from the XState finite state machine:
  const { send } = usePhoneBookService()

  const onDialogSubmit = (data: Contact) => {
    if (dialogState.type === "CREATE") {
      // We used React Hook Form to make sure we're getting all of the items:
      const { name, phoneNumber } = data
      // We need the max id from the current contacts to avoid hash collisions.
      const maxId = Math.max(...contacts?.map(({ id }) => id))
      send({
        type: "CREATE",
        contact: { id: maxId + 1, name, phoneNumber },
      })
    }

    if (dialogState.type === "UPDATE") {
      /** We unpack the existing contact from the `dialogState`. */
      const oldContact = dialogState?.contact
      // We have values from the form OR the contact for name and phoneNumber.
      const name = data.name || oldContact?.name || ""
      const phoneNumber = data.phoneNumber || oldContact?.phoneNumber || ""
      /** The id should come from the existing entry, but we fall back to -1. */
      const id = oldContact?.id || -1
      // We preserve data we didn't update in the form so we don't overwrite it.
      const {
        birthday,
        age,
        photo,
        streetAddress,
        city,
        state,
        zipCode,
        email,
      } = oldContact || {}

      /** This is the contact that's ready to send to the state machine. */
      const contact = {
        id,
        name,
        phoneNumber,
        birthday,
        age,
        photo,
        streetAddress,
        city,
        state,
        zipCode,
        email,
      }

      send({ type: "UPDATE", contact })
    }

    if (dialogState.type === "DELETE" && dialogState?.contact)
      // We should have the entry from the dialog state, but data will be blank.
      send({ type: "DELETE", contact: dialogState?.contact })

    if (dialogState.type === "RESET") send({ type: "RESET" })

    // Close and reset the dialog once we've finished sending the action.
    closeDialog()
    // We handle flushing the state to `localStorage` in the `useEffect` hook.
  }

  return { onDialogSubmit }
}
