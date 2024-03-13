"use client"

import { useLoadingStore } from "@/store"
import { useEffect } from "react"
import { toast } from "react-toastify"

const Contact = () => {
  const setLoadingG = useLoadingStore(state => state.setLoadingG)
  useEffect(() => {
    toast.dismiss()
    setLoadingG(false)  
  }, [])

  return (
    <div>Contact</div>
  )
}

export default Contact