import { RoleType } from '@dash-view-common';
import {
  ForbiddenException,
  Injectable,
  Logger,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../model';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class RolesGuard extends JwtAuthGuard {
  static MAINTENANCE_ROLES = [
    RoleType.ADMIN,
  ];

  private logger: Logger;

  constructor(
    private reflector: Reflector,
  ) {
    super();

    this.logger = new Logger(RolesGuard.name);
  }

  handleRequest(err, user, info, context): any {
    super.handleRequest(err, user, info, context);

    const maintenance = process.env.hasOwnProperty('MAINTENANCE') && process.env.MAINTENANCE === 'true';

    const isAnonymous = this.reflector.get<boolean>('isAnonymous', context.getHandler()) ?? false;
    const globalRoles = this.reflector.get<RoleType[]>('roles', context.getClass());
    const roles = this.reflector.get<RoleType[]>('roles', context.getHandler());

    const request = context.switchToHttp().getRequest();

    const showLog = false;
    let logContent = null;

    if (showLog) {
      logContent = `${request.ip} ${request.method} ${request.url} ${user?.email ?? 'Anonymous'} ${user?.originEmail ? `<<${user.originEmail}>>` : ''} (${user?.role?.role ?? 'None'}) - Controller : ${globalRoles ?? 'None'}, Method : ${roles ?? 'None'} ${isAnonymous ? '>>> ANONYMOUS' : ''}`;
    }

    if (isAnonymous) {
      return this._handle(user ? user : 'Anonymous', showLog, logContent, undefined, false);
    }

    if (!globalRoles && !roles) {
      return this._handle(user ? user : 'Anonymous', showLog, logContent, undefined, maintenance);
    }

    if (!user) {
      return this._handle(null, showLog, logContent, 401, maintenance);
    }

    if (roles) {
      return this._handle(roles.find(f => f === user.role.role) !== undefined ? user : null, showLog, logContent, undefined, maintenance);
    }
    else if (globalRoles) {
      return this._handle(globalRoles.find(f => f === user.role.role) !== undefined ? user : null, showLog, logContent, undefined, maintenance);
    }

    return this._handle(null, showLog, logContent, undefined, maintenance);
  }

  private _handle(user: null | User | 'Anonymous', showLog: boolean, log?: string, errorCode: 401 | 403 = 403, maintenance?: boolean): any {
    if (user) {
      if (maintenance) {
        if (user === 'Anonymous') {
          this.logger.error(`MAINTENANCE >>> ${log}`);
          throw new ServiceUnavailableException({ maintenance: true });
        }

        if (!RolesGuard.MAINTENANCE_ROLES.includes(user.role.role)) {
          this.logger.error(`MAINTENANCE >>> ${log}`);
          throw new ServiceUnavailableException({ maintenance: true });
        }
      }

      if (showLog) {
        this.logger.log(`AUTHORIZED >>> ${log}`);
      }

      return user;
    }

    if (showLog) {
      if (maintenance) {
        this.logger.error(`MAINTENANCE >>> ${log}`);
        throw new ServiceUnavailableException({ maintenance: true });
      }

      this.logger.error(`UNAUTHORIZED >>> ${log}`);
    }

    switch (errorCode) {
      case 401:
        throw new UnauthorizedException();
      case 403:
      default:
        throw new ForbiddenException();
    }
  }
}
