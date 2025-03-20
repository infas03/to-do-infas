import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { Employee } from './entities/employee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordService } from '../common/password.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  providers: [EmployeesService, PasswordService],
  controllers: [EmployeesController],
  exports: [TypeOrmModule.forFeature([Employee])],
})
export class EmployeesModule {}
