import {Schema, model} from "mongoose";

export interface Review {
    productId: number,
    userId: string,
    title: string,
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
    description: {
        type: String,
        required: true,
    },
    stars: {
        type: Number,
        required: true
    }
})

const ReviewModel = model('review', reviewSchema);

export default ReviewModel;