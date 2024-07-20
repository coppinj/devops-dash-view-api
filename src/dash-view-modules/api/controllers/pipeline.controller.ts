import { IListDTO, IReadDTO, RoleType } from '@dash-view-common';
import {
  AbstractController,
  IntParam,
  JwtAuthGuard,
  Pipeline,
  PipelineListDTO,
  PipelineReadDTO,
  PipelineService, RolesGuard,
} from '@dash-view-core';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../../../dash-view-core/decorators/role.decorator';

@Controller({ path: 'repositories/:parentID/pipelines' })
@UseGuards(RolesGuard)
@Roles(RoleType.ADMIN, RoleType.DEVELOPER)
export class PipelineController extends AbstractController<Pipeline,
  PipelineReadDTO,
  PipelineListDTO> {
  constructor(
    service: PipelineService,
  ) {
    super(service);
  }

  @Get()
  async list(@IntParam('parentID') parentID: number): Promise<IListDTO[]> {
    return await this._list(parentID);
  }

  @Get(':id')
  async read(@IntParam('id') id: number, @IntParam('parentID') parentID: number): Promise<IReadDTO> {
    return await this._read(id, parentID);
  }
}