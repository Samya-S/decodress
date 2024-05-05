import User from "@/models/User";
import connectDB from "@/middleware/connectToDB";
import bcryptjs from "bcryptjs";

export async function POST(request) {
    try {
        // Calls the connect function to establish a connection to the database.
        await connectDB();

        const reqBody = await request.json();

        // Check if the user already exists
        const userExists = await User.findOne({ email: reqBody.email });
        if (userExists) {
            return Response.json({
                status: 400,
                body: { success: false, error: "User already exists" },
            });
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(reqBody.password, await bcryptjs.genSalt(10));

        // Create a new user
        const user = new User({
            name: reqBody.name,
            email: reqBody.email,
            password: hashedPassword,
        });

        // Save the user to the database
        const savedUser = await user.save();

        return Response.json({
            status: 201,
            body: { success: true, data: savedUser },
        });
    }
    catch (error) {
        return Response.json({
            status: error.status,
            body: { success: false, error: error.message },
        });
    }
}
