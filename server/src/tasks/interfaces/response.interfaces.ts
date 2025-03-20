import { Task } from '../entities/task.entity';

export interface CreateTaskResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: Task;
  error?: string;
  details?: string;
}

export interface FindAllTasksResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    tasks: T[];
    totalTasks: number;
    finishedTasks: number;
  };
  error?: string;
  details?: string;
}

export interface UpdateTaskResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Task;
}
