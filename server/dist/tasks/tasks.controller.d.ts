import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FindTasksByUserIdDto } from './dto/find-task-by-user-id.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto): Promise<import("./interfaces/response.interfaces").CreateTaskResponse>;
    findAllByEmployeeId(employeeId: number, query: FindTasksByUserIdDto): Promise<import("./interfaces/response.interfaces").FindAllTasksResponse<import("./entities/task.entity").Task>>;
    findOne(id: number): Promise<import("./entities/task.entity").Task>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<import("./interfaces/response.interfaces").UpdateTaskResponse>;
    delete(id: number): Promise<void>;
    markAsCompleted(id: number): Promise<import("./entities/task.entity").Task>;
}
