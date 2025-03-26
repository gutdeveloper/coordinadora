import { NextFunction, Request, Response } from 'express';
import { AuthUseCase } from '../../application/useCases/auth/AuthUseCase';
import { StatusCodes } from 'http-status-codes';

export class AuthController {
    constructor(
        private readonly authUseCase: AuthUseCase
    ) { }

    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const token = await this.authUseCase.login(email, password);
            res.status(200).json({ token });
        } catch (error) {
            next(error);
        }
    }
}
