import { Task } from '../../tasks/entities/task.entity';
export declare class Employee {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    department: string;
    role: string;
    tasks: Task[];
}
