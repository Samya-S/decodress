import Razorpay from 'razorpay'
import crypto from 'crypto'
import connectDB from '@/middleware/connectToDB';
import Order from '@/models/Order';
import Product from '@/models/Product';

const key_id = process.env.RZPAY_KEY_ID
const key_secret = process.env.RZPAY_KEY_SECRET


// ROUTE 2: verifying an order using: POST "/api/order/verifyOrder"
export async function POST(request) {
    try {
        // Calls the connect function to establish a connection to the database.
        await connectDB();

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
            // Update the order status to "Paid" and save the payment_id
            const order = await Order.findOneAndUpdate({ 'paymentInfo.orderId': order_id }, {
                status: "Paid",
                paymentInfo: {
                    orderId: order_id,
                    paymentId: payment_id,
                    razorpaySignature: razorpay_signature
                }
            });

            // Decrease availableQty of products in Product collection
            for (let item of order.products) {
                await Product.findOneAndUpdate({ slug: item.itemCode }, { $inc: { availableQty: -item.quantity } });
            }

            return Response.json({ status: 200, success: true, message: "Payment has been verified", order_id: order._id })
        }
        else {
            // Update the order status to "Pending"
            await Order.findOneAndUpdate({ 'paymentInfo.orderId': order_id }, {
                status: "Pending"
            });

            return Response.json({ status: 400, success: false, message: "Payment verification failed" })
        }
    }
    catch (error) {
        return Response.json({ status: error.status || 500, success: false, error: error.message || "Internal Server Error" });
    }
}
