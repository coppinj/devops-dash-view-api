import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from './guards';
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
  RepositoryApiKeyService,
  RepositoryService,
  RepositoryUserAccessService,
  RoleSeedService,
  RoleService,
  SeedService,
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
    RepositoryService,
    RepositoryApiKeyService,
    RepositoryUserAccessService,
    RoleService,
    SeedService,
    TranslationService,
    UserService,
  ],
  providers: [
    JwtStrategy,
    JwtAuthGuard,

    AuthService,
    RoleService,
    RepositoryService,
    RepositoryApiKeyService,
    RepositoryUserAccessService,
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
