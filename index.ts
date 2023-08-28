import express from 'express'
import cors from 'cors'
import productRouter from "./src/routes/productRoutes";
import cartRouter from "./src/routes/cartRoutes";
import {connectToMongoDB} from "./src/utils/dbutils";
import userRouter from "./src/routes/userRoutes";
import dotenv from 'dotenv'
import orderRouter from "./src/routes/orderRoutes";
import reviewRoutes from "./src/routes/reviewRoutes";

dotenv.config();
connectToMongoDB().then(() => console.log('Connected to MongoDB'));

const app = express(), port = 8080;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(express.json());
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);
app.use('/api/reviews', reviewRoutes);
app.use('/api', userRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}, CORS-enabled web server`);
});