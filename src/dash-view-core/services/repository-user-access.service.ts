import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as RepositoryTypeORM } from 'typeorm/repository/Repository';
import {
  RepositoryUserAccess,
  RepositoryUserAccessCreateDTO,
  RepositoryUserAccessListDTO,
  RepositoryUserAccessReadDTO,
  RepositoryUserAccessUpdateDTO,
} from '../model';
import { AbstractCRUDService } from './common';

@Injectable()
export class RepositoryUserAccessService extends AbstractCRUDService<RepositoryUserAccess,
  RepositoryUserAccessReadDTO,
  RepositoryUserAccessListDTO,
  RepositoryUserAccessCreateDTO,
  RepositoryUserAccessUpdateDTO> {
  constructor(
    @InjectRepository(RepositoryUserAccess)
      repo: RepositoryTypeORM<RepositoryUserAccess>,
  ) {
    super(repo);
  }

  protected async _getReadDTO(entity: RepositoryUserAccess): Promise<RepositoryUserAccessReadDTO> {
    return new RepositoryUserAccessReadDTO(entity);
  }
}
