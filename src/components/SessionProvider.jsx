"use client"
import { SessionProvider as SP } from "next-auth/react";

const SessionProvider = ({ children }) => {
  return (
    <SP>{children}</SP>
  )
}

export default SessionProvider