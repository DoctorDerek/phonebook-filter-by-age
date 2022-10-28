// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true
  internalEvents: {
    "xstate.init": { type: "xstate.init" }
  }
  invokeSrcNameMap: {}
  missingImplementations: {
    actions: never
    services: never
    guards: never
    delays: never
  }
  eventsCausingActions: {
    createPhoneBookEntry: "CREATE"
    deletePhoneBookEntry: "DELETE"
    readPhoneBookFromLocalStorage: "READ"
    updatePhoneBookEntry: "UPDATE"
    writePhoneBookToLocalStorage: "FINISH"
  }
  eventsCausingServices: {}
  eventsCausingGuards: {}
  eventsCausingDelays: {}
  matchesStates: "idle" | "ready" | "running"
  tags: never
}
