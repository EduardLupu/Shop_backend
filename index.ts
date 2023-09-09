import express from 'express'
import cors from 'cors'
import productRouter from "./src/routes/productRoutes";
import cartRouter from "./src/routes/cartRoutes";
import {connectToMongoDB} from "./src/utils/dbutils";
import userRouter from "./src/routes/userRoutes";
import dotenv from 'dotenv'
import orderRouter from "./src/routes/orderRoutes";
import reviewRoutes from "./src/routes/reviewRoutes";
import {getCategories} from "./src/controllers/productController";
import returnRoutes from "./src/routes/returnRoutes";
import {Request, Response} from "express";

dotenv.config();
connectToMongoDB().then(() => console.log('Connected to MongoDB'));

const app = express(), port = 3000;

app.use(cors({
    origin: "https://eduardlupu.github.io",
    credentials: true,
}));

app.use(express.json());
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/reviews', reviewRoutes);
app.use('/api/categories',  getCategories);
app.use('/api/return', returnRoutes);
app.use('/api', userRouter);
app.all('*', (req: Request, res: Response) => {
    res.status(404).json({message: `Route ${req.originalUrl} not found`});
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}, CORS-enabled web server`);
});