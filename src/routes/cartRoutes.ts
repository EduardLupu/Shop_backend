import express from "express";
import {addProductToCart, getCart} from "../controllers/cartController";
import bodyParser from "body-parser";
const jsonParser = bodyParser.json();

const cartRouter = express.Router();

cartRouter.get('/carts/:id', getCart);

cartRouter.post('/carts/:id', jsonParser, addProductToCart);
export default cartRouter;