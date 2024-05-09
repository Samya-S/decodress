"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

const MyAccount = () => {
  const router = useRouter()
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login')
    }

    // get user details
    fetch(`/api/getUserDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token')
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setAccountDetails({ ...accountDetails, name: data.user.name, email: data.user.email, phone: data.user.phone, address: data.user.address, pincode: data.user.pincode })
        }
      })
    // eslint-disable-next-line
  }, [])

  const [accountDetails, setAccountDetails] = useState({ name: '', email: '', phone: '', address: '', pincode: '', city: '', state: '' })

  const handleAccountDetailsChange = (e) => {
    setAccountDetails({ ...accountDetails, [e.target.name]: e.target.value })
  }

  const getLocationDetailsFromPincode = () => {
    if (accountDetails.pincode.length === 6) {
      fetch(`/api/pincode/`)
        .then(response => response.json())
        .then(data => {
          if (Object.keys(data).includes(accountDetails.pincode)) {
            setAccountDetails({ ...accountDetails, city: data[accountDetails.pincode][0], state: data[accountDetails.pincode][1] })
          }
        })
    }
    else {
      setAccountDetails({ ...accountDetails, city: '', state: '' })
    }
  }

  useEffect(() => {
    getLocationDetailsFromPincode()
    // eslint-disable-next-line
  }, [accountDetails.pincode])

  const handleUpdateAccountDetails = (e) => {
    e.preventDefault()
    fetch(`/api/updateUserDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        name: accountDetails.name,
        email: accountDetails.email,
        phone: accountDetails.phone,
        address: accountDetails.address,
        pincode: accountDetails.pincode,
        city: accountDetails.city,
        state: accountDetails.state
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          toast.success('Delivery details updated successfully', {
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
        else {
          toast.error(data.message, {
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
      })
  }

  const [accountPassword, setAccountPassword] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' })

  const handlePasswordChange = (e) => {
    setAccountPassword({ ...accountPassword, [e.target.name]: e.target.value })
  }

  const handleUpdatePassword = (e) => {
    e.preventDefault()
    if (accountPassword.newPassword === accountPassword.confirmPassword) {
      fetch(`/api/updatePassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: localStorage.getItem('token'),
          oldPassword: accountPassword.oldPassword,
          newPassword: accountPassword.newPassword
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            toast.success('Password updated successfully', {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
            setAccountPassword({ oldPassword: '', newPassword: '', confirmPassword: '' })
          }
          else {
            toast.error(data.message, {
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
        })
    }
    else {
      toast.error('New password and confirm new password should match!', {
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
    <div className='container mx-auto'>
      <p className='font-bold text-2xl md:text-3xl my-8 text-center'>Update your account</p>
      <h2 className="font-semibold text-xl mx-4">1. Delivery details</h2>
      <form onSubmit={handleUpdateAccountDetails} className='my-4'>
        <div className="m-4">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
          <input type="text" id="name" name="name" value={accountDetails.name} onChange={handleAccountDetailsChange} className="w-full bg-white rounded border border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="mx-auto md:flex flex-wrap md:flex-nowrap justify-evenly">
          <div className="m-4 md:w-full">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" value={accountDetails.email} onChange={handleAccountDetailsChange} className="w-full bg-white rounded border border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="m-4 md:w-full">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone Number</label>
            <input type="phone" id="phone" name="phone" value={accountDetails.phone} onChange={handleAccountDetailsChange} placeholder="Your 10 digit phone number" className="w-full bg-white rounded border border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="m-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
          <textarea id="address" name="address" value={accountDetails.address} onChange={handleAccountDetailsChange} className="w-full bg-white rounded border border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="mx-auto md:flex flex-wrap md:flex-nowrap justify-evenly">
          <div className="m-4 md:w-full">
            <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pin Code</label>
            <input type="text" id="pincode" name="pincode" value={accountDetails.pincode} onChange={handleAccountDetailsChange} className="w-full bg-white rounded border border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="m-4 md:w-full">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
            <input type="text" id="city" name="city" value={accountDetails.city} readOnly={true} className="w-full bg-white rounded border border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="m-4 md:w-full">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
            <input type="text" id="state" name="state" value={accountDetails.state} readOnly={true} className="w-full bg-white rounded border border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <button type="submit" className="m-4 bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded">Update</button>
      </form>

      <h2 className="font-semibold text-xl mx-4">2. Change Password</h2>
      <form onSubmit={handleUpdatePassword} className='my-4'>
        <div className="m-4">
          <label htmlFor="oldPassword" className="leading-7 text-sm text-gray-600">Old Password</label>
          <input type="password" id="oldPassword" name="oldPassword" value={accountPassword.oldPassword} onChange={handlePasswordChange} className="w-full bg-white rounded border border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="mx-auto md:flex flex-wrap md:flex-nowrap justify-evenly">
          <div className="m-4 md:w-full">
            <label htmlFor="newPassword" className="leading-7 text-sm text-gray-600">New Password</label>
            <input type="password" id="newPassword" name="newPassword" value={accountPassword.newPassword} onChange={handlePasswordChange} className="w-full bg-white rounded border border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="m-4 md:w-full">
            <label htmlFor="confirmPassword" className="leading-7 text-sm text-gray-600">Confirm New Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={accountPassword.confirmPassword} onChange={handlePasswordChange} className="w-full bg-white rounded border border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <button type="submit" className="m-4 bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded">Submit</button>
      </form>

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

export default MyAccount
