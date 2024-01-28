import { IRoleDTO, RoleType } from '@dash-view-common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonDTO, Role, RoleDTO } from '../model';
import { AbstractService } from './abstract.service';

@Injectable()
export class RoleService extends AbstractService<Role> {
  constructor(
    @InjectRepository(Role)
      repo: Repository<Role>,
  ) {
    super(repo);
  }

  getByRoleType(role: RoleType): Promise<Role> {
    return this.repo.findOne({
      where: {
        role,
      },
    });
  }

  async getDTO(entity: Role, _groups?: string[]): Promise<IRoleDTO> {
    const dto = new RoleDTO();

    dto.role = entity.role;

    return dto;
  }
}
