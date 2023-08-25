import {Schema, model} from "mongoose";

export interface Product {
    id: number,
    title: string,
    description: string,
    price: number,
    images: string[],
    category: string,
    rating: number,
    discountPercentage: number,
    brand: string,
    stock: number
}

const productSchema = new Schema<Product>({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    images: [{
        type: String,
        required: true,
    }],
    category: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    discountPercentage: {
        type: Number,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
});

const ProductModel = model('product', productSchema);
export default ProductModel;