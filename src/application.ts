import { NestFactory } from '@nestjs/core';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { config as dotenvConfig } from 'dotenv';
import { ApplicationModule } from './application.module';
import {
    ApplicationOptions,
    ENV,
} from '@types';
import { Logger } from '@app/logger';
import { ConfigService } from '@app/config';
import { EnvHelper } from '@app/utils';
import { INestApplication } from '@nestjs/common';

export class Application {
    protected static env: ENV;
    protected static app: INestApplication;
    protected static nestApplicationOptions: NestApplicationOptions = {};
    protected static applicationOptions: ApplicationOptions;
    protected static logger: Logger;

    protected static async init(): Promise<void> {
        this.loadEnvs();

        this.setNestApplicationOptions({
            cors: true,
            logger: false,
        });

        const app = await NestFactory.create<NestFastifyApplication>(
            ApplicationModule,
            new FastifyAdapter(),
            this.nestApplicationOptions,
        );

        const logger: Logger = this.logger = app.get(Logger);
        app.useLogger(logger);


        //! install dependensies before
        this.app = app;

        const configService: ConfigService = this.app.get(ConfigService);
        this.applicationOptions = configService.getApplicationOptions();

        this.printApplicationOptions();
    }

    protected static loadEnvs(): void {
        this.env = EnvHelper.getNodeEnv();

        const isProduction = EnvHelper.isProduction();
        if (!isProduction) {
            dotenvConfig();
        }
    }

    protected static setNestApplicationOptions(options?: NestApplicationOptions): void {
        if (options) {
            this.nestApplicationOptions = {
                ...this.nestApplicationOptions,
                ...options,
            };
        }
    }

    protected static printApplicationOptions(): void {
        const {
            httpServerOptions: {
                host: httpServerHost,
                port: httpServerPort,
            },
            databaseOptions: {
                host: databaseHost,
                port: databasePort,
                username: databaseUsername,
                password: databasePassword,
                database: databaseName,
            }
        } = this.applicationOptions;

        this.logger.verbose(
            `

            application mode: ${EnvHelper.getNodeEnv()} (NODE_ENV)
    
            http server options:
                host        ${httpServerHost}
                port        ${httpServerPort}
            
            database options:
                host        ${databaseHost}
                port        ${databasePort}
                username    ${databaseUsername}
                password    ${databasePassword}
                database    ${databaseName}

            `,
            'APPLICATION OPTIONS'
        );
    }

    public static async run(): Promise<Application> {
        await this.init();

        const {
            httpServerOptions: {
                port: httpServerPort,
                host: httpServerHost,
            },
        } = this.applicationOptions;

        await this.app.listenAsync(httpServerPort, httpServerHost);

        return this;
    }
}
