import { PrismaClient } from "@prisma/client";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User.entiy";

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository {
    async registerUser(user: User): Promise<Pick<User, "email" | "name">> {
        try {
            return await prisma.user.create({
                data: { ...user },
                select: { email: true, name: true },
            });

        } catch (error) {
            console.log(error);
            throw new Error("Error registering user");
        }
    }

    async findByEmail(email: string): Promise<Partial<User> | null> {
        try {
            const user = await prisma.user.findUnique({
                where: { email },
                select: { id: true, name: true, email: true, password: true, email_verified: true },
            });
            if (!user) return null;
            return user;
        } catch (error) {
            console.log(error);
            throw new Error("Error finding user by email");
        }

    }
    async findUserById(id: string): Promise<User | null> {
        try {
            const user = await prisma.user.findUnique({
                where: { id },
                select: { id: true, name: true, email: true, password: true, email_verified: true },
            });
            if (!user) return null;
            return user;
        } catch (error) {
            console.log(error);
            throw new Error("Error finding user by id");
        }
    }
}
