import { DataSource } from 'typeorm';
import { ConverterHelper } from '@dash-view-core';

export const TypeORMDataSource = new DataSource({
  type: 'postgres',
  host: process.env['TYPEORM_HOST'],
  port: ConverterHelper.toInt(process.env['TYPEORM_PORT']),
  password: process.env['TYPEORM_PASSWORD'],
  username: process.env['TYPEORM_USERNAME'],
  database: process.env['TYPEORM_DATABASE'],
  entities: [
    'dist/**/*.entity.js',
  ],
  migrations: [
    'dist/migration/*.js',
  ],
});
