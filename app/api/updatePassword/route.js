import connectDB from "@/middleware/connectToDB";
import User from "@/models/User";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
    try {
        // Calls the connect function to establish a connection to the database.
        await connectDB();

        const reqBody = await request.json();
        const { token, oldPassword, newPassword } = reqBody;

        if (!token || !oldPassword || !newPassword) {
            return Response.json({ status: 400, success: false, message: "Please provide all the fields", });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user exists to crosscheck the token tamparing
        const user = await User.findById(decodedToken.id);
        if (!user) {
            return Response.json({ status: 404, success: false, message: "User not found", });
        }

        // Check if the oldPassword matches the password in the database
        const isMatch = await bcryptjs.compare(oldPassword, user.password);
        if (!isMatch) {
            return Response.json({ status: 400, success: false, message: "Invalid old password", });
        }

        // Check if the new password is same as the old password
        if (oldPassword === newPassword) {
            return Response.json({ status: 400, success: false, message: "New password should be different from the old password", });
        }

        // Encrypt the new password and save it to the database
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(newPassword, salt);
        await user.save();

        // drop password from the user object
        // let userDetails = user.toObject();
        // delete userDetails.password;

        return Response.json({ status: 200, success: true, /* user: userDetails */ });
    }
    catch (error) {
        return Response.json({
            status: error.status || 500,
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
}
