import CartModel, {Cart, CartProduct} from "../models/cartModel";
import ProductModel, {Product} from "../models/productModel";
import {getUser} from "./userController";
import {Request, Response} from "express";
export const getCart = async (req: any, res: any) => {
    try {
        const user = await getUser(req, res);
        if (!user) {
            return;
        }
        let cart: Cart | null = await CartModel.findOne({userId: user._id});
        if (cart === null)
        {
            res.status(404).json({message: `User with id ${user._id} doesn't have a cart`});
            return;
        }
        res.status(200).json(cart);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}

export const createCart = async (userId: string) => {
    const newCart: Cart = {
        products: [],
        total: 0,
        userId: userId,
        totalProducts: 0,
        totalQuantity: 0
    }
    await CartModel.create(newCart);
    return newCart;
}

export const addProductInCart = async (req: Request, res: Response) => {
    try {

        const user = await getUser(req, res);
        if (!user) {
            return;
        }

        let cart = await CartModel.findOne({userId: user._id});
        if (!cart) {
            console.log("Cart not found");
            return;
        }
        const product: Product | null = await ProductModel.findOne({id: req.params.id});

        if (product === null)
        {
            res.status(404).json({message: `Product with id ${req.body.id} was not found`});
            return;
        }

        let cartProduct: CartProduct, index: number = -1;
        for (let i = 0; i < cart.products.length; i++)
        {
            if (cart.products[i].id === product.id)
            {
                index = i;
                break;
            }
        }

        if (index === -1)
        {
            cartProduct = {
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: 1,
                image: product.images[0]
            }
            cart.products.push(cartProduct);
            cart.totalProducts++;
        }
        else {
            cart.products[index] = {
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: cart.products[index].quantity + 1,
                image: product.images[0]
            }
        }

        cart.totalQuantity++;
        cart.total += product.price;

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}


export const deleteProductFromCart = async (req: any, res: any) => {
    try {

    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}