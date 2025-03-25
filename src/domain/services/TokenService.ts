export interface TokenService {
    generate(email: string): string;
    verify(token: string): string | null;
}