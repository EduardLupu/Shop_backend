import express from "express";
import {getProduct, getProducts, getProductsByCategory, getProductsBySearch} from "../controllers/productController";

const productRouter = express.Router();

productRouter.get('', getProducts);
productRouter.get('/:id', getProduct);
productRouter.get('/category/:category', getProductsByCategory);
productRouter.get('/search/:search', getProductsBySearch);
export default productRouter;