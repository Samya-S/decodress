// import React from 'react'

const Order = () => {
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">CODESWEAR.COM</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order id: #974942</h1>

              <p className="leading-relaxed mb-4">Your order has been successfully placed</p>
              {/* <div class="flex">
                <a class="flex-grow border-b-2 border-gray-300 py-2 text-left text-lg px-1">Item</a>
                <a class="flex-grow border-b-2 border-gray-300 py-2 text-center text-lg px-1">Quantity</a>
                <a class="flex-grow border-b-2 border-gray-300 py-2 text-right text-lg px-1">Price</a>
              </div>
              <div className="flex py-2">
                <span className="flex-grow text-gray-500">Wear the Code (XL/Black)</span>
                <span className="flex-grow text-center text-gray-900">1</span>
                <span className="flex-grow text-right text-gray-900">₹499.00</span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="flex-grow text-gray-500">Wear the Code (XL/Blue)</span>
                <span className="flex-grow text-center text-gray-900">1</span>
                <span className="flex-grow text-right text-gray-900">₹499.00</span>
              </div>
              <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                <span className="text-gray-500">Wear the Code (L/Red)</span>
                <span className="mx-auto text-gray-900">1</span>
                <span className="ml-auto text-gray-900">₹499.00</span>
              </div> */}
              <div class="w-full mx-auto mb-6 overflow-auto">
                <table class="table-auto w-full text-left whitespace-no-wrap">
                  <thead>
                    <tr>
                      <th class="px-4 py-3 text-left tracking-wider font-normal text-gray-900 text-lg bg-gray-100 rounded-tl rounded-bl">Item</th>
                      <th class="px-4 py-3 text-center tracking-wider font-normal text-gray-900 text-lg bg-gray-100">Quantity</th>
                      <th class="px-4 py-3 text-right tracking-wider font-normal text-gray-900 text-lg bg-gray-100">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border-t-2 text-left border-gray-200 px-4 py-3">Wear the Code (L/Red)</td>
                      <td class="border-t-2 text-center border-gray-200 px-4 py-3">1</td>
                      <td class="border-t-2 text-right border-gray-200 px-4 py-3">₹499.00</td>
                    </tr>
                    <tr>
                      <td class="border-t-2 text-left border-gray-200 px-4 py-3">Wear the Code (XL/Black)</td>
                      <td class="border-t-2 text-center border-gray-200 px-4 py-3">1</td>
                      <td class="border-t-2 text-right border-gray-200 px-4 py-3">₹499.00</td>
                    </tr>
                    <tr>
                      <td class="border-t-2 border-b-2 text-left border-gray-200 px-4 py-3">Wear the Code (L/Blue)</td>
                      <td class="border-t-2 border-b-2 text-center border-gray-200 px-4 py-3">1</td>
                      <td class="border-t-2 border-b-2 text-right border-gray-200 px-4 py-3">₹499.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex items-center">
                <span className="title-font font-medium text-2xl text-gray-900">₹9845.00</span>
                <button class="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track order</button>
              </div>
            </div>
            {/* eslint-disable-next-line */}
            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Order
