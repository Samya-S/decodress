import Product from "@/models/Product";
import connectDB from "@/middleware/connectToDB";

// Calls the connect function to establish a connection to the database.
connectDB();

export async function PUT(request) {
    try {
        const reqBody = await request.json();
        let products = [];
        for (let i = 0; i < reqBody.length; i++) {
            const product = await Product.findByIdAndUpdate(reqBody[i]._id, reqBody[i]);
            products.push(product);
        }
        return Response.json({
            status: 200,
            body: { success: true, data: products },
        });
    }
    catch (error) {
        return Response.json({
            status: 500,
            body: { success: false, error: error.message },
        });
    }
}
