import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PaginationDto } from './dto/pagination.dto';
import { CreateEmployeeResponse, DeleteEmployeeResponse, PaginatedResponse, UpdateEmployeeResponse } from './interfaces/response.interfaces';
import { PasswordService } from '../common/password.service';
export declare class EmployeesService {
    private employeeRepository;
    private readonly passwordService;
    constructor(employeeRepository: Repository<Employee>, passwordService: PasswordService);
    create(createEmployeeDto: CreateEmployeeDto): Promise<CreateEmployeeResponse>;
    findAll(paginationDto: PaginationDto): Promise<PaginatedResponse<Employee>>;
    findOne(id: number): Promise<Employee>;
    update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<UpdateEmployeeResponse>;
    delete(id: number): Promise<DeleteEmployeeResponse>;
}
