// src/modules/tasks/controllers/tasks.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
  UseGuards,
  Version,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @Version('1')
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @Version('1')
  async findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @Version('1')
  async findOne(@Param('id') id: number) {
    return this.tasksService.findOne(id);
  }

  @Put(':id')
  @Version('1')
  async update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @Version('1')
  async delete(@Param('id') id: number) {
    return this.tasksService.delete(id);
  }

  @Patch(':id/complete')
  @Version('1')
  async markAsCompleted(@Param('id') id: number) {
    return this.tasksService.markAsCompleted(id);
  }
}
