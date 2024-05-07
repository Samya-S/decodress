import connectDB from "@/middleware/connectToDB";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        // Calls the connect function to establish a connection to the database.
        await connectDB();

        const reqBody = await request.json();
        const { token } = reqBody;

        // Find the user with the given token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const orders = await Order.find({ userId: decodedToken.id });

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
