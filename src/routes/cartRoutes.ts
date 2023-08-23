import express from "express";
import {
    addProductInCart,
    deleteProductFromCart,
    getCart,
} from "../controllers/cartController";

const cartRouter = express.Router();

cartRouter.get('', getCart);
cartRouter.post('/:id', addProductInCart);
cartRouter.delete('/:id', deleteProductFromCart);
export default cartRouter;