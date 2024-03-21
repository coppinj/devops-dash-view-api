import { IEntityDTO } from '@dash-view-common';
import { PipelineApiKeyGuard, PipelineResponseDTO, PipelineService } from '@dash-view-core';
import { Controller, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';

@Controller({ path: 'pipelines', version: '1' })
@UseGuards(PipelineApiKeyGuard)
@ApiSecurity('Api-Key')
export class PipelineController {
  constructor(
    private readonly pipelineService: PipelineService,
  ) {
  }

  @Post()
  async create(@Req() req: any): Promise<PipelineResponseDTO> {
    return this.pipelineService.createFromPipeline(req.repository);
  }

  @Post(':uuid/complete')
  async complete(@Req() req: any, @Query('uuid') uuid: string): Promise<IEntityDTO> {
    return this.pipelineService.completeFromPipeline(req.repository, uuid);
  }
}