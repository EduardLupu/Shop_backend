import ProductModel from "../models/productModel";

export const getProduct = async (req: any, res: any) => {
    try {
        const product = await ProductModel.findOne({id: req.params.id});
        if (product === null)
        {
            res.status(404).json({message: `Product with id ${req.params.id} was not found`});
            return;
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}
export const getProducts = async (req: any, res: any) => {
    try {
        const limit = +req.query.limit;
        const skip = +req.query.skip;
        const products = await ProductModel.find({}, null, {limit, skip});
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}