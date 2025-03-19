import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Employee } from 'src/employees/entities/employee.entity';

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

  async login(
    loginDto: LoginDto,
  ): Promise<{ message: string; employee: Employee; token: string }> {
    const employee = await this.employeeRepository.findOne({
      where: { username: loginDto.username },
    });
    if (
      !employee ||
      !(await bcrypt.compare(loginDto.password, employee.password))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: employee.username, sub: employee.id };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      employee: employee,
      token,
    };
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
