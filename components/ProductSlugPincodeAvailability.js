"use client"
import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const PincodeAvailability = () => {
    const [pincode, setPincode] = useState('')
    const [serviceable, setServiceable] = useState(null)

    const checkLocationServiceability = async (e) => {
        e.preventDefault()
        if (pincode.trim() === '') {
            toast.error('Input cannot be empty', {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (!/^\d{5,6}$/.test(pincode)) {
            toast.error('Enter a valid pincode', {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            const domain = process.env.HOSTING_DOMAIN
            let pincodes = await fetch(`${domain}/api/pincode`)
            pincodes = await pincodes.json()
            if (pincodes.includes(parseInt(pincode))) {
                setServiceable(true)
                toast.success('Yay! This pincode is serviceable', {
                    position: "bottom-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                setServiceable(false)
                toast.error('Sorry! We do not deliver to this pincode', {
                    position: "bottom-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    }
    return (
        <div>
            <form onSubmit={checkLocationServiceability} className="pincode mt-6 flex space-x-2 text-sm">
                <input onChange={(e) => { setPincode(e.target.value) }} type="text" placeholder="Enter your pincode" className="px-2 py-1 border border-pink-100 rounded-md focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-colors duration-200 ease-in-out" required />
                <button className="text-white bg-pink-500 border-0 py-1 px-5 focus:outline-none hover:bg-pink-600 rounded">Check</button>
            </form>
            {/* {!serviceable && serviceable != null && <div className="text-red-700 text-sm mt-3">Sorry! We do not deliver to this pincode</div>}
            {serviceable && serviceable != null && <div className="text-green-700 text-sm mt-3">Yay! This pincode is serviceable</div>} */}
            <ToastContainer
                position="bottom-center"
                autoClose={1000}
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

export default PincodeAvailability
