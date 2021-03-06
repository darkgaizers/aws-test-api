import { Module } from '@nestjs/common';
import { CacheModule } from '@scgwedotech/nestjs-cache';
import { HealthModule } from './modules/health/health.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { dbConfigOptions } from './database/database.config';
import { ConfigModule } from '@nestjs/config';
import { IsExistingConstraint } from './validations/is-existing.validation';
import { IsUniqueConstraint } from './validations/is-unique.validation';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule,
    SequelizeModule.forRoot({
      ...dbConfigOptions(),
      autoLoadModels: true,
      synchronize: false,
      logging: true,
    }),
    HealthModule,
    UsersModule,
    AuthModule,
    IsExistingConstraint,
    IsUniqueConstraint,
  ],
})
export class AppModule {}
