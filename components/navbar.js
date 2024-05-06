"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineShoppingCart, AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { IoIosCloseCircle } from "react-icons/io";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearCart, decreaseQuantity, increaseQuantity } from '@/redux/features/cart';
import { ToastContainer, toast } from 'react-toastify';
// import TopLoadingBar from './TopLoadingBar';

const Navbar = () => {
  const token = (typeof window !== 'undefined') ? localStorage.getItem('token') : null

  /* account dropdown */
  const [showAccountDropdown, setShowAccountDropdown] = useState(false)
  const accountDropdownRef = useRef()

  useEffect(() => {   // Close account dropdown when clicked outside
    function handleClickOutside(event) {
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target)) {
        setShowAccountDropdown(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [accountDropdownRef])

  const logOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
    }
    toast.success('Logged out successfully', {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      // onClose: () => { window.location.reload() }
    });
  }

  /* side cart */
  const sideCartRef = useRef()
  const toggleCart = () => {
    if (sideCartRef.current.classList.contains('translate-x-full')) {
      sideCartRef.current.classList.remove('translate-x-full')
      sideCartRef.current.classList.add('translate-x-0')
    }
    else {
      sideCartRef.current.classList.add('translate-x-full')
      sideCartRef.current.classList.remove('translate-x-0')
    }
  }
  useEffect(() => {   // Close cart when clicked outside
    function handleClickOutside(event) {
      if (sideCartRef.current && !sideCartRef.current.contains(event.target)) {
        sideCartRef.current.classList.add('translate-x-full')
        sideCartRef.current.classList.remove('translate-x-0')
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sideCartRef]);

  const [products, setProducts] = useState([])
  const [subtotal, setSubtotal] = useState(0)

  const dispatch = useAppDispatch()
  const cart = useAppSelector(state => state.cart)

  useEffect(() => {
    setProducts(cart.products)
    setSubtotal(cart.subtotal)
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setProducts(cart.products)
    setSubtotal(cart.subtotal)
  }, [cart])

  return (
    <div className='sticky top-0 z-50 bg-white flex flex-col md:flex-row justify-center md:justify-start items-center py-2 mb-2 shadow-md'>
      {/* <TopLoadingBar /> */}

      <div className="logo mx-5 self-start">
        <Link href={'/'}><Image src="/logo.png" alt="" width={200} height={49} /></Link>
      </div>

      <div className="nav">
        <ul className='flex items-center space-x-4 font-bold md:text-md'>
          <Link href={'/tshirts'}><li className="text-gray-800 hover:text-pink-600">Tshirts</li></Link>
          <Link href={'/hoodies'}><li className="text-gray-800 hover:text-pink-600">Hoodies</li></Link>
          <Link href={'/stickers'}><li className="text-gray-800 hover:text-pink-600">Stickers</li></Link>
          <Link href={'/mugs'}><li className="text-gray-800 hover:text-pink-600">Mugs</li></Link>
        </ul>
      </div>

      <div className="icons flex gap-1 absolute right-0 top-4 mx-5 items-center">
        <div>
          {token && <MdAccountCircle onMouseOver={() => { setShowAccountDropdown(true) }} className='text-xl md:text-3xl cursor-pointer' />}
          {showAccountDropdown && <div onMouseLeave={() => { setShowAccountDropdown(false) }} ref={accountDropdownRef} className='absolute top-12 right-0 w-40 bg-pink-200 py-2 px-4 rounded-md shadow-md font-semibold'>
            <Link href={'/account'}><p className='text-gray-800 hover:text-pink-600 py-2 px-4'>My Account</p></Link>
            <Link href={'/orders'}><p className='text-gray-800 hover:text-pink-600 py-2 px-4'>Orders</p></Link>
            <p onClick={logOut} className='text-gray-800 hover:text-pink-600 py-2 px-4 cursor-pointer'>Logout</p>
          </div>}
        </div>
        {!token && <Link href={'/login'}><button className='bg-pink-600 px-2 py-1 rounded-md text-sm text-white mx-2'>Login</button></Link>}
        <AiOutlineShoppingCart onClick={toggleCart} className='text-xl md:text-3xl cursor-pointer' />
      </div>

      <div ref={sideCartRef} className="sideCart overflow-y-scroll w-72 h-full z-30 fixed top-0 right-0 bg-pink-100 py-10 pr-5 pl-8 transform transition-transform translate-x-full">
        <h2 className='font-bold text-xl text-center mt-2 mb-5'>Shopping cart</h2>
        <span onClick={toggleCart} className='absolute top-5 right-2 cursor-pointer text-2xl text-pink-500'><IoIosCloseCircle /></span>
        <ol className='list-decimal font-semibold'>
          {(typeof products != "undefined") && products.length === 0 && <p className='text-center mb-4'>Cart is empty</p>}
          {(typeof products != "undefined") && products.map(product => (
            <li key={product.itemCode}>
              <div className='item flex my-2 gap-2'>
                <div className='w-3/4 font-semibold'>{product.name} ({product.size}/{product.color})</div>
                <div className='w-1/4 font-semibold flex items-center justify-center gap-2'>
                  <AiFillMinusCircle className='cursor-pointer text-pink-500' onClick={() => { dispatch(decreaseQuantity(product)) }} />
                  <span className='text-sm'>{product.quantity}</span>
                  <AiFillPlusCircle className='cursor-pointer text-pink-500' onClick={() => { dispatch(increaseQuantity(product)) }} />
                </div>
              </div>
            </li>
          ))}
        </ol>
        {(typeof products != "undefined") && products.length != 0 && <>
          <p className='font-bold text-center py-4'>Subtotal: ₹{subtotal}</p>
          <div className="flex gap-2 justify-evenly">
            <Link href={'/checkout'}><button className='flex text-white bg-pink-500 border-0 py-2 px-3 focus:outline-none hover:bg-pink-600 rounded text-sm' onClick={toggleCart}><BsFillBagCheckFill className='m-1 text-xs' />Checkout</button></Link>
            <button className='flex text-white bg-pink-500 border-0 py-2 px-3 focus:outline-none hover:bg-pink-600 rounded text-sm' onClick={() => { dispatch(clearCart()) }}>Clear cart</button>
          </div>
        </>}
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

export default Navbar
