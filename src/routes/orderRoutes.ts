import express from "express";
import {createOrder, deleteOrder, getOrders} from "../controllers/orderController";

const orderRouter = express.Router();

orderRouter.get('', getOrders);
orderRouter.post('', createOrder);
orderRouter.delete('/:id', deleteOrder);
export default orderRouter;