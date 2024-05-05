"use client"
import React from "react"
import { addToCart } from "@/redux/features/cart"
import { useAppDispatch } from "@/redux/hooks"


const AddToCart = (props) => {
    const dispatch = useAppDispatch()

    const handleAddToCart = () => {
      dispatch(addToCart(props.product))
    }
  
    return (
        <button className="flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded" onClick={handleAddToCart}>Add to cart</button>
    )
}

export default AddToCart