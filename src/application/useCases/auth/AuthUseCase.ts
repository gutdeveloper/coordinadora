import { ForbiddenError } from "../../../domain/errors/ForbiddenError";
import { NotFoundError } from "../../../domain/errors/NotFoundError";
import { UnauthorizedError } from "../../../domain/errors/UnauthorizedError";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { HashService } from "../../../domain/services/HashService";
import { TokenService } from "../../../domain/services/TokenService";

export class AuthUseCase {
    constructor(
        private userRepository: UserRepository,
        private passwordHash: HashService,
        private tokenService: TokenService
    ) { }

    async login(email: string, password: string): Promise<string> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new NotFoundError("User not found");
        if (user.email_verified === false) throw new ForbiddenError("Email not verified");
        const isValidPassword = await this.passwordHash.compare(password, user.password!);
        if (!isValidPassword) throw new UnauthorizedError("Invalid password");
        const token = this.tokenService.generate(user.id!);
        return token;
    }
}