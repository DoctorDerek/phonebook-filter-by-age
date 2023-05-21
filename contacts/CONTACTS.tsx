/** All fields are optional for a Contact, except for the name and unique ID. */
export type Contact = {
  /** Uniqueness of the ID is enforced by the XState finite state machine. */
  id: number
  /** We don't separate first and last names, but we do require a name. */
  name: string
  /** Birthdays are initialized using the syntax `new Date("1990-01-01")`. */
  birthday?: string
  /** The contact's age is calculated from their birthday automatically. */
  age?: number
  /** The contact's photo, a filename in the `@/public/contacts/` directory. */
  photo?: string
  streetAddress?: string
  city?: string
  state?: string
  zipCode?: string
  phoneNumber?: string
  email?: string
  password?: string
}

/**
 * Our mock data is used to initialize the XState finite state machine and
 * contains all fields for each contact, except age, which will be calculated. */
const CONTACTS: Contact[] = [
  {
    id: 1,
    photo: "Unsplash Jessica Christian.png",
    name: "Jessica Christian",
    birthday: "2022-05-30", // Baby
    streetAddress: "1234 Main St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94111",
    phoneNumber: "555-555-5555",
    email: "Jessica.Christian@fakeEmail.com",
  },
  {
    id: 2,
    photo: "Unsplash Lia Bekyan.png",
    name: "Lia Bekyan",
    birthday: "2010-09-24", // Child
    streetAddress: "1234 Happy Lane",
    city: "San Diego",
    state: "CA",
    zipCode: "91911",
    phoneNumber: "555-555-5555",
    email: "Lia.Bekyan@fakeEmail.com",
  },
  {
    id: 3,
    photo: "Unsplash Remy Loz.png",
    name: "Remy Loz",
    birthday: "2000-07-04", // Young Adult
    streetAddress: "1234 Main St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94111",
    phoneNumber: "555-555-5555",
    email: "Remy.Loz@fakeEmail.com",
  },
  {
    id: 4,
    photo: "Unsplash Ryan Hoffman.png",
    name: "Ryan Hoffman",
    birthday: "1990-04-06", // Middle Aged Adult
    streetAddress: "1234 Main St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94111",
    phoneNumber: "555-555-5555",
    email: "Ryan.Hoffman@fakeEmail.com",
  },
  {
    id: 5,
    photo: "Unsplash Tadas Petrokas.png",
    name: "Tadas Petrokas",
    birthday: "1956-08-07", // Senior
    streetAddress: "1234 Main St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94111",
    phoneNumber: "555-555-5555",
    email: "Tadas.Petrokas@fakeEmail.com",
  },
  {
    id: 6,
    photo: "Unsplash Yohan Marion.png",
    name: "Yohan Marion",
    birthday: "1890-11-24", // Senior
    streetAddress: "1234 Main St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94111",
    phoneNumber: "555-555-5555",
    email: "Yohan.Marion@fakeEmail.com",
  },
]

export const calculateAge = ({ birthday }: { birthday?: string }) => {
  if (!birthday) return undefined // We can't calculate age without a birthday.
  const today = new Date()
  const birthDate = new Date(birthday)
  const age = today.getFullYear() - birthDate.getFullYear()
  // This may not be their age, if their birthday hasn't yet occurred this year.
  const month = today.getMonth() - birthDate.getMonth()
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    // They haven't had their birthday yet this year, so their age is one less.
    return age - 1
  }
  return age
}

/** We flesh out the mock data by calculating the age for each contact. */
const CONTACTS_WITH_AGES: Contact[] = CONTACTS.map((contact) => {
  const { birthday } = contact
  const age = calculateAge({ birthday })
  return { ...contact, age }
})

// Let's pre-sort the contacts before we use them, so we'll have a default sort.
export const sortByLastName = (a: Contact, b: Contact) => {
  // We're going to assume that the last name is the last word in the name, but
  // that may be incorrect, especially with many Asian or Hispanic names.
  const aName = a?.name || ""
  const bName = b?.name || ""
  // We .pop() to get the last word in the name, and then we use .toLowerCase():
  const aLastName = aName.split(" ").pop()?.toLocaleLowerCase() || ""
  const bLastName = bName.split(" ").pop()?.toLocaleLowerCase() || ""
  return aLastName.localeCompare(bLastName)
}

// We mutate the CONTACTS_WITH_AGES array to sort it by last name before export.
CONTACTS_WITH_AGES.sort(sortByLastName)

export default CONTACTS_WITH_AGES
