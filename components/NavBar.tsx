import Link from "next/link"

export default function NavBar() {
  return (
    <nav className="flex w-full items-center justify-between bg-black p-6 text-sm uppercase tracking-widest text-white">
      <div className="flex space-x-12">
        <span className="text-base">NavBar</span>
        <Link href="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link href="/" className="text-gray-500 hover:text-gray-300">
          Features
        </Link>
      </div>
    </nav>
  )
}
