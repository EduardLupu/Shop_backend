import OrderModel from "../models/orderModel";
import {getUser} from "./userController";
import {Request, Response} from "express";
import CartModel from "../models/cartModel";
import {createCart} from "./cartController";

/**
 * Get the orders for the current loggedIn user
 * If the user is not logged in, it will return a 401 status code
 * @param req
 * @param res
 */
export const getOrders = async (req: Request, res: Response) => {
    try {
        const user = await getUser(req, res);
        if (!user) {
            return;
        }
        const orders = await OrderModel.find({userId: user._id});
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}
/**
 * Create an order for the current loggedIn user
 * @param req
 * @param res
 */
export const createOrder = async (req: Request, res: Response) => {
    try {
        const user = await getUser(req, res);
        if (!user) {
            return;
        }
        const cart = await CartModel.findOne({userId: user._id});
        if (!cart) {
            return;
        }
        if (cart.products.length === 0) {
            res.status(400).json({message: `Cart is empty`});
            return;
        }

        if (!req.body.paymentMethod || !req.body.shippingAddress) {
            res.status(400).json({message: `Payment method and shipping address are required`});
            return;
        }

        const newOrder = {
            userId: user._id,
            products: cart.products,
            total: cart.total,
            totalProducts: cart.totalProducts,
            totalQuantity: cart.totalQuantity,
            paymentMethod: req.body.paymentMethod,
            shippingAddress: req.body.shippingAddress,
        }

        await OrderModel.create(newOrder);
        await CartModel.deleteOne({userId: user._id});
        const newCart = await createCart(user._id.toString());
        res.status(200).json(newCart);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}

/**
 * Delete a pending order with the given id in request params for the current loggedIn user
 * If the order is not found or is not pending, it will return a 404 status code
 * @param req
 * @param res
 */

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const user = await getUser(req, res);
        if (!user) {
            return;
        }
        const deletedOrderInfo = await OrderModel.deleteOne({
            userId: user._id,
            _id: req.params.id,
            orderStatus: 'pending'
        });
        if (deletedOrderInfo.deletedCount === 0) {
            res.status(404).json({message: `Order with id ${req.params.id} was not found or is not pending`});
            return;
        }
        const orders = await OrderModel.find({userId: user._id});
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}

export const deliverOrder = async (req: Request, res: Response) => {
    try {
        const user = await getUser(req, res);
        if (!user) {
            return;
        }
        const order = await OrderModel.findOne({
            userId: user._id,
            _id: req.params.id,
            orderStatus: 'pending'
        });
        if (!order) {
            res.status(404).json({message: `Order with id ${req.params.id} was not found or is not pending`});
            return;
        }
        order.orderStatus = 'delivered';
        await order.save();
        res.status(200).json({message: `Order with id ${req.params.id} was delivered`});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}