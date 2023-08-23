import OrderModel from "../models/orderModel";
import {getUser} from "./userController";
import {Request, Response} from "express";
import CartModel from "../models/cartModel";
import {createCart} from "./cartController";
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
        if (cart.products.length === 0)
        {
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}
