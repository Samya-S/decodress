"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

async function getProduct() {
    const domain = process.env.HOSTING_DOMAIN
    const res = await fetch(`${domain}/api/getProducts`, { cache: "no-store" })
    const data = await res.json()

    const product = await data.body.data.filter(product => product.slug === slug)


    return { product, variants: colorSizeSlug }
}

const Orders = () => {
    const router = useRouter()
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/login')
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className='container bg-pink-50 mx-auto'>
            <p className='font-bold text-3xl mt-6 pt-5 pb-2 text-center'>My Orders</p>
            <div class="flex flex-col px-5 py-2">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table
                                class="min-w-full text-left text-sm font-light text-surface">
                                <thead
                                    class="border-b border-neutral-200 font-medium">
                                    <tr>
                                        <th scope="col" class="px-6 py-4">#</th>
                                        <th scope="col" class="px-6 py-4">First</th>
                                        <th scope="col" class="px-6 py-4">Last</th>
                                        <th scope="col" class="px-6 py-4">Handle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="border-b border-neutral-200">
                                        <td class="whitespace-nowrap px-6 py-4 font-medium">1</td>
                                        <td class="whitespace-nowrap px-6 py-4">Mark</td>
                                        <td class="whitespace-nowrap px-6 py-4">Otto</td>
                                        <td class="whitespace-nowrap px-6 py-4">@mdo</td>
                                    </tr>
                                    <tr class="border-b border-neutral-200">
                                        <td class="whitespace-nowrap px-6 py-4 font-medium">2</td>
                                        <td class="whitespace-nowrap px-6 py-4">Jacob</td>
                                        <td class="whitespace-nowrap px-6 py-4">Thornton</td>
                                        <td class="whitespace-nowrap px-6 py-4">@fat</td>
                                    </tr>
                                    <tr class="border-b border-neutral-200">
                                        <td class="whitespace-nowrap px-6 py-4 font-medium">3</td>
                                        <td class="whitespace-nowrap px-6 py-4">Larry</td>
                                        <td class="whitespace-nowrap px-6 py-4">Wild</td>
                                        <td class="whitespace-nowrap px-6 py-4">@twitter</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders
