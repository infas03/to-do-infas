import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { Employee } from '../employees/entities/employee.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskResponse, FindAllTasksResponse, UpdateTaskResponse } from './interfaces/response.interfaces';
import { FindTasksByUserIdDto } from './dto/find-task-by-user-id.dto';
export declare class TasksService {
    private taskRepository;
    private employeeRepository;
    constructor(taskRepository: Repository<Task>, employeeRepository: Repository<Employee>);
    create(createTaskDto: CreateTaskDto): Promise<CreateTaskResponse>;
    findAllByUserId(employeeId: number, query: FindTasksByUserIdDto): Promise<FindAllTasksResponse<Task>>;
    findOne(id: number): Promise<Task>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<UpdateTaskResponse>;
    delete(id: number): Promise<void>;
    markAsCompleted(id: number): Promise<Task>;
}
