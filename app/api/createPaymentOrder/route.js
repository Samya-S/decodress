import Razorpay from 'razorpay'
import crypto from 'crypto'
import connectDB from '@/middleware/connectToDB';
import Order from '@/models/Order';
import jwt from 'jsonwebtoken';
import Product from '@/models/Product';

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


        // check if cart is tampered or available quantity is less than the quantity in cart
        const { cart, subtotal } = reqBody

        if (!cart || cart.length === 0 || !subtotal || subtotal <= 0) {
            return Response.json({ status: 400, success: false, error: "Cart is empty. Please build your cart and try again!" })
        }

        let totalPrice = 0
        for (let item of cart) {
            const product = await Product.findOne({ slug: item.itemCode })

            if (!product || !item.category || !item.name || !item.price || !item.quantity) {
                return Response.json({ status: 400, success: false, error: "Some products in your cart has been changed. Please try again!", cartIsTampered: true })
            }

            if (product.price !== item.price) {
                return Response.json({ status: 400, success: false, error: "Price of some items in your cart has been changed. Please try again!", cartIsTampered: true })
            }

            if (product.category.toLowerCase() !== item.category.toLowerCase() || product.title !== item.name || product.size !== item.size || product.color !== item.color) {
                return Response.json({ status: 400, success: false, error: "Some products in your cart has been changed. Please try again!", cartIsTampered: true })
            }

            if (product.availableQty < item.quantity) {
                return Response.json({ status: 400, success: false, error: "Some items in your cart went out of stock. Please try again!", cartIsTampered: true })
            }

            totalPrice += item.price * item.quantity
        }

        if (totalPrice !== subtotal) {
            return Response.json({ status: 400, success: false, error: "Price of some items in your cart has been changed. Please try again!", cartIsTampered: true })
        }


        // check if details provided are valid - [email, phone]
        const { email, phone, pincode } = reqBody
        if(phone.length !== 10 && !/^\d+$/.test(phone) /* only numbers check */) {
            return Response.json({ status: 400, success: false, error: "Please provide a valid 10 digit phone number!" })
        }
        if(pincode.length !== 6 && !/^\d+$/.test(pincode) /* only numbers check */) {
            return Response.json({ status: 400, success: false, error: "Please provide your 6 digit pincode!" })
        }

        // create a razorpay payment order
        const { amount, currency } = reqBody;

        const razorpayInstance = new Razorpay({
            key_id: key_id,
            key_secret: key_secret,
        });

        const options = {
            amount,
            currency,
            receipt: generateString(15)
        };

        const response = await razorpayInstance.orders.create(options)


        // initiate a order in the db corresponding to the payment order id - [name, email, phone, pincode are nto saved in the db]
        const { name, address } = reqBody
        const orderId = response.id
        const receipt = response.receipt

        const { jwtToken } = reqBody
        const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET)
        const userId = decodedToken.id

        cart.forEach(item => item.category = item.category.toLowerCase())   // lowercase all cart item category

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
        return Response.json({ status: error.status || 500, success: false, error: error.message + '. Please try again!' || "Internal Server Error. Please try again!" });
    }
}
