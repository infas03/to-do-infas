"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const employee_entity_1 = require("../employees/entities/employee.entity");
let AuthService = class AuthService {
    employeeRepository;
    jwtService;
    constructor(employeeRepository, jwtService) {
        this.employeeRepository = employeeRepository;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
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
    async login(loginDto) {
        console.log('loginDto', loginDto);
        try {
            const employee = await this.employeeRepository.findOne({
                where: { username: loginDto.username },
            });
            console.log('employee', employee);
            if (!employee ||
                !(await bcrypt.compare(loginDto.password, employee.password))) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            const payload = { username: employee.username, sub: employee.id };
            const token = this.jwtService.sign(payload);
            return {
                success: true,
                statusCode: common_1.HttpStatus.CREATED,
                message: 'Login successful',
                data: employee,
                token: token,
            };
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException) {
                throw new common_1.HttpException({
                    success: false,
                    statusCode: common_1.HttpStatus.UNAUTHORIZED,
                    message: error.message,
                    error: 'Unauthorized',
                }, common_1.HttpStatus.UNAUTHORIZED);
            }
            throw new common_1.HttpException({
                success: false,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'An error occurred during login',
                error: 'Internal Server Error',
                details: error instanceof Error ? error.message : 'Unknown error',
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async validateUser(username, userId) {
        const employee = await this.employeeRepository.findOne({
            where: { username, id: userId },
        });
        if (!employee) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return employee;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map