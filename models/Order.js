const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    email: { type: String, required: true },
    orderId: { type: String, required: true },
    paymentInfo: { type: String, default: '' },
    products: { type: Object, required: true },
    // products: [{
    //     productId: { type: String, required: true },
    //     quantity: { type: Number, default: 1 },
    // }],
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: 'Pending', required: true },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);

// mongoose.models = {};
// export default mongoose.model('Order', OrderSchema);