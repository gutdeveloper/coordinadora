import { Request, Response } from 'express';
import { UserUseCase } from '../../application/useCases/user/UserUseCase';
import { StatusCodes } from 'http-status-codes';
import { NextFunction } from 'express-serve-static-core';

export class UserController {
    constructor(
        private readonly userUseCase: UserUseCase
    ) { }

    public async register(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userUseCase.registerUser(req.body);
            res.status(201).json(user);
        } catch (error: any) {
            next(error);
        }
    }
}
