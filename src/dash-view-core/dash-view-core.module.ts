import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from './guards';
import { Repository, RepositoryApiKey, Role, Translation, User, UserRepositoryAccess } from './model';
import {
  AuthService,
  ExtractorService,
  JavaExtractorService, RepositoryService,
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
      Repository,
      RepositoryApiKey,
      Role,
      Translation,
      User,
      UserRepositoryAccess,
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_TTL },
    }),
  ],
  exports: [
    AuthService,
    RepositoryService,
    RoleService,
    TranslationService,
    SeedService,
    UserService,
    ExtractorService,
  ],
  providers: [
    JwtStrategy,
    JwtAuthGuard,

    AuthService,
    RepositoryService,
    RoleService,
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
