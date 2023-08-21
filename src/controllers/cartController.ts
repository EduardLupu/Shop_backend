import CartModel, {Cart, CartProduct} from "../models/cartModel";
import ProductModel from "../models/productModel";
export const getCart = async (req: any, res: any) => {
    try {
        const cart = await CartModel.findOne({id: req.params.id});
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

export const addProductToCart = async (req: any, res: any) => {
    try {
        const cart = await CartModel.findOne({id: req.params.id});
        const product = await ProductModel.findOne({id: req.body.id});
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
        cart.products.push(product);
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
        res.status(200).json(cart);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}