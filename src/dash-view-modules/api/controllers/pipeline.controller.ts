import { IListDTO, IReadDTO } from '@dash-view-common';
import {
  AbstractController,
  IntParam,
  Pipeline,
  PipelineListDTO,
  PipelineReadDTO,
  PipelineService,
} from '@dash-view-core';
import { Controller, Get } from '@nestjs/common';

@Controller({ path: 'repositories/:parentID/pipelines' })
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