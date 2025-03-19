import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { Task } from 'src/tasks/entities/task.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'default_password',
  database: process.env.DB_NAME || 'to-do-infas',
  entities: [Employee, Task],
  synchronize: process.env.NODE_ENV !== 'production',
};
