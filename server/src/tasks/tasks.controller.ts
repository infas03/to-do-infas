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
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FindTasksByUserIdDto } from './dto/find-task-by-user-id.dto';

@Controller('tasks')
// @UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @Version('1')
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get(':employeeId')
  @Version('1')
  async findAllByEmployeeId(
    @Param('employeeId') employeeId: number,
    @Query() query: FindTasksByUserIdDto,
  ) {
    return this.tasksService.findAllByUserId(employeeId, query);
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
