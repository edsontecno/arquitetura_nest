import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { UserModule } from './usuario/user.module';
import { APP_FILTER } from '@nestjs/core';
import { FilterExceptionGlobal } from './shared/filtros/filter-exception-global';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FilterExceptionGlobal,
    },
  ],
})
export class AppModule {}
