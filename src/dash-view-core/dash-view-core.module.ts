import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard, PipelineApiKeyGuard } from './guards';
import {
  Pipeline,
  Repository,
  RepositoryApiKey,
  RepositoryUserAccess,
  Role,
  TestClass,
  TestMethod,
  Translation,
  User,
} from './model';
import {
  AuthService,
  ExtractorService,
  JavaExtractorService,
  PipelineService,
  RepositoryApiKeyService,
  RepositoryService,
  RepositoryUserAccessService,
  RoleSeedService,
  RoleService,
  SeedService,
  TestClassService,
  TestMethodService,
  TranslationService,
  UserSeedService,
  UserService,
} from './services';
import { JwtStrategy } from './strategies';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pipeline,
      Repository,
      RepositoryApiKey,
      Role,
      TestClass,
      TestMethod,
      Translation,
      User,
      RepositoryUserAccess,
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_TTL },
    }),
  ],
  exports: [
    AuthService,
    ExtractorService,
    PipelineService,
    RepositoryService,
    RepositoryApiKeyService,
    RepositoryUserAccessService,
    RoleService,
    SeedService,
    TestClassService,
    TestMethodService,
    TranslationService,
    UserService,
  ],
  providers: [
    JwtStrategy,
    JwtAuthGuard,
    PipelineApiKeyGuard,

    AuthService,
    PipelineService,
    RoleService,
    RepositoryService,
    RepositoryApiKeyService,
    RepositoryUserAccessService,
    TestClassService,
    TestMethodService,
    TranslationService,
    UserService,
    // Seed
    RoleSeedService,
    SeedService,
    UserSeedService,
    // Extractor
    ExtractorService,
    JavaExtractorService,
  ],
})
export class DashViewCoreModule {
}
