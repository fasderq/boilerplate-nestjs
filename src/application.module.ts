import { Module } from '@nestjs/common';
import { LoggerModule } from '@app/logger';
import {
    ConfigModule,
    ConfigService,
} from '@app/config';
import { ApiModule } from '@app/api';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        LoggerModule,
        ConfigModule,
        ApiModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useExisting: ConfigService,
        }),
    ]
})
export class ApplicationModule { }
