import { DashViewCoreModule } from '@dash-view-core';
import { Module } from '@nestjs/common';
import { RepositoryController } from './controllers/repository.controller';

@Module({
  controllers: [
    RepositoryController,
  ],
  imports: [
    DashViewCoreModule,
  ],
})
export class APIModule {
}
