import express from "express";
import {createOrder, deleteOrder, deliverOrder, getOrders} from "../controllers/orderController";

const orderRouter = express.Router();

orderRouter.get('', getOrders);
orderRouter.post('', createOrder);
orderRouter.delete('/:id', deleteOrder);
orderRouter.put('/:id', deliverOrder);
export default orderRouter;