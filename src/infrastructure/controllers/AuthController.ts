import { Request, Response } from 'express';
import { AuthUseCase } from '../../application/useCases/auth/AuthUseCase';
import { StatusCodes } from 'http-status-codes';

export class AuthController {
    constructor(
        private readonly authUseCase: AuthUseCase
    ) { }

    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const token = await this.authUseCase.login(email, password);
            if (token) {
                res.status(200).json({ token });
            } else {
                res.status(401).json({ error: "Unauthorized" });
            }
        } catch (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
        }
    }
}
