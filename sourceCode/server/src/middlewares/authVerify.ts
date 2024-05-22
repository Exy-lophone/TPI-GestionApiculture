import { config, status } from '../utils';
import jwt from 'jsonwebtoken'
import type { Response, Request, NextFunction } from 'express';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');
    if(!authHeader) return res.status(status.BAD_REQUEST).json({error: "Request must contain authorization header"});
    const bearer = authHeader.split(' ');
    if(bearer.length !== 2) return res.status(status.BAD_REQUEST).json({error: "Authorization header must contain bearer token"});
    const token = bearer[1];
    try { 
        const decoded = jwt.verify(token, config.SECRET_KEY);
        next();
    } catch (err) {
        res.status(status.UNAUTHORIZED).json({error: "Access denied"});
    }
}