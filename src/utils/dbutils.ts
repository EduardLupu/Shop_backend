import mongoose from "mongoose";

/**
 * Connects to MongoDB database
 */
export const connectToMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/shopdb');
    } catch (error) {
        console.log(error)
    }
}

