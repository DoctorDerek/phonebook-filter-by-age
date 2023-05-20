[![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=phonebook-filter-by-age)](https://phonebook-filter-by-age.vercel.app/) [![codecov](https://codecov.io/gh/DoctorDerek/phonebook-filter-by-age/branch/main/graph/badge.svg?token=7VDUW7TGZN)](https://codecov.io/gh/DoctorDerek/phonebook-filter-by-age) ![GitHub Actions Build Status - CI Workflow](https://github.com/DoctorDerek/phonebook-filter-by-age/actions/workflows/ci.yml/badge.svg)


# ☎️ Phonebook "Filter by Age" App - Next.js 13 + React 18 + Tailwind CSS + XState + CRUD Operations

# 👀 View Production Build at https://phonebook-filter-by-age.vercel.app/

This is a simple phonebook app that supports CRUD operations (create, read, update, delete) and "filter by age" functionality.

The app provides a form where you can enter a name, birthday, mailing address,phone number, and email for each phonebook entry.

Below you will find the complete feature set, a discussion section, and my technical journal.

## Tech Stack

1. ✅ Next.js 13
1. ✅ React 18
1. ✅ Tailwind CSS
1. ✅ TypeScript
1. ✅ XState finite state machines
1. ✅ `localStorage` used as database
1. ✅ Vercel for deployment
1. ✅ TravisCI for CI/CD
1. ✅ Jest + React Testing Library
1. ✅ ESLint + Prettier + Husky Git Hooks

## Feature List

1. ✅ Used Next.js version 13.0.3 with React 18.2.0 and Tailwind CSS 3.2.4.
1. ✅ Deployed Next.js production build to Vercel with CI/CD at Travis CI.
1. ✅ Established engineering best practices:
   - Prettier, ESLint, Husky (Git Hooks), `tsconfig.json`, TypeScript Import Sorter, XState
1. ✅ Implemented XState finite state machine to handle application state.
1. ✅ Built accessible dialog (modal) using Headless UI and Tailwind CSS.
1. ✅ Added various tooltips that appear on hover to improve user experience.
1. ✅ Enabled CREATE, UPDATE, DELETE, and RESET actions using React Hook Form.
1. ✅ Sorted data by last name for a consistent user experience in the app.
1. ✅ Matched design document with READ and filter by age range functionality.
1. ✅ Add some unit testing for the app with Jest & React Testing Library.

## Discussion Section

1. ✅ We use XState finite state machines. The benefit of XState is the finite set of states, without the need for additional testing.
2. ✅ It would be easy to connect any database without affecting the frontend by simplying replacing the `localStorage` calls in XState.
3. ✅ We don't handle phone or email validation at all, but we would probably want some type of reliable validation in production.
4. ✅ The entire codebase could use more testing, which is made easier by the large number of small, easily-testable components.
5. ✅ Like with many projects, the design document left out certain features: RESET, dialogs (modals), hover styles, and animations.
6. ✅ Because of the combination of `localStorage` with XState, we have auto-save functionality that supports refreshing the page.
7. ✅ Since the only major touch screen interaction difference is swiping, we shouldn't have much differences with desktop vs. mobile.
8. ✅ Accessibility has been baked into the app, but we might find some issues when writing tests or using the app with the keyboard.
9. ✅ I implemented 3 breakpoints: phone portrait (<640px), tablet or phone landscape (>=640px <1280px), and desktop (>1280px).
10. ✅ There are numerous improvements that could still be made to the user experience, such as a hover effect to show the contact's age.

## Test Coverage Report - Jest & React Testing Library

### `yarn test`

Launches the test runner and generates code coverage report.

### `yarn test:watch`

Launches the test runner in the interactive watch mode.

## Technical Journal

#### 🧠 Features up to `1.0.0` are the "filter by name" app

- 🔽 https://github.com/DoctorDerek/phonebook-app
- `0.1.1` New app: create next-app w/TypeScript + Yarn 3
- `0.2.0` Added all best practices & basic dependencies
- `0.3.0` Create XState finite state machine for app
- `0.4.0` Add initial (default) values and RESET action
- `0.5.0` Implement design of app from design document
- `0.6.0` Build out the search filter and DELETE action
- `0.7.0` Make the dialog (modal) to handle CRUD actions
- `0.8.0` Use React Hook Form to handle dialog actions
- `0.9.0` Enable CREATE, UPDATE, DELETE, RESET actions
- `0.9.1` Finish the discussion section in the `README.md`
- `1.0.0` Upload photos and migrate to Next 13's `@/app`

#### 🧠 Features after this point are the "filter by age" app

- 🔽 https://github.com/DoctorDerek/phonebook-filter-by-age
- `1.1.0` Refactor 15 components & fix photo deletion bug
- `1.2.0` Extract `<ContactCard>` components and TDD test
- `1.3.0` Match `<ContactCard>` to design & pass tests
- `1.4.0` Implement accessible mobile navigation menu
- `1.5.0` Align the mobile design with design document
- `1.6.0` Enact the "filter by age" logic and dropdown
- `1.7.0` Fix the CREATE & UPDATE actions with new fields
- `1.8.0` Invent a 2-column design for tablet screens
