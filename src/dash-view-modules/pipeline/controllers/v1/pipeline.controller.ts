import { PipelineApiKeyGuard, PipelineResponseDTO, PipelineService } from '@dash-view-core';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
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
}