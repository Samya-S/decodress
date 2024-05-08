"use client"
import React from "react"
import { useAppDispatch } from "@/redux/hooks"
import { addToCart, clearCart } from "@/redux/features/cart"
import { useRouter } from "next/navigation"

const BuyNow = (props) => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleBuyNow = () => {
        dispatch(clearCart())
        dispatch(addToCart(props.product))
        router.push("/checkout")
    }

    return (
        <button onClick={() => { handleBuyNow() }} disabled={props.product.availableQty <= 0} className="flex text-white bg-pink-500 disabled:bg-pink-300 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Buy now</button>
    )
}

export default BuyNow;