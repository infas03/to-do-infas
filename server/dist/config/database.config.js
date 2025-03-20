"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const employee_entity_1 = require("../employees/entities/employee.entity");
const task_entity_1 = require("../tasks/entities/task.entity");
const dotenv = require("dotenv");
dotenv.config();
exports.databaseConfig = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'default_password',
    database: process.env.DB_NAME || 'to-do-infas',
    entities: [employee_entity_1.Employee, task_entity_1.Task],
    synchronize: process.env.NODE_ENV !== 'production',
};
//# sourceMappingURL=database.config.js.map