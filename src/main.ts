import { fastifyHelmet } from '@fastify/helmet';
import fastifyMultipart from '@fastify/multipart';
import {
  BadRequestException,
  Logger,
  ValidationError,
  ValidationPipe,
  VERSION_NEUTRAL,
  VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DateTime, Settings } from 'luxon';
import { AppModule } from './app.module';
import { PipelineModule } from './dash-view-modules/pipeline/pipeline.module';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');

  logger.log('Starting application...');

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      maxParamLength: 128,
    }),
    {
      rawBody: true,
    },
  );

  app.enableCors({
    exposedHeaders: ['Content-Disposition'],
  });

  app.useGlobalPipes(new ValidationPipe({
    validationError: { target: false },
    whitelist: true,
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      return new BadRequestException(validationErrors);
    },
    transform: true,
  }));

  app.enableVersioning({
    defaultVersion: VERSION_NEUTRAL,
    type: VersioningType.URI,
  });

  // TIMEZONE
  Settings.defaultZone = 'Europe/Brussels';
  //

  // PG DEFAULTS
  const pg = require('pg');

  pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value: string | null) => {
    if (!value) {
      return value;
    }

    return parseFloat(value);
  });
  pg.types.setTypeParser(pg.types.builtins.TIMESTAMP, (value: string | null) => {
    if (!value) {
      return value;
    }

    return DateTime.fromSQL(value, { zone: 'utc' }).setZone('Europe/Brussels', { keepLocalTime: true }).toJSDate();
  });

  await app.register(fastifyHelmet, {
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  });
  await app.register(fastifyMultipart, {
    limits: {
      fileSize: 10 * 1024 * 1024,
      files: 1,
    },
  });

  // region Swagger

  const pipelineOptions = new DocumentBuilder()
    .setTitle('Pipeline API')
    .setDescription('The Swagger for the pipeline')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'api-key', in: 'header' }, 'Api-Key')
    .build();

  const pipelineModuleDocument = SwaggerModule.createDocument(app, pipelineOptions, {
    include: [PipelineModule],
  });

  SwaggerModule.setup('api/swagger/pipelines', app, pipelineModuleDocument);

  // endregion

  await app.listen(3000, '0.0.0.0');

  logger.log('Application started on port 3000');
}

bootstrap();
