import { ConverterHelper, DashViewCoreModule } from '@dash-view-core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'process';
import { APIModule } from './dash-view-modules/api/api.module';
import { AuthModule } from './dash-view-modules/auth/auth.module';
import { PipelineModule } from './dash-view-modules/pipeline/pipeline.module';
import { PublicModule } from './dash-view-modules/public/public.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env['TYPEORM_HOST'],
      port: ConverterHelper.toInt(process.env['TYPEORM_PORT']),
      password: process.env['TYPEORM_PASSWORD'],
      username: process.env['TYPEORM_USERNAME'],
      database: process.env['TYPEORM_DATABASE'],
      // logging: ConverterHelper.toBoolean(process.env['TYPEORM_LOGGING']) ? 'all' : false,
      autoLoadEntities: true,
    }),
    DashViewCoreModule,
    PublicModule,
    AuthModule,
    PipelineModule,
    APIModule,
  ],
})
export class AppModule {
}
