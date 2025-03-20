import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PaginationDto } from './dto/pagination.dto';
export declare class EmployeesController {
    private readonly employeesService;
    constructor(employeesService: EmployeesService);
    create(createEmployeeDto: CreateEmployeeDto): Promise<import("./interfaces/response.interfaces").CreateEmployeeResponse>;
    findAll(paginationDto: PaginationDto): Promise<import("./interfaces/response.interfaces").PaginatedResponse<import("./entities/employee.entity").Employee>>;
    findOne(id: number): Promise<import("./entities/employee.entity").Employee>;
    update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<import("./interfaces/response.interfaces").UpdateEmployeeResponse>;
    delete(id: number): Promise<import("./interfaces/response.interfaces").DeleteEmployeeResponse>;
}
