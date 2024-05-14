// import React from 'react'
"use client"
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai"
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearCart, decreaseQuantity, increaseQuantity } from "@/redux/features/cart";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { ToastContainer, toast } from "react-toastify";

const CheckOut = () => {
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
          setDeliveryDetails({ ...deliveryDetails, name: data.user.name, email: data.user.email, phone: data.user.phone, address: data.user.address, pincode: data.user.pincode })
        }
      })
    // eslint-disable-next-line
  }, [])


  /* delivery details */
  const [deliveryDetails, setDeliveryDetails] = useState({ name: '', email: '', phone: '', address: '', pincode: '', city: '', state: '' })
  const [pincodeServiceable, setPincodeServiceable] = useState(null)
  const [payBtnDisabled, setPayBtnDisabled] = useState(true)

  const handleChange = (e) => {
    setDeliveryDetails({ ...deliveryDetails, [e.target.name]: e.target.value })
  }

  const getLocationDetailsFromPincode = () => {
    if (deliveryDetails.pincode.length === 6) {
      // fetch(`https://api.postalpincode.in/pincode/${deliveryDetails.pincode}`)
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log(data)
      //     if (data[0].Status === 'Success') {
      //       setDeliveryDetails({ ...deliveryDetails, city: data[0].PostOffice[0].Name, state: data[0].PostOffice[0].State })
      //     }
      //     else {
      //       setDeliveryDetails({ ...deliveryDetails, city: '', state: '' })
      //     }
      //   })
      fetch(`/api/pincode/`)
        .then(response => response.json())
        .then(data => {
          if (Object.keys(data).includes(deliveryDetails.pincode)) {
            setDeliveryDetails({ ...deliveryDetails, city: data[deliveryDetails.pincode][0], state: data[deliveryDetails.pincode][1] })
            setPincodeServiceable(true)
          }
          else {
            setDeliveryDetails({ ...deliveryDetails, city: '', state: '' })
            setPincodeServiceable(false)
          }          
        })
    }
    else {
      setDeliveryDetails({ ...deliveryDetails, city: '', state: '' })
      setPincodeServiceable(null)
    }
  }

  useEffect(() => {
    getLocationDetailsFromPincode()
    // eslint-disable-next-line
  }, [deliveryDetails.pincode])


  /* cart details */
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


  /* set pay button disabled if incomplete delivery details or empty cart */
  useEffect(() => {
    if (deliveryDetails.name && deliveryDetails.email && deliveryDetails.phone && deliveryDetails.address && deliveryDetails.pincode && deliveryDetails.city && deliveryDetails.state && cart.products.length > 0 && cart.subtotal > 0) {
      setPayBtnDisabled(false)
    }
    else {
      setPayBtnDisabled(true)
    }
  }, [deliveryDetails, cart])


  /* payment */
  const initiatePayment = async () => {
    const hostingDomain = process.env.NEXT_PUBLIC_DOMAIN
    const amountVal = (subtotal * 100)

    // Creating a new payment order
    const resp = await fetch(`${hostingDomain}/api/createPaymentOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amountVal,
        currency: "INR",
        name: deliveryDetails.name,
        email: deliveryDetails.email,
        phone: deliveryDetails.phone,
        address: deliveryDetails.address,
        pincode: deliveryDetails.pincode,
        city: deliveryDetails.city,
        state: deliveryDetails.state,
        cart: products,
        subtotal: subtotal,
        jwtToken: localStorage.getItem('token')
      }),
    })

    const orderResp = await resp.json()

    // console.log('on createOrder:');
    // console.log(orderResp);

    if (!orderResp.success) {
      toast.error(orderResp.error, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      if (orderResp.cartIsTampered) {
        dispatch(clearCart())
      }
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = orderResp.data.response;

    const options = {
      key: process.env.RZPAY_KEY_ID,
      amount: amount.toString(),
      currency: currency,
      name: "Decodress - Dress Decoded, Style Encoded",
      description: "Payment Transaction",
      image: `${hostingDomain}/decodress-logo-text.png`,
      order_id: order_id,
      prefill: {
        name: deliveryDetails.name,
        email: deliveryDetails.email,
        contact: deliveryDetails.phone,
        method: 'card'
      },
      notes: {
        address: deliveryDetails.address
      },
      handler: async function (response) {
        const data = {
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };

        // console.log('on payment:');
        // console.log(data);

        const resp = await fetch(`${hostingDomain}/api/verifyPayment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'x-razorpay-signature': response.razorpay_signature,
          },
          body: JSON.stringify(data),
        });

        const result = await resp.json();
        // console.log('on verifyOrder:');
        // console.log(result);

        if (result.success) {
          dispatch(clearCart())

          toast.success('Payment successful!', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: () => router.push(`/order?id=${result.order_id}`)
          })
        }
        else {
          toast.error('Payment failed!', {
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
      },
      theme: {
        // hide_topbar: true,
        color: "#4c1b96",
      },
      config: {
        display: {
          // blocks: {
          //   banks: {
          //     name: 'Pay via UPI',
          //     instruments: [
          //       {
          //         method: 'upi',
          //       }
          //     ]
          //   },
          // },
          // sequence: ['block.banks'],
          preferences: {
            show_default_blocks: true,
          },
          hide: [
            {
              // method: 'paylater'
            }
          ],
        },
      },
      modal: {
        ondismiss: function () {
          toast.error('Payment has been cancelled!', {
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
    };

    const paymentObject = new Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      // console.log(response.error);
      toast.error('Payment failed!', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
  }

  return (
    <div className="container m-auto">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <h1 className="font-bold text-2xl md:text-3xl my-8 text-center">Checkout</h1>
      <h2 className="font-semibold text-xl mx-4">1. Delivery details</h2>
      <div className="m-4">
        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
        <input type="text" id="name" name="name" value={deliveryDetails.name} onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
      </div>
      <div className="mx-auto md:flex flex-wrap md:flex-nowrap justify-evenly">
        <div className="m-4 md:w-full">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
          <input type="email" id="email" name="email" value={deliveryDetails.email} onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="m-4 md:w-full">
          <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone Number</label>
          <input type="phone" id="phone" name="phone" value={deliveryDetails.phone} onChange={handleChange} placeholder="Your 10 digit phone number" className="w-full bg-white rounded border border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
      </div>
      <div className="m-4">
        <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
        <textarea id="address" name="address" value={deliveryDetails.address} onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
      </div>
      <div className="mx-auto md:flex flex-wrap md:flex-nowrap justify-evenly">
        <div className="m-4 md:w-full">
          <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pin Code</label>
          <input type="text" id="pincode" name="pincode" value={deliveryDetails.pincode} onChange={handleChange} className="w-full bg-white rounded border border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          {!pincodeServiceable && pincodeServiceable != null && <div className="text-red-700 text-sm mt-3">Sorry! We do not deliver to this pincode</div>}
          {pincodeServiceable && pincodeServiceable != null && <div className="text-green-700 text-sm mt-3">Yay! This pincode is serviceable</div>}
        </div>
        <div className="m-4 md:w-full">
          <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
          <input type="text" id="city" name="city" value={deliveryDetails.city} readOnly={true} className="w-full bg-white rounded border border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
        <div className="m-4 md:w-full">
          <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
          <input type="text" id="state" name="state" value={deliveryDetails.state} readOnly={true} className="w-full bg-white rounded border border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
      </div>

      <h2 className="font-semibold text-xl mx-4 pt-4">2. Review cart items</h2>
      <div className="cart bg-violet-50 m-4 py-4 pr-5 pl-8">
        <ol className='font-semibold max-w-screen-md mx-auto' style={{ listStyleType: 'upper-roman' }}>
          {(typeof products != "undefined") && products.length === 0 && <p className='text-center mb-4'>Cart is empty</p>}
          {(typeof products != "undefined") && products.map(product => (
            <li key={product.itemCode}>
              <div className='item flex my-2 gap-2'>
                <div className='w-3/4 font-semibold'>{product.name} - {product.category} ({product.size}/{product.color})</div>
                <div className='w-1/4 font-semibold flex items-center justify-end gap-2'>
                  <AiFillMinusCircle className='cursor-pointer text-violet-600' onClick={() => { dispatch(decreaseQuantity(product)) }} />
                  <span className='text-sm'>{product.quantity}</span>
                  <AiFillPlusCircle className='cursor-pointer text-violet-600' onClick={() => { dispatch(increaseQuantity(product)) }} />
                </div>
              </div>
            </li>
          ))}
        </ol>
        {(typeof products != "undefined") && products.length != 0 && <>
          <p className='font-bold text-center py-4'>Subtotal: ₹{subtotal}</p>
          <div className="flex gap-2 justify-evenly">
            <button className='flex text-white bg-violet-600 border-0 py-2 px-3 focus:outline-none hover:bg-violet-700 rounded text-sm' onClick={() => { dispatch(clearCart()) }}>Clear cart</button>
          </div>
        </>}
      </div>
      <button disabled={payBtnDisabled} onClick={initiatePayment} className='disabled:bg-violet-400 m-4 flex text-white bg-violet-600 border-0 py-2 px-3 focus:outline-none hover:bg-violet-700 rounded text-sm'>Pay ₹{subtotal}</button>
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

export default CheckOut
