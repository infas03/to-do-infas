import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        employee: Partial<import("../employees/entities/employee.entity").Employee>;
    }>;
    login(loginDto: LoginDto): Promise<import("./interfaces/response.interfaces").LoginResponse>;
}
