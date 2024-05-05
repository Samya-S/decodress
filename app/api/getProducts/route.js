import Product from "@/models/Product";
import connectDB from "@/middleware/connectToDB";

export async function GET(request) {
    try {
        // Calls the connect function to establish a connection to the database.
        const dbIsConnected = await connectDB();//
        if (!dbIsConnected) {//
            return Response.json({//
                status: 500,//
                body: { success: false, error: "Failed to connect to the database" },//
            });//
        }//

        const products = await Product.find();
        return Response.json({
            status: 200,
            body: { success: true, data: products },
        });        
    } catch (error) {
        return Response.json({
            status: 500,
            body: { success: false, error: error.message },
        });
    }
}
