import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [EmployeesModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
