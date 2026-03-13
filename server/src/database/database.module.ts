import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigService} from "@nestjs/config";

@Module({
    imports:[
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>("DATABASE_HOST", "localhost"),
                port: configService.get<number>("DATABASE_PORT", 5432),
                username: configService.get<string>("DATABASE_USER", "postgres"),
                password: configService.get<string>("DATABASE_PASSWORD", "postgres"),
                database: configService.get<string>("DATABASE_NAME", "ai_chat"),
                autoLoadEntities: true,
                synchronize: true // В продакшене лучше использовать миграции
            }),
            inject:[ConfigService]
        })
    ]})
export class DatabaseModule {}
