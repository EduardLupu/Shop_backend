import {Schema, model} from "mongoose";

export interface Review {
    productId: number,
    userId: string,
    title: string,
    name: string,
    description: string,
    stars: number,
}

const reviewSchema = new Schema<Review>({
    productId: {
        type: Number,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    }
})

const ReviewModel = model('review', reviewSchema);

export default ReviewModel;