// src/modules/tasks/services/tasks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
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
    return this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({ relations: ['employee'] });
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
