import { User } from "../entities/User.entiy";

export interface UserRepository {
  registerUser(user: User): Promise<Pick<User, "email" | "name">>;
  findByEmail(email: string): Promise<Partial<User> | null>;
  findUserById(id: string): Promise<User | null>;
}
