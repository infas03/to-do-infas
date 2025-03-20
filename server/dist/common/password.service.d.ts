export declare class PasswordService {
    hashPassword(password: string): Promise<string>;
    comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}
