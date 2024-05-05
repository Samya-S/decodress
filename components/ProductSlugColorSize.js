"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ProductSlugColorSize = (props) => {
  const { productItem, variants } = props
  const router = useRouter()
  const [color, setColor] = useState(productItem.color)
  const [size, setSize] = useState(productItem.size)

  const routeToVariant = (variantColor, variantSize) => {
    // router.push(`/product/${productItem.name.toLowerCase().replace(/ /g, "-")}-${variantColor.toLowerCase().replace(/ /g, "-")}-${variantSize.toLowerCase().replace(/ /g, "-")}`)
    // window.location = `http://localhost:3000/product/${productItem.name.toLowerCase().replace(/ /g, "-")}-${variantColor.toLowerCase().replace(/ /g, "-")}-${variantSize.toLowerCase().replace(/ /g, "-")}`

    const url = `/product/${variants[variantColor][variantSize].slug}`
    router.push(url)
    // window.location = 'http://localhost:3000' + url
  }

  useEffect(() => {
    routeToVariant(color, size);
    // eslint-disable-next-line
  }, [color, size])

  // if the color contains the selected size in variants and then add the size to an array
  // const sizes = [
  //   ...Object.keys(variants[color]).filter((item) => Object.keys(variants[color]).includes(size))
  // ]

  // console.log(sizes)

  // if the selected size is in the color object then add the color to an array
  // const colors = [
  //   ...Object.keys(variants).filter((item) => Object.keys(variants[item]).includes(size))
  // ]

  // console.log(colors)

  return (
    <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
      <div className="flex">
        <span className="mr-3">Color</span>
        {Object.keys(variants).map((itemColor) => (
          (Object.keys(variants[itemColor]).includes(size)) // check if the color contains the selected size in variants
          && <button key={itemColor} onClick={() => { /*routeToVariant((itemColor), size)*/ setColor(itemColor) }} className={`border-2 border-gray-300 bg-${itemColor.toLowerCase()}-500 ml-1 rounded-full w-6 h-6 focus:outline-none`}></button>
        ))}
      </div>
      <div className="flex ml-6 items-center">
        <span className="mr-3">Size</span>
        <div className="relative">
          <select value={size} onChange={(e) => { /*routeToVariant(color, (e.target.value))*/ setSize(e.target.value) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10">
            {Object.keys(variants[productItem.color]).map((itemSize) =>
              (<option key={itemSize}>{itemSize}</option>)
            )}
          </select>
          <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductSlugColorSize
