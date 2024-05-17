"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

async function getProduct() {
    const res = await fetch(`/api/getAllOrders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: localStorage.getItem('token') })
    })
    const orders = await res.json()

    return orders
}

const Orders = () => {
    const router = useRouter()
    const [orders, setOrders] = useState([])

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/login')
        }
        else {
            getProduct().then(data => {
                if (data.success) {
                    setOrders(data.orders)
                }
            })
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className='container bg-violet-50 mx-auto min-h-[50vh] flex flex-col items-center justify-center'>
            <p className='font-bold text-2xl md:text-3xl mt-6 pt-5 pb-2 text-center'>My Orders</p>
            {orders.length === 0 && <p className='text-lg mt-6'>No orders yet</p>}
            {orders.length > 0 &&<div class="flex flex-col px-3 py-2">
                <div class="overflow-x-auto">
                    <div class="inline-block min-w-full py-2 sm:px-6">
                        <div class="overflow-hidden">
                            <table class="min-w-full text-left font-light text-surface">
                                <thead
                                    class="border-b border-neutral-200 font-medium">
                                    <tr>
                                        <th scope="col" class="px-6 py-4 text-base md:text-lg">Order Id</th>
                                        <th scope="col" class="px-6 py-4 text-base md:text-lg">Items</th>
                                        <th scope="col" class="px-6 py-4 text-base md:text-lg">Amount</th>
                                        <th scope="col" class="px-6 py-4 text-base md:text-lg">Payment Status</th>
                                        <th scope="col" class="px-6 py-4 text-base md:text-lg">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => {
                                        return <tr key={order._id} class="border-b border-neutral-200">
                                            <td class="whitespace-nowrap px-6 py-4 text-sm md:text-base font-medium">{order.orderId}</td>
                                            <td class="whitespace-nowrap px-6 py-4 text-sm md:text-base">
                                                <ul className='list-disc'>
                                                    {order.products.map((item) => {
                                                        return <li key={item._id}>{item.name} - {item.category.charAt(0).toUpperCase() + item.category.slice(1)} ({item.size}/{item.color}): {item.quantity}</li>
                                                    })}
                                                </ul>
                                            </td>
                                            <td class="whitespace-nowrap px-6 py-4 text-sm md:text-base">₹{order.amount}</td>
                                            <td class="whitespace-nowrap px-6 py-4 text-sm md:text-base">{order.status}</td>
                                            <td class="whitespace-nowrap px-6 py-4 text-sm md:text-base"><Link href={'/order?id=' + order._id}>Check order</Link></td>
                                        </tr>
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Orders
