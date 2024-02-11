import { IEntityDTO } from '@dash-view-common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DateTime } from 'luxon';
import { EntityManager, LessThan, Repository as RepositoryTypeORM } from 'typeorm';
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
    const repositoryApiKey = await this.repo.findOne({
      relations: {
        repository: true,
      },
      where: {
        apiKey,
        expirationDate: LessThan(DateTime.local().toJSDate()),
      },
    });

    if (!repositoryApiKey) {
      return null;
    }

    repositoryApiKey.lastAccessDate = DateTime.local().toJSDate();

    await this.repo.save(repositoryApiKey);

    return repositoryApiKey.repository;
  }

  protected async _appendCreatePropertiesToResponse(_em: EntityManager, responseEntity: IEntityDTO, entity: RepositoryApiKey): Promise<void> {
    (responseEntity as any).apiKey = entity.apiKey;
  }

  protected async _getListDTO(entity: RepositoryApiKey): Promise<RepositoryApiKeyListDTO> {
    return new RepositoryApiKeyListDTO(entity);
  }
}
