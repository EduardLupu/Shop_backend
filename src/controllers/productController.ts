import ProductModel, {Product} from "../models/productModel";
import {getProjectionFields} from "../utils/getProjectionFields";
import {Request, Response} from "express";

/**
 * Get the product with the given id in request params
 * The user doesn't have to be logged in
 * projection can be used to select which fields to return, if needed
 * @param req
 * @param res
 */
export const getProduct = async (req: Request, res: Response) => {
    try {
        const projection = getProjectionFields(req.query.select as string | undefined);
        const product: Product | null = await ProductModel.findOne({id: req.params.id}, projection);
        if (product === null) {
            res.status(404).json({message: `Product with id ${req.params.id} was not found`});
            return;
        }
        res.status(200).json(product);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}

/**
 * Get products with pagination based on the given limit and skip query params
 * The user doesn't have to be logged in
 * projection can be used to select which fields to return, if needed
 * @param req
 * @param res
 */
export const getProducts = async (req: Request, res: Response) => {
    try {
        const limit = !req.query.limit ? 6 : +req.query.limit;
        const skip = !req.query.skip ? 0 : +req.query.skip;
        const projection = getProjectionFields(req.query.select as string | undefined);
        const products: Product[] = await ProductModel.find({}, projection, {limit, skip});
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}

/**
 * Get all products with the given category in the request params
 * @param req
 * @param res
 */
export const getProductsByCategory = async (req: Request, res: Response) => {
    try {
        const category = req.params.category,
            projection = getProjectionFields(req.query.select as string | undefined),
            products: Product[] = await ProductModel.find({category}, projection);
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}

/**
 * Get all products with the given search in the request params in the title, description, category or brand
 *
 * @param req
 * @param res
 */
export const getProductsBySearch = async (req: Request, res: Response) => {
    try {
        const search = req.params.search;
        const projection = getProjectionFields(req.query.select as string | undefined);
        const products: Product[] = await ProductModel.find(
            {
                $or: [
                    {title: {$regex: search, $options: 'i'}},
                    {description: {$regex: search, $options: 'i'}},
                    {category: {$regex: search, $options: 'i'}},
                    {brand: {$regex: search, $options: 'i'}}
                ]
            },
            projection);
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories: string[] = await ProductModel.distinct('category');
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}