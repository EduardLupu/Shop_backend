import UserModel, {Data, User} from "../models/userModel";
import {Request, Response} from "express";
import {createSecretToken, decodeToken} from "../utils/authmiddleware";
import bcrypt from "bcrypt";
import {createCart} from "./cartController";

/**
 * Register a new user, if the email is not already registered
 * After registering, it creates a cart for the user
 * It returns the auth token for the user if the registration is successful
 *
 * @param req
 * @param res
 */
export const registerUser = async (req: Request, res: Response) => {
    try {
        const {firstName, lastName, email, birthDate, password} = req.body;

        if (!firstName || !lastName || !email || !birthDate || !password) {
            res.status(400).json({message: `Missing required fields`});
            return;
        }

        const existingUser: User | null = await UserModel.findOne({email});

        if (existingUser) {
            res.status(400).json({message: `User with email ${email} already exists`});
            return;
        }

        const newUser: User = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            birthDate: birthDate,
            password: password,
        }

        const user = await UserModel.create(newUser);
        const token = createSecretToken(user._id.toString(), user.email);

        await createCart(user._id.toString());

        res.status(201).json({token: token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}

/**
 * Login a user with the given email and password
 * It returns the auth token for the user if the login is successful
 *
 * @param req
 * @param res
 */
export const loginUser = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(404).json({message: 'All fields are required'})
        }
        const user = await UserModel.findOne({email});
        if (!user) {
            return res.status(404).json({message: 'E-mail is not registered'})
        }
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res.status(404).json({message: 'Incorrect password!'})
        }

        user.lastTimeOnline = new Date();
        await user.save();

        const token = createSecretToken(user._id.toString(), user.email);
        res.status(200).json({token: token});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}

/**
 * It log outs the current loggedIn user
 * It updates the lastTimeOnline field for the user
 * It returns a 200 status code if the logout is successful
 *
 * @param req
 * @param res
 */
export const logoutUser = async (req: Request, res: Response) => {
    try {
        const user = await getUser(req, res);
        if (!user) {
            return;
        }

        user.lastTimeOnline = new Date();
        await user.save();

        res.status(200).json({message: "User logged out successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}

/**
 * Get the profile of the current loggedIn user
 * It returns a 200 status code and the user profile if the user is logged in
 * @param req
 * @param res
 */
export const userProfile = async (req: Request, res: Response) => {
    try {
        const user = await getUser(req, res);
        if (!user) {
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}

/**
 * Get the user by the decoded token form the request header
 * This function is used as a middleware for every function that needs authorization
 * It returns the user if the token is valid and the user exists
 * @param req
 * @param res
 */
export const getUser = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({message: "Missing Authorization Header"});
        return null;
    }
    const token = authHeader.split(" ")[1];
    const isLogged = await isUserLoggedIn(token);
    if (!isLogged) {
        res.status(401).json({message: "Unathorized"});
        return null;
    }
    const data = decodeToken(token) as Data;
    const user = await UserModel.findById(data.user_id,
        {
            password: 0,
        });
    if (!user) {
        res.status(404).json({message: "User not found"});
        return null;
    }
    return user;
}

/**
 * Check if the user is logged in based on the given token
 * Return true if the user is logged in, false otherwise
 * @param token
 */
export const isUserLoggedIn = async (token: string) => {
    const data = decodeToken(token) as Data;
    if (!data) {
        return false;
    }
    const user = await UserModel.findById(data.user_id);
    return (user !== null);
}

/**
 * Update the profile of the current loggedIn user with the given fields from the request body
 * @param req
 * @param res
 */
export const updateUserProfile = async (req: Request, res: Response) => {
    try {
        const user = await getUser(req, res);
        if (!user) {
            return;
        }
        const {firstName, lastName, email, birthDate, password} = req.body;
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (email) user.email = email;
        if (birthDate) user.birthDate = birthDate;
        if (password) user.password = password;

        await user.save();
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: `Server Error: ${error}`});
    }
}

