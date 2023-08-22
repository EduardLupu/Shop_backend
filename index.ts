import express from 'express'
import cors from 'cors'
import productRouter from "./src/routes/productRoutes";
import cartRouter from "./src/routes/cartRoutes";
import {connectToMongoDB} from "./src/utils/dbutils";

connectToMongoDB().then(() => console.log('Connected to MongoDB'));

const app = express(), port = 8080;

app.use(
    cors({
        origin: ["http://localhost:4000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(express.json());
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}, CORS-enabled web server`);
});