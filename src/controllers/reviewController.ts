import ReviewModel, {Review} from "../models/reviewModel";
import {Request, Response} from "express";
import {getUser} from "./userController";
import {getProjectionFields} from "../utils/getProjectionFields";

/**
 * Create a review for a given product.
 * @param req
 * @param res
 */
export const createReview = async (req: Request, res: Response) => {
    try {
        const user = await getUser(req, res);
        if (!user) {
            return;
        }
        const newReview = {
            userId: user._id,
            productId: req.body.productId,
            title: req.body.reviewTitle,
            description: req.body.reviewDescription,
            stars: req.body.reviewStars
        }
        await ReviewModel.create(newReview);
        res.status(200).json(newReview);
    } catch (error){
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}

/**
 * Show all the reviews for a certain product
 * @param req
 * @param res
 */
export const getReviewsForProduct = async (req: Request, res: Response) => {
    try {
        const user = await getUser(req, res);
        if (!user) {
            return;
        }
        const projection = getProjectionFields(req.query.select as string | undefined),
            reviews: Review[] | null = await ReviewModel.find({productId: req.params.id}, projection);
        if (reviews === null)
        {
            res.status(404).json({message: `Product with id ${req.params.id} doesn't have reviews`});
            return;
        }
        res.status(200).json(reviews);
    } catch (error){
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}