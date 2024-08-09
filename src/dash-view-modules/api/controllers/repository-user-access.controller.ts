import { IEntityDTO, IListDTO, IReadDTO, RoleType } from '@dash-view-common';
import {
  AbstractController,
  IntParam,
  RepositoryUserAccess,
  RepositoryUserAccessCreateDTO,
  RepositoryUserAccessListDTO,
  RepositoryUserAccessReadDTO,
  RepositoryUserAccessService, RolesGuard,
} from '@dash-view-core';
import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../../../dash-view-core/decorators/role.decorator';

@Controller({ path: 'repositories/:parentID/accesses' })
@UseGuards(RolesGuard)
@Roles(RoleType.ADMIN)
export class RepositoryUserAccessController extends AbstractController<RepositoryUserAccess,
  RepositoryUserAccessReadDTO,
  RepositoryUserAccessListDTO,
  RepositoryUserAccessCreateDTO> {
  constructor(
    service: RepositoryUserAccessService,
  ) {
    super(service);
  }

  @Post()
  async create(@Body() dto: RepositoryUserAccessCreateDTO, @IntParam('parentID') parentID: number): Promise<IEntityDTO> {
    return await this._create(dto, parentID);
  }

  @Delete(':id')
  async delete(@IntParam('id') id: number, @IntParam('parentID') parentID: number): Promise<void> {
    return await this._delete(id, parentID);
  }

  @Get()
  async list(@IntParam('parentID') parentID: number): Promise<IListDTO[]> {
    return await this._list(parentID);
  }

  @Get(':id')
  async read(@IntParam('id') id: number, @IntParam('parentID') parentID: number): Promise<IReadDTO> {
    return await this._read(id, parentID);
  }

  @Patch(':id')
  async update(@IntParam('id') id: number, @IntParam('parentID') parentID: number): Promise<IEntityDTO> {
    return await this._update(id, parentID);
  }
}