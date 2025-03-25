import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import dotenv from "dotenv";
import { TokenService } from "../../domain/services/TokenService";

dotenv.config();

export class JwtService implements TokenService {

    generate(email: string): string {
        try {
            const payload: JwtPayload = {
                email
            }
            const secretOrPrivateKey = String(process.env.JWT_SECRET);
            const options: SignOptions = {
                expiresIn: Number(process.env.JWT_EXPIRES_IN),
            }
            return jwt.sign(payload, secretOrPrivateKey, options);
        } catch (error) {
            console.log(error);
            throw new Error("Error generating token");
        }

    }
    verify(token: string): string | null {
        const secretOrPrivateKey = String(process.env.JWT_SECRET);
        try {
            const decoded = jwt.verify(token, secretOrPrivateKey) as JwtPayload;
            return decoded.email as string;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
