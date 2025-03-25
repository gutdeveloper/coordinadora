import { MailgunEmailService } from "../services/MailgunService";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";
import { BcryptService } from "../services/BcryptService";
import { UserUseCase } from "../../application/useCases/user/UserUseCase";

const emailService = new MailgunEmailService();
const userRepository = new PrismaUserRepository();
const passwordHasher = new BcryptService();
const userUseCase = new UserUseCase(userRepository, passwordHasher, emailService);

export { userUseCase };