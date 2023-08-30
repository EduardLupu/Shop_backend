import {Schema, model} from "mongoose";
export interface ReturnInterface {
    userId: string,
    orderId: string,
    product: {
        id: number,
        image: string,
        title: string,
        price: number,
    }
    createdAt: Date,
    reason: string,
}

const returnSchema = new Schema<ReturnInterface>({
    userId: {
        type: String,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
    },
    product: {
        id: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        }
    },
    createdAt: {
        type: Date,
        default: new Date(),
        required: false,
    },
    reason: {
        type: String,
        required: true,
    },
});

const ReturnModel = model('return', returnSchema);

export default ReturnModel;

