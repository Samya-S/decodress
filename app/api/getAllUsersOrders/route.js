import connectDB from "@/middleware/connectToDB";
import Order from "@/models/Order";

export async function GET(request) {
    try {
        // Calls the connect function to establish a connection to the database.
        await connectDB();

        const orders = await Order.find();

        return Response.json({
            status: 200,
            success: true, 
            orders: orders
        });
    } catch (error) {
        return Response.json({
            status: error.status || 500,
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
}
