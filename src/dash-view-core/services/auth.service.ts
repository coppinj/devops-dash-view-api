import { IJwtPayload, IJwtPayloadResponse } from '@dash-view-common';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDTO, User } from '../model';
import { RoleService } from './role.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly jwtService: JwtService,
  ) {
  }

  async login(dto: LoginDTO): Promise<IJwtPayloadResponse> {
    const user = await this.userService.getByEmail(dto.email);

    if (!user) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      throw new ForbiddenException();
    }

    if (!bcrypt.compareSync(dto.password, user.password) || !user.active) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      throw new ForbiddenException();
    }

    return {
      access_token: this.jwtService.sign(await this._generateToken(user)),
    };
  }

  private async _generateToken(user: User): Promise<IJwtPayload> {
    return {
      id: user.id,
      email: user.email,
      role: await this.roleService.getDTO(user.role),
    };
  }
}
