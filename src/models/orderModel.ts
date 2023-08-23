import {Schema, model} from "mongoose";
import {Cart} from "./cartModel";
export interface Order extends Cart{
    createdAt: Date,
    orderStatus: string,
    paymentMethod: string,
    shippingAddress: string
}

const orderSchema = new Schema<Order>({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    products: [{
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
    }],
    total: {
        type: Number,
        required: true,
    },
    totalProducts: {
        type: Number,
        required: true,
    },
    totalQuantity: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    orderStatus: {
        type: String,
        default: 'pending',
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    shippingAddress: {
        type: String,
        required: true,
    }
});

const OrderModel = model('order', orderSchema);

export default OrderModel;
