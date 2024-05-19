import Link from 'next/link'
import React from 'react'
import bgColorClasses from "@/data/bgColorClasses.json"

async function getProducts() {
  const domain = process.env.HOSTING_DOMAIN
  const res = await fetch(`${domain}/api/getProducts`, { cache: "no-store" })
  const data = await res.json()

  const allProducts = await data.body.data

  // filter latest 6 products by updatedAt of which there will be 2 tshirts, 2 hoodies, 1 mug and 1 sticker
  // the 2 tshirts and the 2 hoodies will have different titles respectively
  const tshirtTitles = new Set();
  const hoodieTitles = new Set();

  const tshirts = await data.body.data.filter(product => {
    if (product.category === "tshirt" && !tshirtTitles.has(product.title)) {
      tshirtTitles.add(product.title);
      return true;
    }
    return false;
  }).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 2);

  const hoodies = await data.body.data.filter(product => {
    if (product.category === "hoodie" && !hoodieTitles.has(product.title)) {
      hoodieTitles.add(product.title);
      return true;
    }
    return false;
  }).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 2);

  const mugs = await data.body.data.filter(product => product.category === "mug").sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 1);
  const stickers = await data.body.data.filter(product => product.category === "sticker").sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 1);

  // combine all the 6 products into one array
  const products = [...tshirts, ...hoodies, ...mugs, ...stickers]

  // get all products from allProducts that have same title with the products array
  const variants = allProducts.filter(product => products.map(product => product.title).includes(product.title))

  let latestProducts = {}

  for (let item of variants) {
    if (item.title in latestProducts) {
      if (!latestProducts[item.title].color.includes(item.color) && item.availableQty > 0) {
        latestProducts[item.title].color.push(item.color)
      }
      if (!latestProducts[item.title].size.includes(item.size) && item.availableQty > 0) {
        latestProducts[item.title].size.push(item.size)
      }
    }
    else {
      latestProducts[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        latestProducts[item.title].color = [item.color]
        latestProducts[item.title].size = [item.size]
      }
      else {
        latestProducts[item.title].color = []
        latestProducts[item.title].size = []
      }
    }
  }

  // sort the size object in order of S, M, L, XL, XXL
  for (let item in latestProducts) {
    latestProducts[item].size.sort((a, b) => {
      if (a === 'S') return -1
      if (b === 'S') return 1
      if (a === 'M') return -1
      if (b === 'M') return 1
      if (a === 'L') return -1
      if (b === 'L') return 1
      if (a === 'XL') return -1
      if (b === 'XL') return 1
      if (a === 'XXL') return -1
      if (b === 'XXL') return 1
      return 0
    })
  }

  // sort the color object in alphabetical order
  for (let item in latestProducts) {
    latestProducts[item].color.sort()
  }

  // capitalize the first letter of color
  for (let item in latestProducts) {
    latestProducts[item].color = latestProducts[item].color.map(color => color.charAt(0).toUpperCase() + color.slice(1))
  }

  return latestProducts;
}

const HomeLatestProducts = async () => {
  const latestProducts = await getProducts()

  return (
    <div>
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Latest Products</h1>
      <div className="h-1 w-20 bg-violet-500 rounded mb-1"></div>
      <div className="flex flex-wrap justify-evenly items-center min-h-[40vh]">
        {Object.keys(latestProducts).length === 0 &&
          <div className="text-center px-5">Sorry all the products are out of stock. New stock comming soon. Stay tuned!</div>
        }
        {Object.keys(latestProducts).map((item) => (
          <div key={latestProducts[item]._id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5">
            <Link href={'product/' + latestProducts[item].slug}>
              <p className="mt-5 block relative rounded overflow-hidden">
                {/* eslint-disable-next-line */}
                <img alt={latestProducts[item].title} className="m-auto h-[30vh] md:h-[36vh] block" src={latestProducts[item].img} />
              </p>
              <div className="mt-4 text-center md:text-left">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{latestProducts[item].category.charAt(0).toUpperCase() + latestProducts[item].category.slice(1)}</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{latestProducts[item].title}</h2>
                <p className="mt-1">₹{latestProducts[item].price}</p>
                {latestProducts[item].size[0] == '' && <div className="mt-1">
                  {latestProducts[item].size.map((size) => (
                    <span key={size} className="inline-block bg-white rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2">-</span>
                  ))}
                </div>}
                {latestProducts[item].size[0] != '' && <div className="mt-1">
                  {latestProducts[item].size.map((size) => (
                    <span key={size} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{size}</span>
                  ))}
                </div>}
                {latestProducts[item].color[0] == '' && <div className="mt-1">
                  {latestProducts[item].color.map((color) => (
                    <span key={color} style={{ backgroundColor: bgColorClasses[color.toLowerCase()] }} className={`inline-block border-2 border-white rounded-full text-sm font-semibold w-6 h-6 mr-2`}></span>
                  ))}
                </div>}
                {latestProducts[item].color[0] != '' && <div className="mt-1">
                  {latestProducts[item].color.map((color) => (
                    <span key={color} style={{ backgroundColor: bgColorClasses[color.toLowerCase()] }} className={`inline-block border-2 border-gray-300 rounded-full text-sm font-semibold w-6 h-6 mr-2`}></span>
                  ))}
                </div>}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeLatestProducts
