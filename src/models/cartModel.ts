import {Schema, model} from "mongoose";

export interface CartProduct {
    id: number,
    title: string,
    price: number,
    quantity: number,
    thumbnail: string
}
export interface Cart {
    id: number,
    products: [CartProduct],
    total: number,
    discountedTotal: number,
    userId: number,
    totalProducts: number,
    totalQuantity: number
}

const cartSchema = new Schema<Cart>({
    id: Number,
    products: [{
        id: Number,
        title: String,
        price: Number,
        quantity: Number,
        thumbnail: String,
    }],
    total: Number,
    discountedTotal: Number,
    userId: Number,
    totalProducts: Number,
    totalQuantity: Number
});

const CartModel = model('cart', cartSchema);

export default CartModel;