[![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=phonebook-doctorderek)](https://phonebook-app.vercel.app/) [![Build Status](https://app.travis-ci.com/DoctorDerek/phonebook-app.svg?token=TMyceqi9yYWX3rDHdqVD&branch=main)](https://app.travis-ci.com/DoctorDerek/phonebook-app)

# ☎️ Phonebook App - Next.js 13 + React 18 + Tailwind CSS + XState + CRUD Operations

# 👀 View Production Build at https://phonebook-doctorderek.vercel.app/

This is a simple phonebook app that supports CRUD operations (create, read, update, delete).

The app provides a form where you can enter in first name, last name, and phone number for each phonebook entry.

Below you will find the complete feature set, a discussion section, and my technical journal.

## Required Technologies

1. ✅ TypeScript
2. ✅ React
3. ✅ React Context
4. ❌ React Query
   - ✅ XState state machines used instead
5. ❌ Material UI
   - ✅ Tailwind CSS used instead
6. ❌ Apollo GraphQL
   - ✅ XState with TypeScript used instead
7. ❌ Database of your choice
   - ✅ `localStorage` used instead
8. ❌ Docker Compose
   - ✅ Next.js + Vercel used instead

## Feature List

### ✅ === DONE

### 🌠 === TODO

1. ✅ Used Next.js version 13.0.0 with React 18.2.0 and Tailwind CSS 3.2.1.
1. ✅ Deployed production build of Next.js to Vercel with CI/CD.
1. ✅ Established engineering best practices:
   - Prettier, ESLint, Husky (Git Hooks), `tsconfig.json`, TypeScript Import Sorter, XState
1. ✅ Implemented XState finite state machine to handle application state.
1. ✅ Matched design document with READ and search by last name functionality.
1. ✅ Built accessible dialog (modal) using Headless UI and Tailwind CSS.
1. ✅ Added various tooltips that appear on hover to improve user experience.
1. ✅ Enabled CREATE, UPDATE, DELETE, and RESET actions using React Hook Form.
1. ✅ Sorted data by last name for a consistent user experience in the app.
1. 🌠 Add unit test coverage for entire app with Jest & React Testing Library.

## Discussion Section

1. XState takes the place of React Query in the app. The benefit of XState is the finite set of states, without additional testing.
2. It would be easy to connect any database without affecting the frontend by simplying replacing the `localStorage` calls in XState.
3. The app isn't particularly well-suited to GraphQL given the CRUD model, simplistic data objects, and extremely small data size.
4. We don't handle phone validation at all, but we would probably want some type of validation in production, as long as it's reliable.
5. The entire codebase could use extensive refactoring, since everything is simply built in the homepage (`@/pages/index.tsx`).
6. The app is difficult to test with React Testing Library without refactoring, because everything is closely coupled with XState.
7. Docker is unnecessary for this project, and I find it almost always reduces the performance of Next.js vs. deploying at Vercel.
8. Material UI has some benefits, but it can be hard to customize unless the designer uses it, while Tailwind is very easy to use.
   - See [https://github.com/DoctorDerek/calendar-appointments](https://github.com/DoctorDerek/calendar-appointments) for an example from my portfolio using Material UI in depth.
9. Like with many projects, the design document left out certain features: RESET, dialogs (modals), hover styles, and animations.
10. Because of the combination of `localStorage` with XState, we have auto-save functionality that supports refreshing the page.

## Technical Journal

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
