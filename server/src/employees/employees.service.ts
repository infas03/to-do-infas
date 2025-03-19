import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PaginationDto } from './dto/pagination.dto';
import {
  CreateEmployeeResponse,
  PaginatedResponse,
} from './interfaces/response.interfaces';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<CreateEmployeeResponse> {
    try {
      const employee = this.employeeRepository.create(createEmployeeDto);
      const savedEmployee = await this.employeeRepository.save(employee);

      return {
        success: true,
        statusCode: HttpStatus.CREATED,
        message: 'Employee created successfully',
        data: savedEmployee,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Failed to create employee',
          error: 'Bad Request',
          details: (error as Error).message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<Employee>> {
    const { page, limit } = paginationDto;

    const currentPage = page > 0 ? page : 1;
    const currentLimit = limit > 0 ? limit : 10;
    const skip = (currentPage - 1) * currentLimit;

    try {
      const [employees, total] = await this.employeeRepository.findAndCount({
        skip,
        take: currentLimit,
      });

      const totalPages = Math.ceil(total / currentLimit);

      return {
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Employees fetched successfully',
        data: employees,
        pagination: {
          total,
          page,
          limit,
          totalPages,
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to fetch employees',
          error: 'Internal Server Error',
          details: (error as Error).message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({ where: { id } });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const employee = await this.findOne(id);
    this.employeeRepository.merge(employee, updateEmployeeDto);
    return this.employeeRepository.save(employee);
  }

  async delete(id: number): Promise<void> {
    const result = await this.employeeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
  }
}
