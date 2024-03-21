import { IEntityDTO } from '@dash-view-common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DateTime } from 'luxon';
import { EntityManager, Repository as RepositoryTypeORM } from 'typeorm';
import {
  Repository,
  RepositoryApiKey,
  RepositoryApiKeyCreateDTO,
  RepositoryApiKeyListDTO,
  RepositoryApiKeyReadDTO,
} from '../model';
import { AbstractCRUDService } from './common';
import { RepositoryService } from './repository.service';

@Injectable()
export class RepositoryApiKeyService extends AbstractCRUDService<RepositoryApiKey,
  RepositoryApiKeyReadDTO,
  RepositoryApiKeyListDTO,
  RepositoryApiKeyCreateDTO,
  any,
  Repository> {
  get parentProperty(): keyof RepositoryApiKey {
    return 'repository';
  }

  get parentService(): RepositoryService {
    return this.repositoryService;
  }
  
  constructor(
    @InjectRepository(RepositoryApiKey)
      repo: RepositoryTypeORM<RepositoryApiKey>,
    private readonly repositoryService: RepositoryService,
  ) {
    super(repo);
  }

  async getRepositoryByApiKey(apiKey: string): Promise<Repository | null> {
    if (!/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(apiKey)) {
      return null;
    }

    const repositoryApiKey = await this.repo.createQueryBuilder('rak')
      .innerJoinAndSelect('rak.repository', 'r')
      .where('rak.apiKey = :apiKey', { apiKey })
      .andWhere('rak.expirationDate IS NULL OR rak.expirationDate > :now', { now: DateTime.local().toJSDate() })
      .getOne();

    if (!repositoryApiKey) {
      return null;
    }

    repositoryApiKey.lastAccessedDate = DateTime.local().toJSDate();

    await this.repo.save(repositoryApiKey);

    return repositoryApiKey.repository;
  }

  protected async _appendCreatePropertiesToResponse(_em: EntityManager, responseEntity: IEntityDTO, entity: RepositoryApiKey): Promise<void> {
    (responseEntity as any).apiKey = entity.apiKey;
  }

  protected async _getListDTO(entity: RepositoryApiKey): Promise<RepositoryApiKeyListDTO> {
    const dto = new RepositoryApiKeyListDTO();

    dto.expirationDate = entity.expirationDate;
    dto.lastAccessedDate = entity.lastAccessedDate;

    return dto;
  }
}
