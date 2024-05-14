import connectDB from "@/middleware/connectToDB";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        // Calls the connect function to establish a connection to the database.
        await connectDB();

        const reqBody = await request.json();
        const { token } = reqBody;

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decodedToken.id);

        return Response.json({
            status: 200,
            success: true, 
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                pincode: user.pincode,
                isAdmin: user.isAdmin,
                // city: user.city,
                // state: user.state,
            }
        });
    } catch (error) {
        return Response.json({
            status: error.status || 500,
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
}
