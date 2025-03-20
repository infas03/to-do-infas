import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Employee } from 'src/employees/entities/employee.entity';
import { LoginResponse } from './interfaces/response.interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private jwtService: JwtService,
  ) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<{ message: string; employee: Partial<Employee> }> {
    const employee = this.employeeRepository.create(registerDto);
    const savedEmployer = await this.employeeRepository.save(employee);

    return {
      message: 'Registration successful',
      employee: {
        id: savedEmployer.id,
        username: savedEmployer.username,
      },
    };
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    console.log('loginDto', loginDto);
    try {
      const employee = await this.employeeRepository.findOne({
        where: { username: loginDto.username },
      });
      console.log('employee', employee);

      if (
        !employee ||
        !(await bcrypt.compare(loginDto.password, employee.password))
      ) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { username: employee.username, sub: employee.id };
      const token = this.jwtService.sign(payload);

      return {
        success: true,
        statusCode: HttpStatus.CREATED,
        message: 'Login successful',
        data: employee,
        token: token,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new HttpException(
          {
            success: false,
            statusCode: HttpStatus.UNAUTHORIZED,
            message: error.message,
            error: 'Unauthorized',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      throw new HttpException(
        {
          success: false,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An error occurred during login',
          error: 'Internal Server Error',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateUser(
    username: string,
    userId: number,
  ): Promise<Employee | null> {
    const employee = await this.employeeRepository.findOne({
      where: { username, id: userId },
    });

    if (!employee) {
      throw new UnauthorizedException('User not found');
    }

    return employee;
  }
}
