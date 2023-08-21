import {Schema, model} from "mongoose";

const cartSchema = new Schema({
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