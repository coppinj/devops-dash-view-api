import { IEntityDTO, IListDTO, IReadDTO } from '@dash-view-common';
import {
  AbstractController,
  IntParam,
  RepositoryApiKey,
  RepositoryApiKeyCreateDTO,
  RepositoryApiKeyListDTO,
  RepositoryApiKeyReadDTO,
  RepositoryApiKeyService,
} from '@dash-view-core';
import { Body, Controller, Delete, Get, Post } from '@nestjs/common';

@Controller({ path: 'repositories/:parentID/api-keys' })
export class RepositoryApiKeyController extends AbstractController<RepositoryApiKey,
  RepositoryApiKeyReadDTO,
  RepositoryApiKeyListDTO,
  RepositoryApiKeyCreateDTO> {
  constructor(
    service: RepositoryApiKeyService,
  ) {
    super(service);
  }

  @Post()
  async create(@Body() dto: RepositoryApiKeyCreateDTO, @IntParam('parentID') parentID: number): Promise<IEntityDTO> {
    return await this._create(dto, parentID);
  }

  @Get()
  async list(@IntParam('parentID') parentID: number): Promise<IListDTO[]> {
    return await this._list(parentID);
  }

  @Get(':id')
  async read(@IntParam('id') id: number, @IntParam('parentID') parentID: number): Promise<IReadDTO> {
    return await this._read(id, parentID);
  }

  @Delete(':id')
  async delete(@IntParam('id') id: number, @IntParam('parentID') parentID: number): Promise<void> {
    return await this._delete(id, parentID);
  }
}