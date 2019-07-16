"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const dotenv_1 = require("dotenv");
const application_module_1 = require("./application.module");
const logger_1 = require("@app/logger");
const config_1 = require("@app/config");
const utils_1 = require("@app/utils");
class Application {
    static async init() {
        this.loadEnvs();
        this.setNestApplicationOptions({
            cors: true,
            logger: false,
        });
        const app = await core_1.NestFactory.create(application_module_1.ApplicationModule, new platform_fastify_1.FastifyAdapter(), this.nestApplicationOptions);
        const logger = this.logger = app.get(logger_1.Logger);
        app.useLogger(logger);
        this.app = app;
        const configService = this.app.get(config_1.ConfigService);
        this.applicationOptions = configService.getApplicationOptions();
        this.printApplicationOptions();
    }
    static loadEnvs() {
        this.env = utils_1.EnvHelper.getNodeEnv();
        const isProduction = utils_1.EnvHelper.isProduction();
        if (!isProduction) {
            dotenv_1.config();
        }
    }
    static setNestApplicationOptions(options) {
        if (options) {
            this.nestApplicationOptions = {
                ...this.nestApplicationOptions,
                ...options,
            };
        }
    }
    static printApplicationOptions() {
        const { httpServerOptions: { host: httpServerHost, port: httpServerPort, }, databaseOptions: { host: databaseHost, port: databasePort, username: databaseUsername, password: databasePassword, database: databaseName, } } = this.applicationOptions;
        this.logger.verbose(`

            application mode: ${utils_1.EnvHelper.getNodeEnv()} (NODE_ENV)
    
            http server options:
                host        ${httpServerHost}
                port        ${httpServerPort}
            
            database options:
                host        ${databaseHost}
                port        ${databasePort}
                username    ${databaseUsername}
                password    ${databasePassword}
                database    ${databaseName}

            `, 'APPLICATION OPTIONS');
    }
    static async run() {
        await this.init();
        const { httpServerOptions: { port: httpServerPort, host: httpServerHost, }, } = this.applicationOptions;
        await this.app.listenAsync(httpServerPort, httpServerHost);
        return this;
    }
}
Application.nestApplicationOptions = {};
exports.Application = Application;
//# sourceMappingURL=application.js.map