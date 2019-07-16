import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ApplicationOptions } from '@types';
export declare class ConfigService implements TypeOrmOptionsFactory {
    protected readonly path: string;
    protected applicationOptions: ApplicationOptions;
    constructor(path?: string);
    protected loadApplicationOptions(): ApplicationOptions;
    getApplicationOptions(): ApplicationOptions;
    createTypeOrmOptions(): TypeOrmModuleOptions;
}
//# sourceMappingURL=config.service.d.ts.map