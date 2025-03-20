import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { EmployeesModule } from './employees/employees.module';
// import { TasksModule } from './tasks/tasks.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { databaseConfig } from './config/database.config';
// import { AuthModule } from './auth/auth.module';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot(databaseConfig),
//     EmployeesModule,
//     TasksModule,
//     AuthModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
