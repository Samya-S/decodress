import Product from "@/models/Product";
import connectDB from "@/middleware/connectToDB";

// Calls the connect function to establish a connection to the database.
connectDB();

export async function POST(request) {
    try {
        let products = [];
        const reqBody = await request.json();
        for (let i = 0; i < reqBody.length; i++) {
            const product = new Product({
                title: reqBody[i].title,
                slug: reqBody[i].slug,
                description: reqBody[i].description,
                img: reqBody[i].img,
                category: reqBody[i].category,
                size: reqBody[i].size,
                color: reqBody[i].color,
                price: reqBody[i].price,
                availableQty: reqBody[i].availableQty,
            });
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
            body: { success: false, error: error.message },
        });
    }    
}
