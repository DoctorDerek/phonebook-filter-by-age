/** Helper function to merge Tailwind CSS classNames. */
export default function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}
