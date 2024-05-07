import Razorpay from 'razorpay'
import crypto from 'crypto'
import connectDB from '@/middleware/connectToDB';
import Order from '@/models/Order';
import jwt from 'jsonwebtoken';

const key_id = process.env.RZPAY_KEY_ID
const key_secret = process.env.RZPAY_KEY_SECRET

// creating a random string for receipt
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

// creating an order using: POST "/api/createPaymentOrder"
export async function POST(request) {
    try {
        // Calls the connect function to establish a connection to the database.
        await connectDB();

        const reqBody = await request.json();
        const { amount, currency } = reqBody;

        const razorpayInstance = new Razorpay({
            key_id: key_id,
            key_secret: key_secret,
        });

        // setting up options for razorpay order.
        const options = {
            amount,
            currency,
            receipt: generateString(15)
        };

        // creating an payment order
        const response = await razorpayInstance.orders.create(options)

        // initiate a order corresponding to the payment order id in the db
        const { name, email, contact, address, pincode, cart, subtotal } = reqBody
        const orderId = response.id
        const receipt = response.receipt

        const { jwtToken } = reqBody
        const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET)
        const userId = decodedToken.id

        // lowercase all cart item category
        cart.forEach(item => item.category = item.category.toLowerCase())

        const order = new Order({
            userId,
            orderId: receipt,
            paymentInfo: { orderId },
            address,
            amount: subtotal,
            products: cart
        })
        await order.save()

        return Response.json({ status: 201, success: true, data: { response, order } })
    }
    catch (error) {
        return Response.json({ status: error.status || 500, success: false, error: error.message || "Internal Server Error" });
    }
}
