import { DashViewCoreModule } from '@dash-view-core';
import { Module } from '@nestjs/common';
import { PublicController } from './controllers/public.controller';

@Module({
  controllers: [
    PublicController,
  ],
  imports: [
    DashViewCoreModule,
  ],
})
export class PublicModule {
}
