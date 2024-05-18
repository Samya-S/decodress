"use client"
import React from "react"
import { addToCart } from "@/redux/features/cart"
import { useAppDispatch } from "@/redux/hooks"
import { ToastContainer, toast } from "react-toastify"

const AddToCart = (props) => {
  const dispatch = useAppDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart(props.product))
    notify()
  }

  const notify = () => toast.success('Item added to the cart', {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  return (
    <>
      <button disabled={props.product.availableQty <= 0} className="flex text-white bg-violet-600 disabled:bg-violet-300 border-0 py-2 px-6 focus:outline-none hover:bg-violet-700 rounded" onClick={handleAddToCart}>Add to cart</button>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default AddToCart