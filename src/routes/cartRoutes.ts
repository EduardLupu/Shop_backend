import express from "express";
import {addProductToCart, deleteProductFromCart, getCart} from "../controllers/cartController";
import bodyParser from "body-parser";
const jsonParser = bodyParser.json();

const cartRouter = express.Router();

cartRouter.get('/carts/:id', getCart);

cartRouter.post('/carts/:id', jsonParser, addProductToCart);
cartRouter.delete('/carts/:id', jsonParser, deleteProductFromCart);
export default cartRouter;