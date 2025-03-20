import { Employee } from '../../employees/entities/employee.entity';

export interface LoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Employee;
  token: string;
}
