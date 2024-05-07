import connectDB from "@/middleware/connectToDB";
import Order from "@/models/Order";

export async function POST(request) {
    try {
        // Calls the connect function to establish a connection to the database.
        await connectDB();

        const reqBody = await request.json();
        const orderId = reqBody.id;

        // Fetch the order details from the database.
        const order = await Order.findById(orderId);

        return Response.json({
            status: 200,
            success: true,
            order: order,
        });
    } catch (error) {
        return Response.json({
            status: 500,
            success: false,
            error: error.message,
        });
    }
}
