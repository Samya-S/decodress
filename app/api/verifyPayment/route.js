import Razorpay from 'razorpay'
import crypto from 'crypto'

const key_id = process.env.RZPAY_KEY_ID
const key_secret = process.env.RZPAY_KEY_SECRET


// ROUTE 2: verifying an order using: POST "/api/order/verifyOrder"
export async function POST(request) {
    try {
        /* Receive Payment Data */
        const reqBody = await request.json();
        const { order_id, payment_id, razorpay_signature } = reqBody;
        // const razorpay_signature = req.headers['x-razorpay-signature'];

        const keySecret = key_secret;

        /* Verification & Send Response to User */        
        let hmac = crypto.createHmac('sha256', keySecret);  // Creating hmac object         
        hmac.update(order_id + "|" + payment_id);   // Passing the data to be hashed         
        const generated_signature = hmac.digest('hex'); // Creating the hmac in the required format 

        if (razorpay_signature === generated_signature) {
            return Response.json({ status: 200, success: true, message: "Payment has been verified" })
        }
        else {
            return Response.json({ status: 400, success: false, message: "Payment verification failed" })
        }
    }
    catch (error) {
        return Response.json({ status: error.status || 500, success: false, error: error.message || "Internal Server Error" });
    }
}
