import Head from "next/head"

import PhoneBookApp from "@/components/PhoneBookApp"

/** Creating routes inside `app/` requires a single file, `page.tsx`: */
export default function Homepage() {
  return (
    <>
      <Head>
        <title>Phonebook &ldquo;Filter by Age&rdquo; App by @DoctorDerek</title>
      </Head>
      <PhoneBookApp />
    </>
  )
}
