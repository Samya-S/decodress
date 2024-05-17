import Link from "next/link"
import bgColorClasses from "@/data/bgColorClasses.json"

async function getMugs() {
  const domain = process.env.HOSTING_DOMAIN
  const res = await fetch(`${domain}/api/getProducts`, { cache: "no-store" })
  const data = await res.json()

  const allMugs = await data.body.data.filter(product => product.category === "mug");

  let mugs = {}
  for (let item of allMugs) {
    if (item.title in mugs) {
      if (!mugs[item.title].color.includes(item.color) && item.availableQty > 0) {
        mugs[item.title].color.push(item.color)
      }
    }
    else {
      mugs[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        mugs[item.title].color = [item.color]
      }
      else {
        mugs[item.title].color = []
      }
    }
  }

  // sort the color object in alphabetical order
  for (let item in mugs) {
    mugs[item].color.sort()
  }

  // capitalize the first letter of color
  for (let item in mugs) {
    mugs[item].color = mugs[item].color.map(color => color.charAt(0).toUpperCase() + color.slice(1))
  }

  return mugs;
}


const Mugs = async () => {
  const mugs = await getMugs()

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-evenly items-center -m-4 min-h-[40vh]">
            {Object.keys(mugs).length === 0 &&
              <div className="text-center px-5">Sorry all the mugs are out of stock. New stock comming soon. Stay tuned!</div>
            }
            {Object.keys(mugs).map((item) => (
              <div key={mugs[item]._id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5">
                <Link href={'product/' + mugs[item].slug}>
                  <p className="mt-5 block relative rounded overflow-hidden">
                    {/* eslint-disable-next-line */}
                    <img alt={mugs[item].title} className="m-auto h-[30vh] md:h-[36vh] block" src={mugs[item].img} />
                  </p>
                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Mugs</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{mugs[item].title}</h2>
                    <p className="mt-1">₹{mugs[item].price}</p>
                    <div className="mt-1">
                      {mugs[item].color.map((color) => (
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

export default Mugs;
