'use client'
import { createContext, useEffect, useState } from 'react'
// import { validateUser }  from '@/app/actions/auth'

const ValidationContext = createContext()

function ValidationProvider({ children }) {
  const [userEnabled, setUserEnabled] = useState(false)
  const [userID, setUserID] = useState('')
  // const getParamHashID = () => {
  //   return window.location.href.split('/?')[1] || null
  // }

  useEffect(() => {
    // const hashID = getParamHashID()
    // validateUser(hashID).then((res) => {
    //   setUserEnabled(res.userSubscribed)
    //   setUserID(res.hashID)
    // })
    setUserEnabled(true)
  }, [])

  return (
    <ValidationContext.Provider value={{ userEnabled, userID }}>
      {children}
    </ValidationContext.Provider>
  )
}

export { ValidationContext, ValidationProvider }
