import { DashViewCoreModule } from '@dash-view-core';
import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';

@Module({
  controllers: [
    AuthController,
  ],
  imports: [
    DashViewCoreModule,
  ],
})
export class AuthModule {
}
