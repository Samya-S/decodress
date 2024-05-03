"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'
import { AiOutlineShoppingCart, AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { IoIosCloseCircle } from "react-icons/io";
import { BsFillBagCheckFill } from "react-icons/bs";

const Navbar = () => {
  const ref = useRef()
  const toggleCart = () => {
    if (ref.current.classList.contains('translate-x-full')) {
      ref.current.classList.remove('translate-x-full')
      ref.current.classList.add('translate-x-0')
    }
    else {
      ref.current.classList.add('translate-x-full')
      ref.current.classList.remove('translate-x-0')
    }
  }
  return (
    <div className='flex flex-col md:flex-row justify-center md:justify-start items-center py-2 mb-2 shadow-md'>
      <div className="logo mx-5">
        <Link href={'/'}><Image src="/logo.png" alt="" width={200} height={49} /></Link>
      </div>

      <div className="nav">
        <ul className='flex items-center space-x-4 font-bold md:text-md'>
          <Link href={'/tshirts'}><li>Tshirts</li></Link>
          <Link href={'/hoodies'}><li>Hoodies</li></Link>
          <Link href={'/stickers'}><li>Stickers</li></Link>
          <Link href={'/mugs'}><li>Mugs</li></Link>
        </ul>
      </div>

      <div onClick={toggleCart} className="cart absolute right-0 top-4 mx-5 cursor-pointer">
        <AiOutlineShoppingCart className='text-xl md:text-3xl' />
      </div>

      <div ref={ref} className="sideCart w-72 h-full z-50 fixed top-0 right-0 bg-pink-100 py-10 pr-5 pl-8 transform transition-transform translate-x-full">
        <h2 className='font-bold text-xl text-center mt-2 mb-5'>Shopping cart</h2>
        <span onClick={toggleCart} className='absolute top-5 right-2 cursor-pointer text-2xl text-pink-500'><IoIosCloseCircle /></span>
        <ol className='list-decimal font-semibold'>
            <li>
              <div className='item flex my-2 gap-2'>
                <div className='w-3/4 font-semibold'>Tshirt - Wear the code Lorem ipsum dolor sit amet.</div>
                <div className='w-1/4 font-semibold flex items-center justify-center gap-2'>
                  <AiFillMinusCircle className='cursor-pointer text-pink-500' />
                  <span className='text-sm'>1</span>
                  <AiFillPlusCircle className='cursor-pointer text-pink-500' />
                </div>
              </div>
            </li>
        </ol>
        <div className="flex gap-2 justify-evenly">
          <button className='flex text-white bg-pink-500 border-0 py-2 px-3 focus:outline-none hover:bg-pink-600 rounded text-sm'><BsFillBagCheckFill className='m-1 text-xs' />Checkout</button>
          <button className='flex text-white bg-pink-500 border-0 py-2 px-3 focus:outline-none hover:bg-pink-600 rounded text-sm'>Clear cart</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
