import { XMarkIcon } from "@heroicons/react/24/solid"

/** Helper function to merge Tailwind CSS classNames. */
const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ")

export default function ContactDialogClose({
  closeDialog,
  size = "h-6 w-6",
}: {
  closeDialog: () => void
  /**
   * The default size is used in the `<ContactDialog>`, while the larger size
   * is used in the `<NavBar>` for the mobile navigation menu's close button. */
  size?: "h-6 w-6" | "h-12 w-12"
}) {
  return (
    <button
      onClick={closeDialog}
      className={classNames(
        "group absolute top-2 right-2 rounded-lg hover:outline hover:outline-1 hover:outline-gray-600",
        size
      )}
    >
      <XMarkIcon
        aria-label="Close dialog"
        className="fill-gray-500 group-hover:fill-gray-600"
      />
    </button>
  )
}
