import CartModel, {Cart, CartProduct} from "../models/cartModel";
import ProductModel, {Product} from "../models/productModel";
import {getProjectionFields} from "../utils/getProjectionFields";
export const getCart = async (req: any, res: any) => {
    try {
        const cartProjection = getProjectionFields(req.query.select)
        const cart: Cart | null = await CartModel.findOne({id: req.params.id}, cartProjection);
        if (cart === null)
        {
            res.status(404).json({message: `Cart with id ${req.params.id} was not found`});
            return;
        }
        res.status(200).json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}

export const createCart = async (req: any, res: any) => {
    try {
        const id = +req.body.id;
        const userId = +req.body.userId;

        const newCart: Cart = {
            id: id, /// #TODO: THIS IS FOR NOW, change it later to get the cart id by default
            products: [],
            total: 0,
            discountedTotal: 0,
            userId: userId, /// #TODO: THIS IS FOR NOW, change it later to get the user id by default
            totalProducts: 0,
            totalQuantity: 0
        }

        await CartModel.create(newCart);
        res.status(200).json(newCart);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}

export const updateProductInCart = async (req: any, res: any) => {
    try {
        const cartProjection = getProjectionFields(req.query.select);
        const cart: Cart | null = await CartModel.findOne({id: req.params.id}, cartProjection);
        const product: Product | null = await ProductModel.findOne({id: req.body.id});
        if (cart === null)
        {
            res.status(404).json({message: `Cart with id ${req.params.id} was not found`});
            return;
        }
        if (product === null)
        {
            res.status(404).json({message: `Product with id ${req.body.id} was not found`});
            return;
        }
        const cartProduct: CartProduct = {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: req.body.quantity,
            image: product.images[0]
        }

        cart.products.push(cartProduct);
        cart.total += cartProduct.price;
        cart.totalProducts += 1;
        cart.totalQuantity += cartProduct.quantity;

        // await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}
export const deleteProductFromCart = async (req: any, res: any) => {
    try {
        const cart: Cart | null  = await CartModel.findOne({id: req.params.id});
        if (cart === null)
        {
            res.status(404).json({message: `Cart with id ${req.params.id} was not found`});
            return;
        }

        let product: CartProduct | undefined = cart.products.find((product: CartProduct) => product.id === req.body.id);
        if (product === undefined)
        {
            res.status(404).json({message: `Product with id ${req.body.id} was not found`});
            return;
        }
        const index = cart.products.indexOf(product);
        cart.total -= product.price;
        cart.totalProducts -= 1;
        cart.totalQuantity -= product.quantity;
        cart.products.splice(index, 1);

        // await cart.save();

        res.status(200).json(cart);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}