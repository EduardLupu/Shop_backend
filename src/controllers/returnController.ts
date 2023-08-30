import {Request, Response} from 'express';
import {getUser} from "./userController";
import ReturnModel, {ReturnInterface} from "../models/returnModel";
import OrderModel from "../models/orderModel";

export const createReturn = async (req: Request, res: Response) => {
    try {
        const user = await getUser(req, res);
        if (!user) {
            return;
        }

        const order =  await OrderModel.findOne({_id: req.body.orderId});

        if (!order) {
            res.status(404).json({message: `Order with id ${req.body.orderId} doesn't exist`});
            return;
        }

        if (order.orderStatus === 'pending') {
            res.status(400).json({message: `Order with id ${req.body.orderId} is pending`});
            return;
        }

        if (order.userId !== user._id.toString()) {
            res.status(401).json({message: `You are not authorized to return this order`});
            return;
        }

        let index = -1;

        for (let i = 0; i < order.products.length; i++) {
            if (order.products[i].id === req.body.product.id) {
                index = i;
                break;
            }
        }

        if (index === -1) {
            res.status(404).json({message: `Product with id ${req.body.product.id} doesn't exist in this order`});
            return;
        }

        const price = order.products[index].price;

        if (order.products[index].quantity == 1) {
            order.products.splice(index, 1);
            order.totalProducts--;
        }
        else {
            order.products[index].quantity--;
        }

        order.totalQuantity--;
        order.total -= price;

        if (order.totalQuantity === 0) {
            order.orderStatus = 'returned'
        }
        else {
            order.orderStatus = 'partially returned';
        }

        await order.save();



        const newReturn = {
            userId: user._id.toString(),
            orderId: req.body.orderId,
            product: req.body.product,
            reason: req.body.reason,
        }

        await ReturnModel.create(newReturn);
        res.status(200).json("Return created");
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}

export const getReturns = async (req: Request, res: Response) => {
    try {
        const user = await getUser(req, res);
        if (!user) {
            return;
        }
        const returns: ReturnInterface[] | null = await ReturnModel.find({userId: user._id});
        if (returns === null) {
            res.status(404).json({message: `User with id ${user._id} doesn't have returns`});
            return;
        }
        res.status(200).json(returns);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}