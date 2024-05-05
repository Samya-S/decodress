"use client"
import React, { useState } from 'react'

const PincodeAvailability = () => {
    const [pincode, setPincode] = useState('')
    const [serviceable, setServiceable] = useState(null)

    const checkLocationServiceability = async () => {
        let pincodes = await fetch('http://localhost:3000/api/pincode')
        pincodes = await pincodes.json()
        if (pincodes.includes(parseInt(pincode))) {
            setServiceable(true)
        } else {
            setServiceable(false)
        }
    }
    return (
        <div>
            <div className="pincode mt-6 flex space-x-2 text-sm">
                <input onChange={(e) => { setPincode(e.target.value) }} type="text" placeholder="Enter your pincode" className="px-2 py-1 border border-pink-100 rounded-md focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-colors duration-200 ease-in-out" />
                <button onClick={checkLocationServiceability} className="text-white bg-pink-500 border-0 py-1 px-5 focus:outline-none hover:bg-pink-600 rounded">Check</button>
            </div>
            {!serviceable && serviceable != null && <div className="text-red-700 text-sm mt-3">Sorry! We do not deliver to this pincode</div>}
            {serviceable && serviceable != null && <div className="text-green-700 text-sm mt-3">Yay! This pincode is serviceable</div>}
        </div>
    )
}

export default PincodeAvailability
