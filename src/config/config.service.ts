import {
    TypeOrmOptionsFactory,
    TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DefaultConfigPath } from '@app/constants';
import { ApplicationOptions } from '@types';
import { readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';
import { render as ejsRender } from 'ejs';

export class ConfigService implements TypeOrmOptionsFactory {

    protected readonly path: string;
    protected applicationOptions: ApplicationOptions;

    constructor(path: string = DefaultConfigPath) {
        this.path = path;
        this.applicationOptions = this.loadApplicationOptions();
    }

    protected loadApplicationOptions(): ApplicationOptions {
        return safeLoad(
            ejsRender(
                readFileSync(
                    this.path,
                    { encoding: 'utf8' }
                ),
                { env: process.env },
            )
        );
    }

    public getApplicationOptions(): ApplicationOptions {
        return this.applicationOptions;
    }

    public createTypeOrmOptions(): TypeOrmModuleOptions {
        const {
            databaseOptions: {
                host,
                port,
                username,
                password,
                database,
            }
        } = this.applicationOptions;

        return {
            type: 'postgres',
            host,
            port,
            username,
            password,
            database,
            entities: ['./src/entities/*.entity{.ts,.js}'],
            logging: true,
            synchronize: true,
        }
    }
}
