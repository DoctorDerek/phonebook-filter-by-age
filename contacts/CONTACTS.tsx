export type Contact = {
  photo: string
  name: string
  birthday: Date
  streetAddress: string
  city: string
  state: string
  zipCode: string
  phoneNumber: string
  email: string
  age?: number
}

const CONTACTS: Contact[] = [
  {
    photo: "Unsplash Jessica Christian.png",
    name: "Jessica Christian",
    birthday: new Date("2022-05-30"), // Baby
    streetAddress: "1234 Main St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94111",
    phoneNumber: "555-555-5555",
    email: "Jessica.Christian@fakeEmail.com",
  },
  {
    photo: "Unsplash Lia Bekyan.png",
    name: "Lia Bekyan",
    birthday: new Date("2010-09-24"), // Child
    streetAddress: "1234 Happy Lane",
    city: "San Diego",
    state: "CA",
    zipCode: "91911",
    phoneNumber: "555-555-5555",
    email: "Lia.Bekyan@fakeEmail.com",
  },
  {
    photo: "Unsplash Remy Loz.png",
    name: "Remy Loz",
    birthday: new Date("2000-07-04"), // Young Adult
    streetAddress: "1234 Main St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94111",
    phoneNumber: "555-555-5555",
    email: "Remy.Loz@fakeEmail.com",
  },
  {
    photo: "Unsplash Ryan Hoffman.png",
    name: "Ryan Hoffman",
    birthday: new Date("1990-04-06"), // Middle Aged Adult
    streetAddress: "1234 Main St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94111",
    phoneNumber: "555-555-5555",
    email: "Ryan.Hoffman@fakeEmail.com",
  },
  {
    photo: "Unsplash Tadas Petrokas.png",
    name: "Tadas Petrokas",
    birthday: new Date("1956-08-07"), // Senior
    streetAddress: "1234 Main St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94111",
    phoneNumber: "555-555-5555",
    email: "Tadas.Petrokas@fakeEmail.com",
  },
  {
    photo: "Unsplash Yohan Marion.png",
    name: "Yohan Marion",
    birthday: new Date("1890-11-24"), // Senior
    streetAddress: "1234 Main St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94111",
    phoneNumber: "555-555-5555",
    email: "Yohan.Marion@fakeEmail.com",
  },
]

const calculateAge = ({ birthday }: { birthday: Date }) => {
  const today = new Date()
  const age = today.getFullYear() - birthday.getFullYear()
  // This may not be their age, if their birthday hasn't yet occurred this year.
  const month = today.getMonth() - birthday.getMonth()
  if (month < 0 || (month === 0 && today.getDate() < birthday.getDate())) {
    // They haven't had their birthday yet this year, so their age is one less.
    return age - 1
  }
  return age
}

const CONTACTS_WITH_AGES: Contact[] = CONTACTS.map((contact) => {
  const { birthday } = contact
  const age = calculateAge({ birthday })
  return { ...contact, age }
})

// Let's pre-sort the contacts before we use them, so we'll have a default sort.
const sortByLastName = (a: Contact, b: Contact) => {
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
