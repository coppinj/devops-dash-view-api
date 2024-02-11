import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as RepositoryTypeORM } from 'typeorm';
import { Repository, RepositoryCreateDTO, RepositoryReadDTO, RepositoryUpdateDTO } from '../model';
import { AbstractCRUDService } from './common';

@Injectable()
export class RepositoryService extends AbstractCRUDService<Repository,
  RepositoryReadDTO,
  any,
  RepositoryCreateDTO,
  RepositoryUpdateDTO> {
  constructor(
    @InjectRepository(Repository)
      repo: RepositoryTypeORM<Repository>,
  ) {
    super(repo);
  }

  protected async _getReadDTO(entity: Repository): Promise<RepositoryReadDTO> {
    return new RepositoryReadDTO(entity);
  }
}
