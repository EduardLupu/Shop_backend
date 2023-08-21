import {Schema, model} from "mongoose";

const productSchema = new Schema({
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