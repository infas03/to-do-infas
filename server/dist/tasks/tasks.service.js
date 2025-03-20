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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./entities/task.entity");
const employee_entity_1 = require("../employees/entities/employee.entity");
let TasksService = class TasksService {
    constructor(taskRepository, employeeRepository) {
        this.taskRepository = taskRepository;
        this.employeeRepository = employeeRepository;
    }
    async create(createTaskDto) {
        try {
            const employee = await this.employeeRepository.findOne({
                where: { id: createTaskDto.employeeId },
            });
            if (!employee) {
                throw new common_1.NotFoundException(`Employee with ID ${createTaskDto.employeeId} not found`);
            }
            const task = this.taskRepository.create({
                ...createTaskDto,
                employee,
            });
            const savedTask = await this.taskRepository.save(task);
            return {
                success: true,
                statusCode: common_1.HttpStatus.CREATED,
                message: 'Task created successfully',
                data: savedTask,
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
                    message: 'Failed to create task',
                    error: 'Bad Request',
                    details: error.message,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
    async findAllByUserId(employeeId, query) {
        try {
            const filter = {
                employee: { id: employeeId },
            };
            const order = {};
            if (query.mainFilter === 'priority') {
                order.priority =
                    query.sortOrder?.toUpperCase() || 'ASC';
            }
            else if (query.mainFilter === 'dueDate') {
                order.dueDate =
                    query.sortOrder?.toUpperCase() || 'ASC';
            }
            const tasks = await this.taskRepository.find({
                where: filter,
                order: order,
            });
            const totalTasks = tasks.length;
            const finishedTasks = tasks.filter((task) => task.isCompleted).length;
            return {
                success: true,
                statusCode: common_1.HttpStatus.OK,
                message: 'Tasks retrieved successfully',
                data: {
                    tasks,
                    totalTasks,
                    finishedTasks,
                },
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Failed to retrieve tasks',
                error: 'Internal Server Error',
                details: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        const task = await this.taskRepository.findOne({
            where: { id },
            relations: ['employee'],
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }
    async update(id, updateTaskDto) {
        try {
            const task = await this.taskRepository.findOne({ where: { id } });
            if (!task) {
                throw new common_1.NotFoundException(`Task with ID ${id} not found`);
            }
            this.taskRepository.merge(task, updateTaskDto);
            const updatedTask = await this.taskRepository.save(task);
            return {
                success: true,
                statusCode: common_1.HttpStatus.OK,
                message: 'Task updated successfully',
                data: updatedTask,
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
                    message: 'Failed to update task',
                    error: 'Bad Request',
                    details: error.message,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
    async delete(id) {
        const result = await this.taskRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Task with ID ${id} not found`);
        }
    }
    async markAsCompleted(id) {
        const task = await this.findOne(id);
        task.isCompleted = true;
        return this.taskRepository.save(task);
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __param(1, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map