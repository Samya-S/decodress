import Link from "next/link"
import bgColorClasses from "@/data/bgColorClasses.json"

async function getTshirts() {
  const domain = process.env.HOSTING_DOMAIN
  const res = await fetch(`${domain}/api/getProducts`, { cache: "no-store" })
  const data = await res.json()

  const allTshirts = await data.body.data.filter(product => product.category === "tshirt");

  let tshirts = {}
  for (let item of allTshirts) {
    if (item.title in tshirts) {
      if (!tshirts[item.title].color.includes(item.color) && item.availableQty > 0) {
        tshirts[item.title].color.push(item.color)
      }
      if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
        tshirts[item.title].size.push(item.size)
      }
    }
    else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color]
        tshirts[item.title].size = [item.size]
      }
      else {
        tshirts[item.title].color = []
        tshirts[item.title].size = []
      }
    }
  }

  // sort the size object in order of S, M, L, XL, XXL
  for (let item in tshirts) {
    tshirts[item].size.sort((a, b) => {
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
  for (let item in tshirts) {
    tshirts[item].color.sort()
  }

  // capitalize the first letter of color
  for (let item in tshirts) {
    tshirts[item].color = tshirts[item].color.map(color => color.charAt(0).toUpperCase() + color.slice(1))
  }

  return tshirts;
}


const Tshirts = async () => {
  const tshirts = await getTshirts()

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-evenly items-center -m-4 min-h-[40vh]">
            {Object.keys(tshirts).length === 0 &&
              <div className="text-center px-5">Sorry all the t-shirts are out of stock. New stock comming soon. Stay tuned!</div>
            }
            {Object.keys(tshirts).map((item) => (
              <div key={tshirts[item]._id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5">
                <Link href={'product/' + tshirts[item].slug}>
                  <p className="mt-5 block relative rounded overflow-hidden">
                    {/* eslint-disable-next-line */}
                    <img alt={tshirts[item].title} className="m-auto h-[30vh] md:h-[36vh] block" src={tshirts[item].img} />
                  </p>
                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-shirts</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{tshirts[item].title}</h2>
                    <p className="mt-1">₹{tshirts[item].price}</p>
                    <div className="mt-1">
                      {tshirts[item].size.map((size) => (
                        <span key={size} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{size}</span>
                      ))}
                    </div>
                    <div className="mt-1">
                      {tshirts[item].color.map((color) => (
                        <span key={color} style={{backgroundColor: bgColorClasses[color.toLowerCase()]}} className={`inline-block border-2 border-gray-300 rounded-full text-sm font-semibold w-6 h-6 mr-2`}></span>
                      ))}
                    </div>
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

export default Tshirts;
