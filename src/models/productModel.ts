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
    thumbnail: string,
    brand: string,
    stock: number
}

const productSchema = new Schema<Product>({
    id: Number,
    title: String,
    description: String,
    price: Number,
    images: [String],
    category: String,
    rating: Number,
    discountPercentage: Number,
    thumbnail: String,
    brand: String,
    stock: Number,
});

const ProductModel = model('product', productSchema);
export default ProductModel;