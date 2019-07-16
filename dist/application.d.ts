import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';
import { ApplicationOptions, ENV } from '@types';
import { Logger } from '@app/logger';
import { INestApplication } from '@nestjs/common';
export declare class Application {
    protected static env: ENV;
    protected static app: INestApplication;
    protected static nestApplicationOptions: NestApplicationOptions;
    protected static applicationOptions: ApplicationOptions;
    protected static logger: Logger;
    protected static init(): Promise<void>;
    protected static loadEnvs(): void;
    protected static setNestApplicationOptions(options?: NestApplicationOptions): void;
    protected static printApplicationOptions(): void;
    static run(): Promise<Application>;
}
//# sourceMappingURL=application.d.ts.map