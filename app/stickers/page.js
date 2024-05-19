import Link from "next/link"

async function getStickers() {
  const domain = process.env.HOSTING_DOMAIN
  const res = await fetch(`${domain}/api/getProducts`, { cache: "no-store" })
  const data = await res.json()

  const allStickers = await data.body.data.filter(product => product.category === "sticker");

  let stickers = {}
  for (let item of allStickers) {
    if (item.title in stickers) {
      if (!stickers[item.title].color.includes(item.color) && item.availableQty > 0) {
        stickers[item.title].color.push(item.color)
      }
    }
    else {
      stickers[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        stickers[item.title].color = [item.color]
      }
      else {
        stickers[item.title].color = []
      }
    }
  }

  // sort the color object in alphabetical order
  for (let item in stickers) {
    stickers[item].color.sort()
  }

  // capitalize the first letter of color
  for (let item in stickers) {
    stickers[item].color = stickers[item].color.map(color => color.charAt(0).toUpperCase() + color.slice(1))
  }

  return stickers;
}


const Stickers = async () => {
  const stickers = await getStickers()

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-evenly items-center -m-4 min-h-[40vh]">
            {Object.keys(stickers).length === 0 &&
              <div className="text-center px-5">Sorry all the stickers are out of stock. New stock comming soon. Stay tuned!</div>
            }
            {Object.keys(stickers).map((item) => (
              <div key={stickers[item]._id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5">
                <Link href={'product/' + stickers[item].slug}>
                  <p className="mt-5 block relative rounded overflow-hidden">
                    {/* eslint-disable-next-line */}
                    <img alt={stickers[item].title} className="m-auto h-[30vh] md:h-[36vh] block" src={stickers[item].img} />
                  </p>
                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Stickers</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{stickers[item].title}</h2>
                    <p className="mt-1">₹{stickers[item].price}</p>                    
                  </div>
                </Link>
              </div>
            ))}

          </div>
        </div>
      </section>
    </div>
  )
}

export default Stickers;
