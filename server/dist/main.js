"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const common_1 = require("@nestjs/common");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type, Authorization',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    });
    app.setGlobalPrefix('api');
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Server is running on http://localhost:${port}`);
}
bootstrap().catch((err) => {
    console.error('Error during bootstrap:', err);
});
//# sourceMappingURL=main.js.map