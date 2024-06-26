import PincodeAvailability from "@/components/ProductSlug/ProductSlugPincodeAvailability"
import AddToCart from "@/components/ProductSlug/ProductSlugAddToCart";
import ProductSlugColorSize from "@/components/ProductSlug/ProductSlugColorSize";
import BuyNow from "@/components/ProductSlug/ProductSlugBuyNow";
import { notFound } from "next/navigation";

async function getProduct(slug) {
  const domain = process.env.HOSTING_DOMAIN
  const res = await fetch(`${domain}/api/getProducts`, { cache: "no-store" })
  const data = await res.json()

  const product = await data.body.data.filter(product => product.slug === slug)
  if (product.length === 0) {
    return { product, variants: {}, error: true }
  }

  const variants = await data.body.data.filter(prod => prod.title === product[0].title && prod.category === product[0].category)

  let colorSizeSlug = {}
  for (let item of variants) {
    if (item.color in colorSizeSlug) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
    else {
      colorSizeSlug[item.color] = {}
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
  }

  return { product, variants: colorSizeSlug, error: false }
}

const ProductSlug = async ({ params }) => {
  const domain = process.env.HOSTING_DOMAIN
  const { product, variants, error } = await getProduct(params.slug)

  if (error) {
    return notFound()
  }

  const productItem = (!error) && {
    itemCode: params.slug,
    name: product[0].title + (product[0].size || product[0].color ? (" (" + product[0].size + (product[0].size ? "/" : "") + product[0].color + ")") : ''),
    price: product[0].price,
    size: product[0].size,
    color: product[0].color,
    description: product[0].description,
    imgUrl: product[0].img,
    category: product[0].category.charAt(0).toUpperCase() + product[0].category.slice(1), // Capitalize the first letter
    availableQty: product[0].availableQty
  }

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container p-5 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            {/* eslint-disable-next-line */}
            <img alt={productItem.name} className="lg:w-1/2 w-full lg:h-auto h-auto px-14 object-cover object-center rounded" src={productItem.imgUrl} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">DECODRESS</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{productItem.name}</h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-violet-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-violet-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-violet-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-violet-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-violet-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{productItem.description}</p>
              <ProductSlugColorSize variants={variants} productItem={productItem} />
              <div className="flex flex-wrap gap-2">
                {productItem.availableQty > 0 && <span className="flex items-center title-font font-medium text-2xl text-gray-900">₹{productItem.price}</span>}
                {productItem.availableQty <= 0 && <span className="flex items-center title-font font-medium text-2xl text-gray-900">Out of stock!</span>}
                <div className="flex gap-4 ml-auto flex-wrap">
                  <AddToCart product={productItem} />
                  <BuyNow product={productItem} />
                </div>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 sm:ml-4">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
              <PincodeAvailability domain={domain} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductSlug
