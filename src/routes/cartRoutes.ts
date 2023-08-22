import express from "express";
import {createCart, deleteProductFromCart, getCart, updateProductInCart} from "../controllers/cartController";

const cartRouter = express.Router();

cartRouter.get('/:id', getCart);
cartRouter.post('', createCart);
cartRouter.post('/:id', updateProductInCart);
cartRouter.delete('/:id', deleteProductFromCart);
export default cartRouter;