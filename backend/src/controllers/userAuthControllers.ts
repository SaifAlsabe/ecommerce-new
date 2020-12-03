import userModel from '../models/userModel';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserSignupInfo } from '../types/userTypes';
import { handleErrors } from '../middleware/handleErrors';
import dotenv from 'dotenv';

dotenv.config({ path: __dirname + '../.env' });


// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id: number | string) => {
    return jwt.sign({ id }, <string>process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
};

export const userSignup = async (req: Request, res: Response) => {
    const { userInfo }: { userInfo: UserSignupInfo } = req.body;

    try {
        const user = await userModel.create(userInfo);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ name: user.name, email: user.email });
    }
    catch (err) {
        console.log(err)
        const errors = handleErrors(err);
        console.log(errors)
        res.status(400).json(errors);
    }

}

export const userLogin = async (req: Request, res: Response) => {
    const { userInfo }: { userInfo: UserSignupInfo } = req.body;
    const { email, password } = userInfo;

    try {
        const user = await userModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ name: user.name, email: user.email, address: user.address });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json(errors);
    }

}

export const updateUsername = async (req: Request, res: Response) => {

    const username = req.body.username;
    const password = req.body.password
    const id = req.token.id
    try {
        const user = await userModel.updateUsername(username, id, password);
        res.cookie('updated_username', 'Successfully updated username.', { maxAge: 5000 })
        res.status(200).json({
            name: user.name,
            email: user.email,
        });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json(errors);
    }
}

export const updateEmail = async (req: Request, res: Response) => {

    const email = req.body.email;
    const password = req.body.password
    const id = req.token.id
    try {
        const user = await userModel.updateEmail(email, id, password);
        res.cookie('updated_email', 'Successfully updated email.', { maxAge: 5000 })
        res.status(200).json({ name: user.name, email: user.email });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json(errors);
    }
}

export const updatePassword = async (req: Request, res: Response) => {

    const newPassword = req.body.newPassword;
    const password = req.body.password;
    const id = req.token.id;

    try {
        const user = await userModel.updatePassword(newPassword, id, password);
        res.cookie('updated_password', 'Successfully updated password.', { maxAge: 5000 })
        res.status(200).json({ name: user.name, email: user.email });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json(errors);
    }
}


export const updateAddress = async (req: Request, res: Response) => {

    const { street, city, state, zipcode, country, password } = req.body
    const id = req.token.id

    try {
        const user = await userModel.updateAddress(street, city, state, zipcode, country, id, password);
        res.cookie('updated_address', 'Successfully updated address.', { maxAge: 5000 })
        res.status(200).json({
            street: user.address?.street,
            city: user.address?.city,
            state: user.address?.state,
            zipcode: user.address?.zipcode,
            country: user.address?.country,
        });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json(errors);
    }
}

export const getAddress = async (req: Request, res: Response) => {

    const id = req.token.id
    try {
        const user = await userModel.findById(id);
        res.status(200).json({
            street: user?.address?.street,
            city: user?.address?.city,
            state: user?.address?.state,
            zipcode: user?.address?.zipcode,
            country: user?.address?.country,
        });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json(errors);
    }
}

export const userLogout = (req: Request, res: Response) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).send('logged out successfully');
}


