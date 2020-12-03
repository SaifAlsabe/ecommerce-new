import jwt from 'jsonwebtoken';
import { Response, NextFunction, Request } from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: __dirname + '../.env' });


export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, <string>process.env.JWT_SECRET, (err: any, decodedToken: any) => {
            if (err) {
                res.status(403).send(false);
            } else {
                req.token = decodedToken
                next();
            }
        });
    } else {
        res.status(403).send(false);
    }
};

