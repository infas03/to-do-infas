// src/modules/tasks/services/tasks.service.ts
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  CreateTaskResponse,
  FindAllTasksResponse,
} from './interfaces/response.interfaces';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<CreateTaskResponse> {
    try {
      const employee = await this.employeeRepository.findOne({
        where: { id: createTaskDto.employeeId },
      });
      if (!employee) {
        throw new NotFoundException(
          `Employee with ID ${createTaskDto.employeeId} not found`,
        );
      }

      const task = this.taskRepository.create({
        ...createTaskDto,
        employee,
      });

      const savedTask = await this.taskRepository.save(task);

      return {
        success: true,
        statusCode: HttpStatus.CREATED,
        message: 'Task created successfully',
        data: savedTask,
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
            message: 'Failed to create task',
            error: 'Bad Request',
            details: (error as Error).message,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async findAll(): Promise<FindAllTasksResponse<Task>> {
    try {
      const tasks = await this.taskRepository.find({ relations: ['employee'] });

      return {
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Tasks retrieved successfully',
        data: tasks,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to retrieve tasks',
          error: 'Internal Server Error',
          details: (error as Error).message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['employee'],
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    this.taskRepository.merge(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  async delete(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async markAsCompleted(id: number): Promise<Task> {
    const task = await this.findOne(id);
    task.isCompleted = true;
    return this.taskRepository.save(task);
  }
}
