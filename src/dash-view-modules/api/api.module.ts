import { DashViewCoreModule } from '@dash-view-core';
import { Module } from '@nestjs/common';
import { PipelineController } from './controllers/pipeline.controller';
import { RepositoryApiKeyController } from './controllers/repository-api-key.controller';
import { RepositoryUserAccessController } from './controllers/repository-user-access.controller';
import { RepositoryController } from './controllers/repository.controller';
import { TestClassController } from './controllers/test-class.controller';

@Module({
  controllers: [
    PipelineController,
    RepositoryController,
    RepositoryApiKeyController,
    RepositoryUserAccessController,
    TestClassController,
  ],
  imports: [
    DashViewCoreModule,
  ],
})
export class APIModule {
}
