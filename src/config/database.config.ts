import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { Task } from 'src/tasks/entities/task.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '1234567890',
  database: process.env.DB_NAME || 'to-do-infas',
  entities: [Employee, Task],
  synchronize: process.env.NODE_ENV !== 'production',
};
