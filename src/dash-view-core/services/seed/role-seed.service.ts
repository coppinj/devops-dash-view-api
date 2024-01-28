import { RoleType } from '@dash-view-common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role, Translation } from '../../model';
import { RoleService } from '../role.service';
import { AbstractSeedService } from './abstract-seed.service';

@Injectable()
export class RoleSeedService extends AbstractSeedService<Role> {
  constructor(
    @InjectRepository(Role)
      repo: Repository<Role>,
    private readonly roleService: RoleService,
  ) {
    super(repo);
  }

  protected async getEntities(): Promise<Role[]> {
    return [
      new Role({
        role: RoleType.ADMIN,
        label: new Translation({
          fr: 'Administrateur',
          en: 'Admin',
        }),
      }),
      new Role({
        role: RoleType.DEVELOPER,
        label: new Translation({
          fr: 'Développeur',
          en: 'Developer',
        }),
      }),
    ];
  }

  protected async entityExists(role: Role): Promise<boolean> {
    return !!await this.roleService.getByRoleType(role.role);
  }
}
