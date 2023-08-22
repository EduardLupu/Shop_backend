import {Schema, model} from "mongoose";

export interface CartProduct {
    id: number,
    title: string,
    price: number,
    quantity: number,
    image: string
}
export interface Cart {
    id: number,
    products: CartProduct[],
    total: number,
    discountedTotal: number,
    userId: number,
    totalProducts: number,
    totalQuantity: number
}

const cartSchema = new Schema<Cart>({
    id: {
        type: Number,
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
    discountedTotal: {
        type: Number,
        required: true,
    },
    userId: {
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
    }
});

const CartModel = model('cart', cartSchema);

export default CartModel;