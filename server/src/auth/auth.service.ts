import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<{ message: string; user: Partial<User> }> {
    const user = this.userRepository.create(registerDto);
    const savedUser = await this.userRepository.save(user);

    return {
      message: 'Registration successful',
      user: {
        id: savedUser.id,
        username: savedUser.username,
      },
    };
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ message: string; user: User; token: string }> {
    const user = await this.userRepository.findOne({
      where: { username: loginDto.username },
    });
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      user,
      token,
    };
  }

  async validateUser(username: string, userId: number): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { username, id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
