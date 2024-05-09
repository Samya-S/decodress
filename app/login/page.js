"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

const Login = () => {
  const router = useRouter()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/account')
    }
    // eslint-disable-next-line
  }, [])

  const domain = process.env.NEXT_PUBLIC_DOMAIN

  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userCredentials)
    })

    const data = await response.json()

    if (data.body.success) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', data.body.token);
      }

      // history.pushState({toastMsg: 'You have been logged in successfully'}, 'http://localhost:3000', '/');
      // router.push('/');
      toast.success('You have been logged in successfully', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // onClose: () => router.push('/')
        onClose: () => window.location = domain
      });
    } else {
      toast.error(data.body.error, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* eslint-disable-next-line */}
        <img className="mx-auto h-28 w-auto" src="/decodress-logo-text.png" alt="Decodress" />
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div className="mt-2">
              <input value={userCredentials.email} onChange={handleChange} id="email" name="email" type="email" autoComplete="email" required className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div className="text-sm">
                <Link href="/forgotpassword" className="font-semibold text-violet-600 hover:text-violet-500">Forgot password?</Link>
              </div>
            </div>
            <div className="mt-2">
              <input value={userCredentials.password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">Sign in</button>
          </div>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Do not have an account?&nbsp;
          <Link href="/signup" className="font-semibold leading-6 text-violet-600 hover:text-violet-500">Sign up</Link>
        </p>
      </div>
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

export default Login
