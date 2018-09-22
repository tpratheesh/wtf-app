import { Module } from '@nestjs/common';
import { databaseProviders } from './DatabaseProvider';
import { ConfigModule } from 'config/ConfigModule';

@Module({
    imports: [ConfigModule],
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule { }