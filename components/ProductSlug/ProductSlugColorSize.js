"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import bgColorClasses from "@/data/bgColorClasses.json"

const ProductSlugColorSize = (props) => {
  const { productItem, variants } = props
  const router = useRouter()
  const [color, setColor] = useState(productItem.color)
  const [size, setSize] = useState(productItem.size)

  const routeToVariant = (variantColor, variantSize) => {
    const url = `/product/${variants[variantColor][variantSize].slug}`
    router.push(url)
  }

  useEffect(() => {
    routeToVariant(color, size);
    // eslint-disable-next-line
  }, [color, size])

  return (
    <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
      {color && <div className="flex">
        <span className="mr-3">Color</span>
        {Object.keys(variants).map((itemColor) => (
          (Object.keys(variants[itemColor]).includes(size)) // check if the color contains the selected size in variants
          && <button key={itemColor} onClick={() => { /* routeToVariant */ setColor(itemColor) }} style={{backgroundColor: bgColorClasses[itemColor.toLowerCase()]}} className={`border-2 ${itemColor === color ? 'border-black' : 'border-gray-300'} ml-1 rounded-full w-6 h-6 focus:outline-none`}></button>
        ))}
      </div>}
      {size && <div className="flex ml-6 items-center">
        <span className="mr-3">Size</span>
        <div className="relative">
          <select value={size} onChange={(e) => { /* routeToVariant */ setSize(e.target.value) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-500 text-base pl-3 pr-10">
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
      </div>}
    </div>
  )
}

export default ProductSlugColorSize
