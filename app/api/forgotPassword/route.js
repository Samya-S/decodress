import connectDB from "@/middleware/connectToDB";
import ForgotPassword from "@/models/ForgotPassword";
import User from "@/models/User";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export async function POST(request) {
    try {
        // Calls the connect function to establish a connection to the database.
        await connectDB();

        const reqBody = await request.json();
        const { sendMail } = reqBody;

        if (sendMail) {
            const { email } = reqBody;

            // find the user with the email 
            const user = await User.findOne({ email });

            if (!user) {
                return Response.json({
                    status: 404,
                    success: false,
                    error: "Your email is not registered. Please sign up!",
                });
            }

            // Generate a random token hasing the email - [ need to add a expiry time ]
            const token = await bcryptjs.hash(email, await bcryptjs.genSalt(10));

            // find if there is an existing token for the user
            const existingToken = await ForgotPassword.findOne({ userId: user._id });

            if (existingToken) {
                // update the token in the database
                existingToken.token = token;
                await existingToken.save();
            }
            else {
                const forgotPass = new ForgotPassword({
                    userId: user._id,
                    email,
                    token
                });
                await forgotPass.save();
            }

            const emailBody = `Hi ${user.name},
            <br><br>
            It seems like you forgot your password for DECODRESS. If this is true, click the link below to reset your password.<br>
            Reset password: <a href="${process.env.HOSTING_DOMAIN}/forgotpassword?token=${token}">Click here</a>
            <br><br>
            If you did not forget your password, please disregard this email.
            <br><br>
            If you feel like your password has been compromised, please change your password immediately by going to your My Account page.
            <br><br>
            Regards,<br>
            The Decodress Team`

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.NODEMAILER_AUTH_EMAIL,
                    pass: process.env.NODEMAILER_AUTH_EMAIL_PASSWORD,
                },
            });

            const mailOptions = {
                from: process.env.NODEMAILER_AUTH_EMAIL,
                to: email,
                subject: 'Password Reset',
                html: emailBody,
            };

            let { status, success, message } = await new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        reject({ status: 500, success: false, message: error });
                    } else {
                        resolve({ status: 200, success: true, message: info.response });
                    }
                });
            });

            return Response.json({
                status: status,
                success: success,
                message: message,
                // message: "Password reset link sent to your email.",
            });
        }
        else {
            const { token, password } = reqBody;

            // verify if token matches the token in the database
            const forgotPass = await ForgotPassword.findOne({ token });

            if (!forgotPass) {
                return Response.json({
                    status: 404,
                    success: false,
                    error: "Invalid request! Please request a new password reset link.",
                });
            }

            const isTokenValid = await bcryptjs.compare(forgotPass.email, token);

            if (!isTokenValid) {
                return Response.json({
                    status: 404,
                    success: false,
                    error: "Invalid token! Please request a new password reset link.",
                });
            }

            // find the user with the userId
            const user = await User.findById(forgotPass.userId);

            if (!user) {
                return Response.json({
                    status: 404,
                    success: false,
                    error: "User not found.",
                });
            }

            // update the password in the user model
            const salt = await bcryptjs.genSalt(10);
            user.password = await bcryptjs.hash(password, salt);
            await user.save();

            // delete the token from the database
            await forgotPass.deleteOne();

            return Response.json({
                status: 200,
                success: true,
                message: "Password reset successful.",
            });
        }


    } catch (error) {
        return Response.json({
            status: 500,
            success: false,
            error: error.message,
        });
    }
}
