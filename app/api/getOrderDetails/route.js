import connectDB from "@/middleware/connectToDB";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        // Calls the connect function to establish a connection to the database.
        await connectDB();

        const reqBody = await request.json();
        const orderId = reqBody.id;
        const { token } = reqBody;

        // Check if the token is valid.
        if (!token) {
            return Response.json({
                status: 401,
                success: false,
                error: "Unauthorized",
            });
        }

        // decode the token to get the user id.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        // Fetch the order details from the database.
        const order = await Order.findById(orderId);

        // Check if the order belongs to the user.
        if (order.userId.toString() !== userId) {
            return Response.json({
                status: 401,
                success: false,
                error: "Unauthorized",
            });
        }

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
