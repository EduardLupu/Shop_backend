import express from "express";
import {createReturn, getReturns} from "../controllers/returnController";

const returnRouter = express.Router();

returnRouter.post('', createReturn);
returnRouter.get('', getReturns);
export default returnRouter;