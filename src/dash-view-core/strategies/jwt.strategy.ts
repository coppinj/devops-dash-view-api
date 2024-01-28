import { IJwtPayload } from '@dash-view-common';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   * Passport create the user with the data return
   * @param payload
   * @return userSession
   */
  async validate(payload: IJwtPayload): Promise<IJwtPayload> {
    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };
  }
}
