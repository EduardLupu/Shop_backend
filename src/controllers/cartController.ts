import CartModel, {Cart, CartProduct} from "../models/cartModel";
import ProductModel, {Product} from "../models/productModel";
import {getUser} from "./userController";
import {Request, Response} from "express";

/**
 * Get the cart for the current loggedIn user; if the user doesn't have a cart, it doesn't create one
 * If the user is not logged in, it will return a 401 status code
 *
 * @param req
 * @param res
 */
export const getCart = async (req: Request, res: Response) => {
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

/**
 * Create a cart for a user with the given userId (shouldn't be called directly)
 * @param userId
 */
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

/**
 * Add a product with the given id in request params to the cart of the current loggedIn user
 * If the products exists, it increases its quantity by 1, otherwise it adds it to the cart with quantity 1
 * @param req
 * @param res
 */
export const addProductInCart = async (req: Request, res: Response) => {
    try {

        const user = await getUser(req, res);
        if (!user) {
            return;
        }

        let cart = await CartModel.findOne({userId: user._id});
        if (!cart) {
            return;
        }
        const product: Product | null = await ProductModel.findOne({id: req.params.id});

        if (product === null)
        {
            res.status(404).json({message: `Product with id ${req.params.id} was not found`});
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

/**
 * Delete/remove a product with the given id in request params from the cart of the current loggedIn user
 * If the product exists, it decreases its quantity by 1, otherwise it returns a 404 status code
 * If the product quantity is 0, it deletes it from the cart
 * @param req
 * @param res
 */
export const deleteProductFromCart = async (req: Request, res: Response) => {
    try {
        const user = await getUser(req, res);
        if (!user) {
            return;
        }
        let cart = await CartModel.findOne({userId: user._id});
        if (!cart) {
            return;
        }
        let index: number = -1;
        for (let i = 0; i < cart.products.length; i++)
        {
            if (cart.products[i].id === +req.params.id)
            {
                index = i;
                break;
            }
        }
        if (index === -1)
        {
            res.status(404).json({message: `Product with id ${req.params.id} was not found in the cart`});
            return;
        }
        else {
            const product = cart.products[index];
            if (cart.products[index].quantity === 1) {
                cart.products.splice(index, 1);
                cart.totalProducts--;
            }
            else {
                cart.products[index] = {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: product.quantity - 1,
                    image: product.image
                }
            }
            cart.totalQuantity--;
            cart.total -= product.price;
            await cart.save();
            res.status(200).json(cart);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}

/**
 * Delete the cart of the current loggedIn user
 * If the user doesn't have a cart, it returns a 404 status code
 * If the user has a cart, it deletes it and creates a new one
 * @param req
 * @param res
 */
export const deleteCart = async (req: Request, res: Response) => {
    try {
        const user = await getUser(req, res);
        if (!user) {
            return;
        }
        const deletedCartInfo = await CartModel.deleteOne({userId: user._id});
        if (deletedCartInfo.deletedCount === 0)
        {
            res.status(404).json({message: `Cart for user ${user._id} was not found`});
            return;
        }
        const newCart = await createCart(user._id.toString());
        res.status(200).json(newCart);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}

/**
 * Delete a product, no matter the quantity, with the given id in request params from the cart of the current loggedIn user
 *
 * @param req
 * @param res
 */
export const destroyProductFromCart = async (req: Request, res: Response) => {
    try {
        const user = await getUser(req, res);
        if (!user) {
            return;
        }
        let cart = await CartModel.findOne({userId: user._id});
        if (!cart) {
            return;
        }
        let index: number = -1;
        for (let i = 0; i < cart.products.length; i++)
        {
            if (cart.products[i].id === +req.params.id)
            {
                index = i;
                break;
            }
        }
        if (index === -1) {
            res.status(404).json({message: `Product with id ${req.params.id} was not found in the cart`});
            return;
        }
        else {
            const product = cart.products[index];
            cart.products.splice(index, 1);
            cart.totalProducts--;
            cart.totalQuantity -= product.quantity;
            cart.total -= product.price * product.quantity;
            await cart.save();
            res.status(200).json(cart);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}