"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

async function getOrderDetails(order_id) {
  const res = await fetch(`/api/getOrderDetails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: order_id, token: localStorage.getItem("token") }),
  })
  const order = await res.json()

  return order
}

const Order = () => {
  const router = useRouter()
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login')
    }
    // eslint-disable-next-line
  }, [])

  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  const [orderDetails, setOrderDetails] = useState({})
  const [date, setDate] = useState()

  useEffect(() => {
    getOrderDetails(id).then((order) => {
      if (order.success) {
        setOrderDetails(order.order)
        setDate(new Date(order.order.createdAt))
      }
    })
  }, [id])

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            {id == "" || !orderDetails.orderId && <div className="container mx-auto min-h-[50vh] flex flex-col items-center justify-center">
              <h2 className="text-xs md:text-sm title-font text-gray-500 tracking-widest">DECODRESS</h2>
              <h1 className="text-gray-900 text-xl md:text-3xl title-font font-medium mt-4">Order not found</h1>
            </div>}
            {id != "" && orderDetails.orderId && <>
              <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                <h2 className="text-xs md:text-sm title-font text-gray-500 tracking-widest">DECODRESS</h2>
                <h1 className="text-gray-900 text-xl md:text-3xl title-font font-medium mb-4">Order id: #{orderDetails.orderId}</h1>
                <p className="leading-relaxed">Yayy! Your order has been successfully placed.</p>
                <p className="leading-relaxed">Order placed on: {date && date.toLocaleString("en-IN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</p>
                <p className="mb-5">Your payment status is <span className="font-semibold text-slate-500">{orderDetails.status}</span>.</p>

                <div class="w-full mx-auto mb-6 overflow-auto text-sm md:text-base">
                  <table class="table-auto w-full text-left whitespace-no-wrap">
                    <thead>
                      <tr>
                        <th class="px-4 py-3 text-left tracking-wider font-normal text-gray-900 text-base md:text-lg bg-gray-100 rounded-tl rounded-bl">Item</th>
                        <th class="px-4 py-3 text-center tracking-wider font-normal text-gray-900 text-base md:text-lg bg-gray-100">Quantity</th>
                        <th class="px-4 py-3 text-right tracking-wider font-normal text-gray-900 text-base md:text-lg bg-gray-100">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails.products && orderDetails.products.map((item, index) => (
                        <tr key={index}>
                          <td class="border-t-2 text-left border-gray-200 px-4 py-3">{item.name} - {item.category.charAt(0).toUpperCase() + item.category.slice(1)} ({item.size}/{item.color})</td>
                          <td class="border-t-2 text-center border-gray-200 px-4 py-3">{item.quantity}</td>
                          <td class="border-t-2 text-right border-gray-200 px-4 py-3">₹{(item.price) * (item.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center">
                  <span className="title-font font-medium text-2xl text-gray-900">₹{orderDetails.amount}</span>
                  <button class="flex ml-auto text-white bg-violet-600 border-0 py-2 px-6 focus:outline-none hover:bg-violet-700 rounded">Track order</button>
                </div>
              </div>
              {/* eslint-disable-next-line */}
              <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://m.media-amazon.com/images/I/61C-QoJDcgL._AC_SL1500_.jpg" />
            </>}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Order
