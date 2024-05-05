import User from "@/models/User";
import connectDB from "@/middleware/connectToDB";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        // Calls the connect function to establish a connection to the database.
        await connectDB();
        
        const reqBody = await request.json();

        // Check if the user exists
        const user = await User.findOne({ email: reqBody.email });
        if (!user) {
            return Response.json({
                status: 400,
                body: { success: false, error: "Invalid Credentials" },
            });
        }

        // Check if the password is correct
        const isPasswordCorrect = await bcryptjs.compare(reqBody.password, user.password);
        if (!isPasswordCorrect) {
            return Response.json({
                status: 400,
                body: { success: false, error: "Invalid Credentials" },
            });
        }

        // Create a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2d" });

        // Send the token in the response        
        return Response.json({
            status: 201,
            body: { success: true, data: user, token },
        });
        
    } catch (error) {
        return Response.json({
            status: 500,
            body: { success: false, error: error.message },
        });
    }    
}
