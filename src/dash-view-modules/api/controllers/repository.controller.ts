import { IEntityDTO, IListDTO, IReadDTO, RoleType } from '@dash-view-common';
import {
  AbstractController,
  IntParam,
  Repository,
  RepositoryCreateDTO,
  RepositoryReadDTO,
  RepositoryService,
  RepositoryUpdateDTO,
  RolesGuard,
} from '@dash-view-core';
import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../../../dash-view-core/decorators/role.decorator';

@Controller({ path: 'repositories' })
@UseGuards(RolesGuard)
@Roles(RoleType.ADMIN, RoleType.DEVELOPER)
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