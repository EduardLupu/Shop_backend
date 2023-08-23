import express from "express";
import {
    addProductInCart, deleteCart,
    deleteProductFromCart, destroyProductFromCart,
    getCart,
} from "../controllers/cartController";

const cartRouter = express.Router();

cartRouter.get('', getCart);
cartRouter.post('/:id', addProductInCart);
cartRouter.delete('/:id', deleteProductFromCart);
cartRouter.delete('', deleteCart);
cartRouter.delete('/delete/:id', destroyProductFromCart);
export default cartRouter;