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
  data?: T[];
  error?: string;
  details?: string;
}
