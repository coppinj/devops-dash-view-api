import { IEntityDTO, IListDTO, IReadDTO } from '@dash-view-common';
import {
  AbstractController,
  IntParam,
  Repository,
  RepositoryCreateDTO,
  RepositoryReadDTO,
  RepositoryService,
  RepositoryUpdateDTO,
} from '@dash-view-core';
import { Body, Controller, Get, Patch, Post } from '@nestjs/common';

@Controller({ path: 'repositories' })
export class RepositoryController extends AbstractController<Repository,
  RepositoryReadDTO,
  any,
  RepositoryCreateDTO,
  RepositoryUpdateDTO> {
  constructor(
    service: RepositoryService,
  ) {
    super(service);
  }

  @Post()
  async create(@Body() dto: RepositoryCreateDTO): Promise<IEntityDTO> {
    return await this._create(dto);
  }

  @Get()
  async list(): Promise<IListDTO[]> {
    return await this._list();
  }

  @Get(':id')
  async read(@IntParam('id') id: number): Promise<IReadDTO> {
    return await this._read(id);
  }

  @Patch(':id')
  async update(@IntParam('id') id: number, @Body() dto: RepositoryUpdateDTO): Promise<IEntityDTO> {
    return await this._update(id, dto);
  }
}