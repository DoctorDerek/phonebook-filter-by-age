import Link from "next/link"

import { DevicePhoneMobileIcon } from "@heroicons/react/24/solid"

export default function NavBar() {
  return (
    <nav className="flex w-full items-center justify-between bg-black p-6 text-xs uppercase tracking-widest text-white">
      <div className="flex items-center space-x-12">
        <span className="text-base">NavBar</span>
        <Link href="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link href="/" className="text-gray-500 hover:text-gray-300">
          Features
        </Link>
      </div>
      <div className="group flex items-center justify-center space-x-2">
        <DevicePhoneMobileIcon className="h-10 w-10 group-hover:animate-spin" />
        <span className="text-2xl font-semibold">Phone Book App</span>
      </div>
    </nav>
  )
}
