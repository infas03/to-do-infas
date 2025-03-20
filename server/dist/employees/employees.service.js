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
exports.EmployeesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const employee_entity_1 = require("./entities/employee.entity");
const password_service_1 = require("../common/password.service");
let EmployeesService = class EmployeesService {
    employeeRepository;
    passwordService;
    constructor(employeeRepository, passwordService) {
        this.employeeRepository = employeeRepository;
        this.passwordService = passwordService;
    }
    async create(createEmployeeDto) {
        try {
            const hashedPassword = await this.passwordService.hashPassword(createEmployeeDto.password);
            const employee = this.employeeRepository.create({
                ...createEmployeeDto,
                password: hashedPassword,
            });
            const savedEmployee = await this.employeeRepository.save(employee);
            const { password, ...savedEmployeeWithoutPassword } = savedEmployee;
            return {
                success: true,
                statusCode: common_1.HttpStatus.CREATED,
                message: 'Employee created successfully',
                data: savedEmployeeWithoutPassword,
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'Failed to create employee',
                error: 'Bad Request',
                details: error.message,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll(paginationDto) {
        const { page, limit } = paginationDto;
        const currentPage = page > 0 ? page : 1;
        const currentLimit = limit > 0 ? limit : 999999999;
        const skip = (currentPage - 1) * currentLimit;
        try {
            const [employees, total] = await this.employeeRepository.findAndCount({
                where: { role: (0, typeorm_2.Not)('admin') },
                relations: ['tasks'],
                skip,
                take: currentLimit,
            });
            const employeesWithTaskCounts = employees.map((employee) => {
                const totalTasks = employee.tasks.length;
                const finishedTasks = employee.tasks.filter((task) => task.isCompleted === true).length;
                return {
                    ...employee,
                    totalTasks,
                    finishedTasks,
                };
            });
            const totalPages = Math.ceil(total / currentLimit);
            return {
                success: true,
                statusCode: common_1.HttpStatus.OK,
                message: 'Employees fetched successfully',
                data: employeesWithTaskCounts,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages,
                },
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to fetch employees',
                error: 'Internal Server Error',
                details: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        const employee = await this.employeeRepository.findOne({ where: { id } });
        if (!employee) {
            throw new common_1.NotFoundException(`Employee with ID ${id} not found`);
        }
        return employee;
    }
    async update(id, updateEmployeeDto) {
        try {
            const employee = await this.employeeRepository.findOne({ where: { id } });
            if (!employee) {
                throw new common_1.NotFoundException(`Employee with ID ${id} not found`);
            }
            const hashedPassword = updateEmployeeDto.password
                ? await this.passwordService.hashPassword(updateEmployeeDto.password)
                : employee.password;
            const mergedEmployee = this.employeeRepository.merge(employee, {
                ...updateEmployeeDto,
                password: hashedPassword,
            });
            const updatedEmployee = await this.employeeRepository.save(mergedEmployee);
            return {
                success: true,
                statusCode: common_1.HttpStatus.OK,
                message: 'Employee updated successfully',
                data: updatedEmployee,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.HttpException({
                    success: false,
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: error.message,
                    error: 'Not Found',
                }, common_1.HttpStatus.NOT_FOUND);
            }
            else {
                throw new common_1.HttpException({
                    success: false,
                    statusCode: common_1.HttpStatus.BAD_REQUEST,
                    message: 'Failed to update employee',
                    error: 'Bad Request',
                    details: error.message,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
    async delete(id) {
        try {
            const employee = await this.employeeRepository.findOne({ where: { id } });
            if (!employee) {
                throw new common_1.NotFoundException(`Employee with ID ${id} not found`);
            }
            await this.employeeRepository.delete(id);
            return {
                success: true,
                statusCode: common_1.HttpStatus.OK,
                message: 'Employee deleted successfully',
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.HttpException({
                    success: false,
                    statusCode: common_1.HttpStatus.NOT_FOUND,
                    message: error.message,
                    error: 'Not Found',
                }, common_1.HttpStatus.NOT_FOUND);
            }
            else {
                throw new common_1.HttpException({
                    success: false,
                    statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                    message: 'Failed to delete employee',
                    error: 'Internal Server Error',
                    details: error.message,
                }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
};
exports.EmployeesService = EmployeesService;
exports.EmployeesService = EmployeesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        password_service_1.PasswordService])
], EmployeesService);
//# sourceMappingURL=employees.service.js.map