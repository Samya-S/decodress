// "use client"
// import { ToastContainer, toast } from 'react-toastify'

import HomeLatestProducts from "@/components/home/HomeLatestProducts";
import Link from "next/link";

export default function Home() {
  // if (typeof window !== 'undefined' && history.state.toastMsg) {
  //   toast.success(history.state.toastMsg, {
  //     position: "bottom-center",
  //     autoClose: 2000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //   });
  // }

  return (
    <main>
      <section>
        {/* eslint-disable-next-line */}
        <img src="/home.webp" alt="" width="100%" />
      </section>

      <section className="container px-5 pt-24 pb-10 mx-auto">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Collections</h1>
        <div className="h-1 w-20 bg-violet-500 rounded mb-4"></div>
        <div className="flex flex-wrap lg:flex-nowrap gap-8 justify-evenly items-center">
          <div className="xl:w-1/5 lg:w-1/4 md:w-1/3 p-4 w-[80vw] shadow-lg">
            <Link href="/tshirts">
              <p className="mt-5 h-[20rem] flex relative rounded overflow-hidden">
                {/* eslint-disable-next-line */}
                <img alt="tshirts" className="m-auto block" src="https://m.media-amazon.com/images/I/619uxmLCdvL._AC_UY1100_.jpg" />
              </p>
              <div className="mt-2 text-center rounded-full mx-auto">
                <h2 className="text-lg text-gray-900 font-medium title-font">T-Shirts</h2>
              </div>
            </Link>
          </div>
          <div className="xl:w-1/5 lg:w-1/4 md:w-1/3 p-4 w-[80vw] shadow-lg">
            <Link href="/hoodies">
              <p className="mt-5 h-[20rem] flex relative rounded overflow-hidden">
                {/* eslint-disable-next-line */}
                <img alt="hoodies" className="m-auto block" src="https://m.media-amazon.com/images/I/616m5VorixL._AC_UY1100_.jpg" />
              </p>
              <div className="mt-2 text-center rounded-full mx-auto">
                <h2 className="text-lg text-gray-900 font-medium title-font">Hoodies</h2>
              </div>
            </Link>
          </div>
          <div className="xl:w-1/5 lg:w-1/4 md:w-1/3 p-4 w-[80vw] shadow-lg">
            <Link href="/mugs">
              <p className="mt-5 h-[20rem] flex relative rounded overflow-hidden">
                {/* eslint-disable-next-line */}
                <img alt="mugs" className="m-auto block" src="https://m.media-amazon.com/images/I/71cjxhpc1CL._AC_UF894,1000_QL80_.jpg" />
              </p>
              <div className="mt-2 text-center rounded-full mx-auto">
                <h2 className="text-lg text-gray-900 font-medium title-font">Mugs</h2>
              </div>
            </Link>
          </div>
          <div className="xl:w-1/5 lg:w-1/4 md:w-1/3 p-4 w-[80vw] shadow-lg">
            <Link href="/stickers">
              <p className="mt-5 h-[20rem] flex relative rounded overflow-hidden">
                {/* eslint-disable-next-line */}
                <img alt="stickers" className="m-auto block" src="https://m.media-amazon.com/images/I/51S4Md9exRL._AC_UF894,1000_QL80_.jpg" />
              </p>
              <div className="mt-2 text-center rounded-full mx-auto">
                <h2 className="text-lg text-gray-900 font-medium title-font">Stickers</h2>
              </div>
            </Link>
            </div>
        </div>
      </section>

      <section className="container px-5 py-10 mx-auto">
        <HomeLatestProducts />
      </section>

      <section className="text-gray-600 text-center body-font">
        <div className="container px-5 py-20 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-violet-100 text-violet-500 mb-4">
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-3xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M14 6a2 2 0 1 0 -4 0c0 1.667 .67 3 2 4h-.008l7.971 4.428a2 2 0 0 1 1.029 1.749v.823a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-.823a2 2 0 0 1 1.029 -1.749l7.971 -4.428"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Premium Tshirts</h2>
                <p className="leading-relaxed text-base">Our T-Shirts are 100% made of cotton.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-violet-100 text-violet-500 mb-4">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" className="text-3xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Free Shipping</h2>
                <p className="leading-relaxed text-base">We ship all over India for FREE.</p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-violet-100 text-violet-500 mb-4">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" className="text-3xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v44.748c0 6.627 5.373 12 12 12h85.28c27.308 0 48.261 9.958 60.97 27.252H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h158.757c-6.217 36.086-32.961 58.632-74.757 58.632H12c-6.627 0-12 5.373-12 12v53.012c0 3.349 1.4 6.546 3.861 8.818l165.052 152.356a12.001 12.001 0 0 0 8.139 3.182h82.562c10.924 0 16.166-13.408 8.139-20.818L116.871 319.906c76.499-2.34 131.144-53.395 138.318-127.906H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-58.69c-3.486-11.541-8.28-22.246-14.252-32H308z"></path>
                  </svg>
                </div>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Exciting Offers</h2>
                <p className="leading-relaxed text-base">We provide amazing offers & discounts on our products.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <ToastContainer
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
      /> */}
    </main>
  )
}
