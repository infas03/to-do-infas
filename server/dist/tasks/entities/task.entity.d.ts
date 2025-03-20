import { Employee } from '../../employees/entities/employee.entity';
export declare class Task {
    id: number;
    name: string;
    description: string;
    priority: string;
    dueDate: Date;
    isCompleted: boolean;
    employee: Employee;
}
