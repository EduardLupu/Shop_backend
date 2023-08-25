import {Schema, model} from "mongoose";

export interface CartProduct {
    id: number,
    title: string,
    price: number,
    quantity: number,
    image: string
}

export interface Cart {
    userId: string
    products: CartProduct[],
    total: number,
    totalProducts: number,
    totalQuantity: number
}

const cartSchema = new Schema<Cart>({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    products: [{
        id: {
            type: Number,
            required: true,
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
    }
    ],
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
    }
});

const CartModel = model('cart', cartSchema);

export default CartModel;