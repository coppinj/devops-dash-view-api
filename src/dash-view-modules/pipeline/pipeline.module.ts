import { DashViewCoreModule } from '@dash-view-core';
import { Module } from '@nestjs/common';
import { PipelineController } from './controllers/v1/pipeline.controller';
import { TestClassController } from './controllers/v1/test-class.controller';

@Module({
  controllers: [
    PipelineController,
    TestClassController,
  ],
  imports: [
    DashViewCoreModule,
  ],
})
export class PipelineModule {
}
