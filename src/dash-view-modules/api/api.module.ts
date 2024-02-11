import { DashViewCoreModule } from '@dash-view-core';
import { Module } from '@nestjs/common';
import { RepositoryApiKeyController } from './controllers/repository-api-key.controller';
import { RepositoryUserAccessController } from './controllers/repository-user-access.controller';
import { RepositoryController } from './controllers/repository.controller';

@Module({
  controllers: [
    RepositoryController,
    RepositoryApiKeyController,
    RepositoryUserAccessController,
  ],
  imports: [
    DashViewCoreModule,
  ],
})
export class APIModule {
}
