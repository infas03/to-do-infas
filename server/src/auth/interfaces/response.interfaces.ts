import { Employee } from 'src/employees/entities/employee.entity';

export interface LoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Employee;
  token: string;
}
