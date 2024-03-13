"use client"
import { useLoadingStore } from '@/store'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

const Courses = () => {
  const setLoadingG = useLoadingStore(state => state.setLoadingG)
  useEffect(() => {
    toast.dismiss()
    setLoadingG(false) 
  }, [])
  return (
    <div>Courses</div>
  )
}

export default Courses