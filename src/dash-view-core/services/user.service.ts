import { RoleType } from '@dash-view-common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { EntityManager, Repository } from 'typeorm';
import { Role, User } from '../model';
import { AbstractCRUDService } from './common';
import { RoleService } from './role.service';

@Injectable()
export class UserService extends AbstractCRUDService<User> {
  constructor(
    @InjectRepository(User)
      repo: Repository<User>,
    private readonly roleService: RoleService,
  ) {
    super(repo);
  }

  private static _generateRandomPassword(
    length = 10,
    characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$',
  ): string {
    return Array.from(crypto.randomFillSync(new Uint32Array(length)))
      .map((x) => characters[x % characters.length])
      .join('');
  }

  async getByEmail(email: string): Promise<User> {
    return this.repo.findOne({
      where: {
        email,
      },
      relations: {
        role: true,
      },
    });
  }

  async hashPlainPassword(user: User): Promise<boolean> {
    if (!user.plainPassword) {
      return false;
    }

    user.password = await bcrypt.hash(user.plainPassword, 12);

    user.plainPassword = null;

    return true;
  }

  private async _create(em: EntityManager, email: string, plainPassword: string | null, active: boolean, role: RoleType, sendMail: boolean): Promise<User> {
    const existingUser = await em.findOne(User, {
      where: {
        email,
      },
    });

    if (existingUser) {
      return null;
    }

    if (!plainPassword) {
      plainPassword = UserService._generateRandomPassword();
    }

    const user = new User({
      email,
      active,
      role: await em.findOne(Role, { where: { role } }),
      plainPassword,
    });

    await this.hashPlainPassword(user);

    await em.save(user);

    if (sendMail) {
      console.log('SEND MAIL');
    }

    return user;
  }
}
