import Razorpay from 'razorpay'
import crypto from 'crypto'

const key_id = process.env.RZPAY_KEY_ID
const key_secret = process.env.RZPAY_KEY_SECRET

// creating a random string for receipt
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

// creating an order using: POST "/api/createPaymentOrder"
export async function POST(request) {
    try {
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

        // creating an order
        const response = await razorpayInstance.orders.create(options)
        return Response.json({ status: 201, success: true, data: response })
    }
    catch (error) {
        return Response.json({ status: error.status || 500, success: false, error: error.message || "Internal Server Error" });
    }
}
