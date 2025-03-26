import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(String(token), JWT_SECRET);
        req.body.user = decoded;
        next();
    } catch (error) {
        res.status(StatusCodes.FORBIDDEN).json({ error: "Invalid token" });
    }
};