import { Request, Response } from 'express';
import { UserUseCase } from '../../application/useCases/user/UserUseCase';
import { StatusCodes } from 'http-status-codes';

export class UserController {
    constructor(
        private readonly userUseCase: UserUseCase
    ) { }

    public async register(req: Request, res: Response) {
        try {
            const user = await this.userUseCase.registerUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
        }
    }
}
