import { RoleType } from '@dash-view-common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as process from 'process';
import { Repository } from 'typeorm';
import { User } from '../../model';
import { RoleService } from '../role.service';
import { UserService } from '../user.service';
import { AbstractSeedService } from './abstract-seed.service';

@Injectable()
export class UserSeedService extends AbstractSeedService<User> {
  constructor(
    @InjectRepository(User)
      repo: Repository<User>,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {
    super(repo);
  }

  protected async getEntities(): Promise<User[]> {
    const users = [
      new User({
        email: 'julien.coppin@student.unamur.be',
        active: true,
        role: await this.roleService.getByRoleType(RoleType.ADMIN),
      }),
    ];

    for (const user of users) {
      user.plainPassword = process.env['DEFAULT_PLAIN_PASSWORD'] ?? '1234';

      await this.userService.hashPlainPassword(user);
    }

    return users;
  }

  protected async entityExists(entity: User): Promise<boolean> {
    return !!await this.repo.findOne({
      where: {
        email: entity.email,
      },
    });
  }
}
