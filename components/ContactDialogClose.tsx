import { XMarkIcon } from "@heroicons/react/24/solid"

export default function ContactDialogClose({
  closeDialog,
}: {
  closeDialog: () => void
}) {
  return (
    <button
      onClick={closeDialog}
      className="group absolute top-2 right-2 h-6 w-6 rounded-lg hover:outline hover:outline-1 hover:outline-gray-600"
    >
      <XMarkIcon
        aria-label="Close dialog"
        className="fill-gray-500 group-hover:fill-gray-600"
      />
    </button>
  )
}
