"use client"

import { persistor, store } from "./store"
import React, { ReactNode } from "react"
import { PersistGate } from 'redux-persist/integration/react'

function ReduxPersistGate({ children }: React.PropsWithChildren) {
  return <PersistGate loading={null} persistor={persistor}>{children}</PersistGate>
}

export default ReduxPersistGate