export class CreateTaskDto {
  name: string;
  description: string;
  priority: string;
  dueDate: Date;
  employeeId: number;
}
