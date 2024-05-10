"use client"
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

const ForgotPassword = () => {
  const router = useRouter()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/account')
    }
    // eslint-disable-next-line
  }, [])

  const [email, setEmail] = useState("")

  const sendResetPassEmail = async (e) => {
    e.preventDefault()
    const res = await fetch("/api/forgotPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        sendMail: true,
      }),
    })
    const data = await res.json()
    // console.log(data)
    if (data.success) {
      toast.success("Password reset link sent to your email.", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    } else {
      toast.error(data.error, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }

  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const resetPassword = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      return
    }
    const res = await fetch("/api/forgotPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        password: password,
        sendMail: false,
      }),
    })
    const data = await res.json()
    if (data.success) {
      toast.success("Password reset successfully. Please login into your account!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => {
          router.push("/login")
        }
      })
    } else {
      toast.error(data.error, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }

  return (
    <div className="flex min-h-[52vh] flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* eslint-disable-next-line */}
        <img className="mx-auto h-28 w-auto" src="/decodress-logo-text.png" alt="Decodress" />
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgot Password</h2>
        <p className="mt-2 text-center text-sm text-gray-500">
          Or&nbsp;
          <Link href="/login" className="font-semibold leading-6 text-violet-600 hover:text-violet-500">Login</Link>
        </p>
      </div>

      {!token && <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={sendResetPassEmail} className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
              <input value={email} onChange={(e) => { setEmail(e.target.value) }} id="email" name="email" type="email" autoComplete="email" required className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">Continue</button>
          </div>
        </form>
      </div>}

      {token && <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={resetPassword} className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">New password</label>
            <div className="mt-2">
              <input value={password} onChange={(e) => { setPassword(e.target.value) }} id="password" name="password" type="password" autoComplete="password" required className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm new password</label>
            <div className="mt-2">
              <input value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} id="confirmPassword" name="confirmPassword" type="password" autoComplete="confirmPassword" required className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <button disabled={!password || !confirmPassword} type="submit" className="flex w-full justify-center rounded-md bg-violet-600 disabled:bg-violet-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">Reset password</button>
          </div>
        </form>
      </div>}

      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default ForgotPassword
