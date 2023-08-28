import express from "express";
import {createReview, getReviewsForProduct} from "../controllers/reviewController";

const reviewRouter = express.Router();

reviewRouter.post('', createReview);
reviewRouter.get('/:id', getReviewsForProduct);

export default reviewRouter;