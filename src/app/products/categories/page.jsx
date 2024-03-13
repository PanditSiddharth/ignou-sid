"use client"

import { useEffect } from "react"
import { toast } from "react-toastify"

const Categories = () => {
  let setLoadingG = useLoadingStore(state => state.setLoadingG)
  useEffect(() => {
    toast.dismiss()
    setLoadingG(false)
  }, []) 
  return (
    <div>Categories</div>
  )
}

export default Categories