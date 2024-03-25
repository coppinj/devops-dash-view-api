import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as RepositoryTypeORM } from 'typeorm';
import { Repository, RepositoryCreateDTO, RepositoryListDTO, RepositoryReadDTO, RepositoryUpdateDTO } from '../model';
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

  protected async _getListDTO(entity: Repository): Promise<RepositoryListDTO> {
    const dto = new RepositoryListDTO();

    dto.name = entity.name;
    dto.url = entity.url;

    return dto;
  }
}
