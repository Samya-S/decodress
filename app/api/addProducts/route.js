import Product from "@/models/Product";
import connectDB from "@/middleware/connectToDB";

export async function POST(request) {
    try {
        // Calls the connect function to establish a connection to the database.
        await connectDB();

        let products = [];
        const reqBody = await request.json();

        if (!Array.isArray(reqBody)) {
            return Response.json({
                status: 400,
                body: { success: false, error: "Please send an array of products!" },
            });
        }

        if (reqBody.length === 0) {
            return Response.json({
                status: 400,
                body: { success: false, error: "Please send at least one product!" },
            });
        }

        for (let i = 0; i < reqBody.length; i++) {
            // const slug = reqBody[i].title.toLowerCase().replace(/ /g, "-") + "-" + reqBody[i].category.toLowerCase().replace(/ /g, "-") + "-" + reqBody[i].color.toLowerCase().replace(/ /g, "-") + "-" + reqBody[i].size.toLowerCase().replace(/ /g, "-");
            const slug = reqBody[i].title.toLowerCase().replace(/ /g, "-") + (reqBody[i].color ? '-' : '') + reqBody[i].color.toLowerCase().replace(/ /g, "-") + (reqBody[i].size ? '-' : '') + reqBody[i].size.toLowerCase().replace(/ /g, "-");

            // if slug already exists, just increase the availableQty by the new availableQty and break the loop
            const existingProduct = await Product.findOneAndUpdate({ slug: slug }, { $inc: { availableQty: reqBody[i].availableQty } });
            if (existingProduct) {
                products.push(existingProduct);
                break;
            }

            const product = new Product({
                title: reqBody[i].title,
                slug: slug, // generate slug from title, color and size by making them lowercase and replacing spaces with hyphens
                description: reqBody[i].description,
                img: reqBody[i].img,
                category: reqBody[i].category,
                size: reqBody[i].size,
                color: reqBody[i].color,
                price: reqBody[i].price,
                availableQty: reqBody[i].availableQty,
            });

            if (product.title == "" || product.category == "" || product.img == "" || product.description == "" || product.price == "" || product.availableQty == "") {
                return Response.json({
                    status: 400,
                    body: { success: false, error: "Failed to add product! Please fill the required fields" },
                });
            }

            await product.save();
            products.push(product);
        }
        return Response.json({
            status: 201,
            body: { success: true, data: products },
        });
    } catch (error) {
        return Response.json({
            status: 500,
            body: { success: false, error: "Failed to add product! " + error.message },
        });
    }
}
