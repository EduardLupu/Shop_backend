import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import productRouter from "./src/routes/productRoutes";
import cartRouter from "./src/routes/cartRoutes";

const app = express(), port = 8080

const connectToMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/shopdb');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error)
    }
}

connectToMongoDB();

app.use(cors());

app.use('/api', productRouter);
app.use('/api', cartRouter);



app.listen(port, () => {
    console.log(`Server listening on port ${port}, CORS-enabled web server`);
});