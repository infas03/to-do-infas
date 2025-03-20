import { Employee } from '../entities/employee.entity';

export interface PaginatedResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateEmployeeResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Omit<Employee, 'password'>;
}

export interface UpdateEmployeeResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Employee;
}

export interface DeleteEmployeeResponse {
  success: boolean;
  statusCode: number;
  message: string;
}
