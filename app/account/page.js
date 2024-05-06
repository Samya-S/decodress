"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const MyAccount = () => {
  const router = useRouter()
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login')
    }
    // eslint-disable-next-line
  }, [])
  return (
    <div>
      My account
    </div>
  )
}

export default MyAccount
