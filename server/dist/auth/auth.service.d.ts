import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Employee } from '../employees/entities/employee.entity';
import { LoginResponse } from './interfaces/response.interfaces';
export declare class AuthService {
    private employeeRepository;
    private jwtService;
    constructor(employeeRepository: Repository<Employee>, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        employee: Partial<Employee>;
    }>;
    login(loginDto: LoginDto): Promise<LoginResponse>;
    validateUser(username: string, userId: number): Promise<Employee | null>;
}
