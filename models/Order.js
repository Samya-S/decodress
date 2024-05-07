const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    orderId: { type: String, required: true },
    paymentInfo: { 
        orderId: { type: String, required: true },
        paymentId: { type: String, default: '' },
        razorpaySignature: { type: String, default: ''},
     },
    products: { type: Object, required: true },
    // products: [{
    //     productId: { type: String, required: true },
    //     quantity: { type: Number, default: 1 },
    // }],
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: 'Initiated', required: true },
    deliveryStatus: { type: String, default: 'Unshipped', required: true },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);

// mongoose.models = {};
// export default mongoose.model('Order', OrderSchema);