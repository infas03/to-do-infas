import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PaginationDto } from './dto/pagination.dto';
import {
  CreateEmployeeResponse,
  DeleteEmployeeResponse,
  PaginatedResponse,
  UpdateEmployeeResponse,
} from './interfaces/response.interfaces';
import { PasswordService } from '../common/password.service';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private readonly passwordService: PasswordService,
  ) {}

  async create(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<CreateEmployeeResponse> {
    try {
      const hashedPassword = await this.passwordService.hashPassword(
        createEmployeeDto.password,
      );

      const employee = this.employeeRepository.create({
        ...createEmployeeDto,
        password: hashedPassword,
      });
      const savedEmployee = await this.employeeRepository.save(employee);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...savedEmployeeWithoutPassword } = savedEmployee;

      return {
        success: true,
        statusCode: HttpStatus.CREATED,
        message: 'Employee created successfully',
        data: savedEmployeeWithoutPassword,
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
    const currentLimit = limit > 0 ? limit : 999999999;
    const skip = (currentPage - 1) * currentLimit;

    try {
      const [employees, total] = await this.employeeRepository.findAndCount({
        where: { role: Not('admin') },
        relations: ['tasks'],
        skip,
        take: currentLimit,
      });

      const employeesWithTaskCounts = employees.map((employee) => {
        const totalTasks = employee.tasks.length;
        const finishedTasks = employee.tasks.filter(
          (task) => task.isCompleted === true,
        ).length;

        return {
          ...employee,
          totalTasks,
          finishedTasks,
        };
      });

      const totalPages = Math.ceil(total / currentLimit);

      return {
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Employees fetched successfully',
        data: employeesWithTaskCounts,
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
  ): Promise<UpdateEmployeeResponse> {
    try {
      const employee = await this.employeeRepository.findOne({ where: { id } });
      if (!employee) {
        throw new NotFoundException(`Employee with ID ${id} not found`);
      }

      const hashedPassword = updateEmployeeDto.password
        ? await this.passwordService.hashPassword(updateEmployeeDto.password)
        : employee.password;

      const mergedEmployee = this.employeeRepository.merge(employee, {
        ...updateEmployeeDto,
        password: hashedPassword,
      });

      const updatedEmployee =
        await this.employeeRepository.save(mergedEmployee);

      return {
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Employee updated successfully',
        data: updatedEmployee,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            success: false,
            statusCode: HttpStatus.NOT_FOUND,
            message: error.message,
            error: 'Not Found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw new HttpException(
          {
            success: false,
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Failed to update employee',
            error: 'Bad Request',
            details: (error as Error).message,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async delete(id: number): Promise<DeleteEmployeeResponse> {
    try {
      const employee = await this.employeeRepository.findOne({ where: { id } });
      if (!employee) {
        throw new NotFoundException(`Employee with ID ${id} not found`);
      }

      await this.employeeRepository.delete(id);

      return {
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Employee deleted successfully',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(
          {
            success: false,
            statusCode: HttpStatus.NOT_FOUND,
            message: error.message,
            error: 'Not Found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw new HttpException(
          {
            success: false,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Failed to delete employee',
            error: 'Internal Server Error',
            details: (error as Error).message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
