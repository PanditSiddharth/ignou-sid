"use client"
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import { create } from 'zustand'

export const useUserStore = create((set) => ({
  loggedIn: [false],
  setUserG: (user) => set((state) =>   {
    const token = getCookie("token")
    if(!user || !token)
      return {loggedIn: [false]};
    else
    return { loggedIn: user }})
}))

export const useLoadingStore = create((set) => ({
  loadingG: false,
  setLoadingG: (loading) => set((state) => ({ loadingG: loading }))
}))

export const useStudentActiveTabStore = create((set) => ({
  activeTab: 0,
  setActiveTab: (tab) => set((state) => ({ activeTab: tab }))
}))

export const useStudentActiveTab = () => {
  const activeTab = useStudentActiveTabStore(state => state.activeTab)
  const setActiveTab = useStudentActiveTabStore(state => state.setActiveTab)

  return [activeTab, setActiveTab]
}

export const useUserG = (loginn) => {
  const loggedIn = useUserStore(state => state.loggedIn)
  const setUserG = useUserStore(state => state.setUserG)
  
  const [login, setLogin] = useState(loginn)

  useEffect(() => { 
    if (!getCookie("token")){
      setLogin(false)
    }
    if (loggedIn && !Array.isArray(loggedIn)) {
      if(typeof loggedIn == "object")
      setLogin(loggedIn)
    }
  }, [loggedIn])

  // console.log(loggedIn)
  return [login, setUserG]
}