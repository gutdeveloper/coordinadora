import { User } from "../../../domain/entities/User.entiy";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { HashService } from "../../../domain/services/HashService";
import { EmailService } from "../../../domain/services/EmailService";
import { ConflictError } from "../../../domain/errors/ConflictError";

export class UserUseCase {
    constructor(
        private userRepository: UserRepository,
        private passwordHash: HashService,
        private emailService: EmailService
    ) { }

    async registerUser(user: User): Promise<Pick<User, "email">> {
        const userExists = await this.userRepository.findByEmail(user.email);
        if (userExists) throw new ConflictError('User already exists');
        const password = await this.passwordHash.hash(user.password);
        const newUser = User.create(user.name, user.email, password);
        const userRegistered = await this.userRepository.registerUser(newUser);
        this.emailService.sendEmailActivation(userRegistered.email, userRegistered.name);
        return { email: userRegistered.email };
    }
}